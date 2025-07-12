"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type AuthContextType = {
  token: string | null;
  userId: string | null;
  role: "TRAINEE" | "PERSONAL_TRAINER" | null;
  login: (
    token: string,
    userId: string,
    role: "TRAINEE" | "PERSONAL_TRAINER"
  ) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<"TRAINEE" | "PERSONAL_TRAINER" | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get("token") ?? null;
    const storedUserId = Cookies.get("user_id") ?? null;
    const storedRole =
      (Cookies.get("role") as "TRAINEE" | "PERSONAL_TRAINER") || null;

    if (storedToken && storedUserId && storedRole) {
      setToken(storedToken);
      setUserId(storedUserId);
      setRole(storedRole);
    }
  }, []);

  function login(
    newToken: string,
    newUserId: string,
    newRole: "TRAINEE" | "PERSONAL_TRAINER"
  ) {
    let date = new Date();
    date.setTime(date.getTime() + 60 * 1000 * 30);

    Cookies.set("token", newToken, { expires: date });
    Cookies.set("user_id", newUserId, { expires: date });
    Cookies.set("role", newRole, { expires: date });

    setToken(newToken);
    setUserId(newUserId);
    setRole(newRole);

    router.push(
      newRole === "TRAINEE"
        ? "/dashboard/trainee"
        : "/dashboard/personal-trainer"
    );
  }

  function logout() {
    Cookies.remove("token");
    Cookies.remove("user_id");
    Cookies.remove("role");
    setToken(null);
    setUserId(null);
    setRole(null);

    router.push("/login");
  }

  const contextValue = useMemo(
    () => ({ token, userId, role, login, logout }),
    [token, userId, role]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
