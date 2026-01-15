// app/layout.tsx
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import { Toaster } from "sonner";
import Header from "./_shared/Header"; // Add this import

const appFont = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UIUX Mockup generator App",
  description: "Generate High quality free UIUX Mobile and Web Mockups",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${appFont.className} min-h-screen bg-white`}>
          <Header />   {/* OUTSIDE Provider */}
          <Provider>
            <main>{children}</main>
            <Toaster position="top-center" richColors />
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
