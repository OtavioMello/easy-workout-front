import {
  WorkoutInstanceUpdateRequestDto,
  WorkoutRoutineInstanceIdResponseDto,
  WorkoutRoutineInstanceResponseDto,
  WorkoutRoutineSchemaResponseDto,
} from "@/types/workout.types";
import fetcher from "./api";

export async function getWorkoutRoutineSchemasByTraineeId(
  id: string | null
): Promise<WorkoutRoutineSchemaResponseDto[]> {
  return fetcher(`/workouts/routines/schemas/trainees/${id}`, {
    method: "GET",
  });
}

export async function getWorkoutRoutineInstanceBySchemaId(
  id: string | null
): Promise<WorkoutRoutineInstanceIdResponseDto> {
  return fetcher(`/workouts/routines/schemas/${id}/instance`, {
    method: "GET",
  });
}

export async function getWorkoutRoutineInstanceById(
  id: string | null
): Promise<WorkoutRoutineInstanceResponseDto> {
  return fetcher(`/workouts/routines/instances/${id}`, { method: "GET" });
}

export async function updateWorkoutInstanceById(
  id: string,
  request: WorkoutInstanceUpdateRequestDto
) {
  fetcher(`/workouts/instances/${id}`, {
    method: "PUT",
    body: JSON.stringify(request),
  });
}

export async function updateWorkoutRoutineInstanceById(
  id: string
): Promise<void> {
  fetcher(`/workouts/routines/instances/${id}/complete`, { method: "PUT" });
}
