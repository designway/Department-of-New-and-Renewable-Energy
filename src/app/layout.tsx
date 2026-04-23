import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Department of New and Renewable Energy, Government of Goa",
    template: "%s | DNRE Goa",
  },
  description:
    "Official portal of the Department of New and Renewable Energy, Government of Goa — schemes, subsidies, notifications, and citizen services.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">{children}</body>
    </html>
  );
}
