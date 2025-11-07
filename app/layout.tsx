import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IT Operations Assistant",
  description: "AI-Powered Vulnerability Management & Technical Support Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
