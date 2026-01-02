import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const appFont = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UIUX Mockup generator App",
  description: "Generate High quality free UIUX Mobile and Web Mockups",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`appFont.className min-h-screen bg-white dark:bg-black text-black dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
