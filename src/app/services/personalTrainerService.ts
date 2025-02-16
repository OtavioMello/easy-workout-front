import { PersonalTrainerDto } from "@/types/personalTrainer.types";
import fetcher from "./api";

export async function create(request: PersonalTrainerDto) {
  return fetcher("/personal-trainer", {
    method: "POST",
    body: JSON.stringify(request),
  });
}
