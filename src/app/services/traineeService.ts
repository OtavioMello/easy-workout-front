import { TraineeDto } from "@/types/trainee.types";
import fetcher from "./api";

export async function create(request: TraineeDto) {
  return fetcher("/trainee", {
    method: "POST",
    body: JSON.stringify(request),
  });
}
