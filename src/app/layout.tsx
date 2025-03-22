import ClientProviders from "@/context/ClientProviders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Workout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
