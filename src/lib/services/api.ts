const API_URL =
  process.env.EASY_WORKOUT_API_URL ?? "http://localhost:8080/easy-workout/v1";

export default async function fetcher<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  console.info(`Calling API: ${API_URL}${path}`);

  try {
    const response = await fetch(`${API_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      await handleApiExceptions(response);
    }

    let data = await response.json();
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
