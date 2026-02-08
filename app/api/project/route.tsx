import { db } from "@/config/db";
import { ProjectTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();

  if (!user?.primaryEmailAddress?.emailAddress) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const projects = await db
    .select()
    .from(ProjectTable)
    .where(
      eq(
        ProjectTable.userId,
        user.primaryEmailAddress.emailAddress
      )
    )
    .orderBy(desc(ProjectTable.id));

  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user?.primaryEmailAddress?.emailAddress) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { userInput, device, projectId } = await req.json();

  const result = await db
    .insert(ProjectTable)
    .values({
      projectId,
      userId: user.primaryEmailAddress.emailAddress,
      device,
      userInput,
    })
    .returning();

  return NextResponse.json(result[0]);
}
