import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shashank Verma | BCA Student & Programmer",
  description: "Portfolio of Shashank Verma - BCA student at Swami Rama Himalayan University specializing in Software Development, Data Science, and Web Technologies. Creator of Assignix.",
  keywords: ["Shashank Verma", "BCA student", "Swami Rama Himalayan University", "Software Development", "Data Science", "Assignix", "Web Technologies", "Programmer Portfolio"],
  authors: [{ name: "Shashank Verma" }],
  openGraph: {
    title: "Shashank Verma | BCA Student & Programmer",
    description: "Portfolio of Shashank Verma - BCA Student & Software Developer.",
    url: "https://shashankverma.dev",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-950 dark:bg-black dark:text-zinc-50 font-sans transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

