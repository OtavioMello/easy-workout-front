import { PersonalTrainerResponseDto } from "./personalTrainer.types";
import { WorkoutRoutineInstanceResponseDto } from "./workout.types";

export interface TraineeRequestDto {
  first_name: string;
  last_name: string;
  nickname: string;
  email: string;
  password: string;
  weight?: number;
  height?: number;
  birthdate?: string;
  gender?: string;
}

export interface TraineeResponseDto {
  id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  email: string;
  birthdate?: string;
  gender?: string;
  workout_routines?: Array<WorkoutRoutineInstanceResponseDto>;
  physical_data?: Array<PhysicalDataResponseDto>;
  personal_trainer?: PersonalTrainerResponseDto;
}

export interface PhysicalDataResponseDto {
  id: string;
  weight: number;
  height: number;
  imc: number;
  created_at: string;
}
