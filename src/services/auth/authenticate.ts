import { api } from "../api";
import { AuthenticateLoginData } from "@/types";
import cookies from "js-cookie";

type AuthenticateResponse = {
  token: string;
};

async function setCookis(token: string) {
  const oneDay = 1000 * 60 * 60 * 24;

  cookies.set("token", token, {
    path: "/",
    sameSite: "strict",
    expires: new Date(Date.now() + oneDay),
  });
}

async function getJwtToken({
  email,
  senha,
}: AuthenticateLoginData): Promise<string> {
  const response = await api.post<AuthenticateResponse>("/auth/login", {
    username: email,
    password: senha,
  });

  return response.data.token;
}

export async function authenticate(data: AuthenticateLoginData): Promise<void> {
  const token = await getJwtToken(data);

  await setCookis(token);

  try {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  } catch (error) {
    console.error("Error setting authorization header:", error);
  }
}
