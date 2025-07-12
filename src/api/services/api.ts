import Cookies from "js-cookie";

const API_URL =
  process.env.EASY_WORKOUT_API_URL ?? "http://localhost:8080/easy-workout/v1";

export default async function fetcher<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  console.info(`Calling API: ${API_URL}${path}`);

  const token = Cookies.get("token");
  const authHeaders: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  try {
    const response = await fetch(`${API_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
        ...(options?.headers as Record<string, string>),
      },
      ...options,
    });

    if (!response.ok) {
      await handleApiExceptions(response);
    }

    const contentLength = response.headers.get("content-length");
    const isJsonResponse = response.headers
      .get("content-type")
      ?.includes("application/json");

    let data: T = null as unknown as T;

    if (contentLength !== "0" && isJsonResponse) {
      data = await response.json();
    }

    return data;
  } catch (error) {
    handleConnectionError(error);
    throw error;
  }
}

function handleConnectionError(error: unknown) {
  if (error instanceof TypeError && error.message.includes("fetch")) {
    throw new Error("Erro ao tentar se conectar. Tente novamente mais tarde");
  }
  throw error;
}

async function handleApiExceptions(response: Response) {
  try {
    const errorBody = await response.json();

    if (errorBody?.message) {
      throw new Error(`Erro ${response.status}: ${errorBody.message}`);
    }
  } catch {
    console.warn("Erro ao converter resposta de erro para JSON.");
  }

  throw new Error(`Erro ${response.status}: ${response.statusText}`);
}
