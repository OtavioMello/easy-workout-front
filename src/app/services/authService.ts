import fetcher from "./api";

type AuthRequest = {
  email: string;
  password: string;
};

type TokenDto = {
  token: string;
};

export default async function auth(request: AuthRequest): Promise<TokenDto> {
  return fetcher("/auth", {
    method: "POST",
    body: JSON.stringify(request),
  });
}
