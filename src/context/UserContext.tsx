"use client";

import { PersonalTrainerResponseDto } from "@/types/personalTrainer.types";
import { TraineeResponseDto } from "@/types/trainee.types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { getTraineeById } from "@/api/services/traineeService";
import { getPersonalTrainerById } from "@/api/services/personalTrainerService";

type UserData =
  | { role: "TRAINEE"; data: TraineeResponseDto }
  | { role: "PERSONAL_TRAINER"; data: PersonalTrainerResponseDto }
  | null;

type UserContextType = {
  user: UserData;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { userId, role } = useAuth();
  const [user, setUser] = useState<UserData>(null);

  useEffect(() => {
    async function fetchUserData() {
      if (!userId || !role) return;

      try {
        if (role === "TRAINEE") {
          const traineeData = await getTraineeById(userId);
          setUser({ role: "TRAINEE", data: traineeData });
        } else {
          const personalData = await getPersonalTrainerById(userId);
          setUser({ role: "PERSONAL_TRAINER", data: personalData });
        }
      } catch (ex) {
        console.error(ex);
      }
    }

    fetchUserData();
  }, [userId, role]);

  const contextValue = useMemo(() => ({ user }), [user]);
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within an UserProvider");
  return context;
}
