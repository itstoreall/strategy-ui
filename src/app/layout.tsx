import type { Metadata } from "next";
import "@/src/sass/globals.scss";

type ChildrenProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Strategy PWA",
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
