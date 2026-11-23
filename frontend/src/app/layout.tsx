import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CINEBRIDGE — Every Dream Has a Screen",
  description: "A professional networking, talent discovery and venue marketplace for Indian cinema.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
