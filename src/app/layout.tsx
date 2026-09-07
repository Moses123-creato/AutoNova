import type { Metadata } from "next";
import "./globals.css";

// TODO: Build agent — add font config, providers, and site shell.

export const metadata: Metadata = {
  title: "Autonova",
  description: "Build agent entry point.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}