import ClientProviders from "@/context/ClientProviders";
import { NavigationProvider } from "@/context/NavigationContext";
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
        <ClientProviders>
          <NavigationProvider>{children}</NavigationProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
