export interface PersonalTrainerFormState {
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
  arePasswordsEquals: boolean;
  isPasswordValid: boolean;
  emailError: string;
  nicknameError: string;
  isEmailValid: boolean;
  isNicknameValid: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

export interface TraineeFormState {
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
  weight: string;
  height: string;
  birthdate: Date | null;
  gender: string;
  activeStep: number;
  arePasswordsEquals: boolean;
  isPasswordValid: boolean;
  emailError: string;
  nicknameError: string;
  isEmailValid: boolean;
  isNicknameValid: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
}
