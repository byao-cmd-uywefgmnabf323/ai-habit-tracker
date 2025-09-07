import type { Metadata } from "next";
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const fontHeading = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "AI Habit Tracker",
  description: "A bubbly and fun habit tracker powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontHeading.variable} font-sans antialiased`}>
        <div className="relative flex min-h-screen flex-col bg-background">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
