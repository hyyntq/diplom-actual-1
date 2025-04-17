import { RegisterData, LoginData, StrapiAuthResponse } from "@/lib/interface";

const baseURL = "http://localhost:1337";

export async function registerService(
  data: RegisterData
): Promise<StrapiAuthResponse> {
  try {
    const response = await fetch(`${baseURL}/api/auth/local/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error("Register error:", error);
    return {
      jwt: "",
      user: { id: 0, username: "", email: "" },
      error: { message: "Failed to register" },
    };
  }
}

export async function loginService(
  data: LoginData
): Promise<StrapiAuthResponse> {
  try {
    const response = await fetch(`${baseURL}/api/auth/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    return {
      jwt: "",
      user: { id: 0, username: "", email: "" },
      error: { message: "Failed to login" },
    };
  }
}
