import fetcher from "./api";

type AuthRequest = {
  email: string;
  password: string;
};

type AuthResponseDto = {
  token: string;
  user_id: string;
  role: "TRAINEE" | "PERSONAL_TRAINER";
};

export default async function auth(
  request: AuthRequest
): Promise<AuthResponseDto> {
  return fetcher("/auth", {
    method: "POST",
    body: JSON.stringify(request),
  });
}
