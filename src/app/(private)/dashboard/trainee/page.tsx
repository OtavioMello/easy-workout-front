"use client";

import WorkoutRoutineCard from "@/components/workout/WorkoutRoutineCard";
import { useAuth } from "@/context/AuthContext";
import { getWorkoutRoutineSchemasByTraineeId } from "@/api/services/workoutService";
import { WorkoutRoutineSchemaResponseDto } from "@/types/workout.types";
import { Container, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Page() {
  const { userId } = useAuth();

  const [todayWorkout, setTodayWorkout] =
    useState<WorkoutRoutineSchemaResponseDto | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const workoutData: WorkoutRoutineSchemaResponseDto[] =
          await getWorkoutRoutineSchemasByTraineeId(userId);

        const todayWorkout = workoutData.find((w) => w.is_priority);
        setTodayWorkout(todayWorkout || null);
      } catch (ex) {
        console.error(ex);
      }
    }
    fetchData();
  }, [userId]);

  return (
    <Container sx={{ marginTop: "100px" }}>
      <Typography variant="h4" color="text.secondary" marginBottom={"50px"}>
        Treino de hoje
      </Typography>
      <Grid2 container size={12}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          {todayWorkout ? (
            <WorkoutRoutineCard
              id={todayWorkout.id}
              name={todayWorkout.name}
              description={todayWorkout.description}
              tags={todayWorkout.tags}
            />
          ) : (
            <WorkoutRoutineCard name="Sem treino previsto para hoje" />
          )}
        </Grid2>
      </Grid2>
    </Container>
  );
}
