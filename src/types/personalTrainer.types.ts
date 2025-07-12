export interface PersonalTrainerRequestDto {
  first_name: string;
  last_name: string;
  nickname: string;
  email: string;
  password: string;
}

export interface PersonalTrainerResponseDto {
  id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  email: string;
}
