"use client";

import WorkoutRoutineCard from "@/components/workout/WorkoutRoutineCard";
import { useAuth } from "@/context/AuthContext";
import { getWorkoutRoutineSchemasByTraineeId } from "@/api/services/workoutService";
import { WorkoutRoutineSchemaResponseDto } from "@/types/workout.types";
import { Container, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Page() {
  const { userId } = useAuth();

  const [workoutRoutineSchemas, setWorkoutRoutineSchemas] = useState<
    WorkoutRoutineSchemaResponseDto[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const workoutData: WorkoutRoutineSchemaResponseDto[] =
          await getWorkoutRoutineSchemasByTraineeId(userId);

        setWorkoutRoutineSchemas(workoutData);
      } catch (ex) {
        console.error(ex);
      }
    }
    fetchData();
  }, [userId]);

  return (
    <Container sx={{ marginTop: "100px", paddingBottom: "100px" }}>
      <Typography variant="h4" color="text.secondary" marginBottom={"50px"}>
        Treinos
      </Typography>
      <Grid2 container size={12} spacing={2}>
        {workoutRoutineSchemas?.length > 0 ? (
          workoutRoutineSchemas?.map((workoutRoutineSchema, index) => (
            <Grid2
              key={`grid:${workoutRoutineSchema.id}`}
              size={{ xs: 12, md: 6 }}
            >
              <WorkoutRoutineCard
                key={workoutRoutineSchema.id}
                id={workoutRoutineSchema.id}
                description={workoutRoutineSchema.description}
                name={workoutRoutineSchema.name}
                tags={workoutRoutineSchema.tags}
              />
            </Grid2>
          ))
        ) : (
          <Grid2 size={{ xs: 12, md: 6 }}>
            <WorkoutRoutineCard name="Você ainda não possui nenhum treino" />
          </Grid2>
        )}
      </Grid2>
    </Container>
  );
}
