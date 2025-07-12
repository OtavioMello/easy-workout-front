export interface WorkoutRoutineInstanceResponseDto {
  id: string;
  name: string;
  description: string;
  workouts: Array<WorkoutInstanceResponseDto>;
  completed: boolean;
}

export interface WorkoutInstanceResponseDto {
  id: string;
  name: string;
  description: string;
  equipment: EquipmentResponseDto;
  sets: Array<SetResponseDto>;
  completed: boolean;
}

export interface WorkoutInstanceUpdateRequestDto {
  sets: Array<SetUpdateRequestDto>;
  completed: boolean;
}

export interface WorkoutRoutineInstanceIdResponseDto {
  id: string;
}

export interface EquipmentResponseDto {
  id: string;
  name: string;
}

export interface SetResponseDto {
  id: string;
  reps: number;
  weight: number;
}

export interface SetUpdateRequestDto {
  id: string;
  reps: number;
  weight: number;
}

export interface WorkoutRoutineSchemaResponseDto {
  id: string;
  name: string;
  description: string;
  workouts: Array<WorkoutSchemaResponseDto>;
  active: boolean;
  days_of_Week: string;
  is_priority: boolean;
  tags: Array<string>;
}

export interface WorkoutSchemaResponseDto {
  id: string;
  name: string;
  description: string;
  equipments: EquipmentResponseDto;
}
