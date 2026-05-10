import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Commerce Dashboard",
  description: "Modern e-commerce analytics dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
