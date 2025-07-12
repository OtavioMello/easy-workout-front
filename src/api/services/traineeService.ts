import { TraineeRequestDto, TraineeResponseDto } from "@/types/trainee.types";
import fetcher from "./api";

export async function create(request: TraineeRequestDto) {
  return fetcher("/trainees", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export async function getTraineeById(
  id: string | null
): Promise<TraineeResponseDto> {
  return fetcher(`/trainees/${id}`, {
    method: "GET",
  });
}
