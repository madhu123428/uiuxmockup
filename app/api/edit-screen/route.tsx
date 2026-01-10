import { db } from "@/config/db";
import { openrouter } from "@/config/openroute";
import { ScreenConfigTable } from "@/config/schema";
import { GENERATION_SCREEN_PROMPT } from "@/data/Prompt";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { projectId, screenId, oldCode, userInput } = await req.json();

  const USER_INPUT = `
You are a code transformation engine.

RULES (ABSOLUTE):
- Output ONLY valid HTML + Tailwind CSS code.
- Do NOT include explanations, comments, markdown, or extra text.
- Do NOT add sentences like "Here is the updated code".
- The response MUST start with <html> and end with </html>.
- Preserve existing design and structure unless user explicitly asks.

TASK:
Modify the following code based on the user request.

CODE:
${oldCode}

USER REQUEST:
${userInput}
`;

  try {
    const aiResult = await openrouter.chat.send({
      model: "kwaipilot/kat-coder-pro:free",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: USER_INPUT,
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: userInput,
            },
          ],
        },
      ],
    });
    const code = aiResult?.choices[0]?.message?.content;
    const updateResult = await db
      .update(ScreenConfigTable)
      .set({
        code: code as string,
      })
      .where(
        and(
          eq(ScreenConfigTable.projectId, projectId),
          eq(ScreenConfigTable?.screenId, screenId as string)
        )
      )
      .returning();

    return NextResponse.json(updateResult[0]);
  } catch (e) {
    return NextResponse.json({ msg: "Internal Server Error" });
  }
}
