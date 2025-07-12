"use client";

import WorkoutInstanceCard from "@/components/workout/WorkoutInstanceCard";
import {
  getWorkoutRoutineInstanceById,
  updateWorkoutRoutineInstanceById,
} from "@/api/services/workoutService";
import { WorkoutRoutineInstanceResponseDto } from "@/types/workout.types";
import { Button, Container, Grid2, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [workoutRoutineInstace, setWorkoutRoutineInstace] =
    useState<WorkoutRoutineInstanceResponseDto | null>(null);

  const [canCompleteWorkoutInstance, setCanCompleteWorkoutInstance] =
    useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        let workoutRoutineInstanceData = await getWorkoutRoutineInstanceById(
          id
        );
        setWorkoutRoutineInstace(workoutRoutineInstanceData);
      } catch (ex) {
        console.error(ex);
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    if (!workoutRoutineInstace) return;

    const allWorkoutsCompleted = workoutRoutineInstace.workouts.every(
      (workout) => workout.completed === true
    );

    setCanCompleteWorkoutInstance(allWorkoutsCompleted);
  }, [workoutRoutineInstace]);

  function onWorkoutUpdated(id: string, completed: boolean) {
    if (!workoutRoutineInstace) return;

    const updatedWorkouts = workoutRoutineInstace.workouts.map((workout) =>
      workout.id === id ? { ...workout, completed } : workout
    );

    setWorkoutRoutineInstace({
      ...workoutRoutineInstace,
      workouts: updatedWorkouts,
    });
  }

  async function completeWorkoutRoutineInstance() {
    try {
      await updateWorkoutRoutineInstanceById(id);
      router.push("/dashboard/trainee");
    } catch (ex) {
      console.error(ex);
    }
  }

  return (
    <Container sx={{ marginTop: "100px", paddingBottom: "100px" }}>
      <Typography variant="h4" color="text.primary" marginBottom={"5px"}>
        {workoutRoutineInstace?.name}
      </Typography>
      <Typography variant="body1" color="text.secondary" marginBottom={"50px"}>
        {workoutRoutineInstace?.description}
      </Typography>
      <Grid2 container size={12} spacing={2}>
        {workoutRoutineInstace?.workouts.map((workoutInstance, index) => (
          <Grid2 key={`grid:${workoutInstance.id}`} size={{ xs: 12, md: 6 }}>
            <WorkoutInstanceCard
              key={workoutInstance.id}
              id={workoutInstance.id}
              name={workoutInstance.name}
              description={workoutInstance.description}
              equipment={workoutInstance.equipment}
              sets={workoutInstance.sets}
              completed={workoutInstance.completed}
              onUpdated={onWorkoutUpdated}
            />
          </Grid2>
        ))}
      </Grid2>
      <Button
        sx={{ marginTop: 2 }}
        size="large"
        color="warning"
        variant="contained"
        style={{ color: "#fff" }}
        disabled={!canCompleteWorkoutInstance}
        fullWidth
        onClick={completeWorkoutRoutineInstance}
      >
        concluir
      </Button>
    </Container>
  );
}
