import { PersonalTrainerDto } from "@/types/personalTrainer.types";
import fetcher from "./api";

export async function create(request: PersonalTrainerDto) {
  return fetcher("/personal-trainers", {
    method: "POST",
    body: JSON.stringify(request),
  });
}
