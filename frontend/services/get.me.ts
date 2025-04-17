import { getJWT } from "./get.jwt";

const baseURL = "http://localhost:1337";

export async function getMe() {
  const url = new URL("/api/users/me", baseURL);


  const jwt = await getJWT();
  if (!jwt) {
    return { ok: false, data: null, error: null };
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    
    const data = await response.json()

    if(data.error) return {ok: false, data: null, error: data.error}

    return {ok: true, data, error: null}
  } catch (error) {
    console.log(error);
    return { ok: true, data: null, error };
  }
}
