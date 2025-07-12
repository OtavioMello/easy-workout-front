"use client";

import { useAuth } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!token) return null;

  return <UserProvider>{children}</UserProvider>;
}
