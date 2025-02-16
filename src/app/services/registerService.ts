import fetcher from "./api";

type RegisterValidationDto = {
  exists: boolean;
};

export async function validateEmail(
  email: string
): Promise<RegisterValidationDto> {
  return fetcher(`/register/validate/email?email=${email}`, {
    method: "GET",
  });
}

export async function validateNickname(
  nickname: string
): Promise<RegisterValidationDto> {
  return fetcher(`/register/validate/nickname?nickname=${nickname}`, {
    method: "GET",
  });
}
