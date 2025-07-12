import {
  PersonalTrainerRequestDto,
  PersonalTrainerResponseDto,
} from "@/types/personalTrainer.types";
import fetcher from "./api";

export async function create(request: PersonalTrainerRequestDto) {
  return fetcher("/personal-trainers", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export async function getPersonalTrainerById(
  id: string | null
): Promise<PersonalTrainerResponseDto> {
  return fetcher(`/personal-trainers/${id}`, {
    method: "GET",
  });
}
