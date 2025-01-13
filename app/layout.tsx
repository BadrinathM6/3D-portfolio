import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import ResourceHints from "@/components/Constants/ResourceHints";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title:
    "Badrinath | Full Stack Developer | Expert Web Developer in Kanchipuram - Portfolio",
  description:
    "Discover the portfolio of a highly skilled Full Stack Developer and Web Developer in Kanchipuram. Specializing in modern, responsive web design, and scalable backend solutions. Explore my work to see how I bring ideas to life!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="Y-85O6uKIPeXDsk1vg-F_bJHraA5zc9wTJUhv5X5kwQ"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
