import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GenResume",
    template: "%s | GenResume",
  },
  description:
    "AI powered resume builder - create professional resumes in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} h-screen w-screen overflow-x-hidden overflow-y-scroll bg-white text-black dark:bg-black dark:text-white`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster richColors />
          <ClerkProvider
            appearance={{
              baseTheme: neobrutalism,
            }}
          >
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
