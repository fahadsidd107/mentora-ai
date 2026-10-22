import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: "Mentora AI",
  title: {
    default: "Mentora AI | Personalized AI Tutoring",
    template: "%s | Mentora AI",
  },
  description: "Personalized AI tutors, built around how you learn. Create a tutor and learn through natural, real-time voice conversations.",
  keywords: ["AI tutoring", "personalized learning", "voice tutor", "education"],
  openGraph: {
    title: "Mentora AI | Personalized AI Tutoring",
    description: "Personalized AI tutors, built around how you learn.",
    siteName: "Mentora AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased`}>
        <ClerkProvider appearance={{ variables: { colorPrimary: '#4f46e5' }} }>
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
