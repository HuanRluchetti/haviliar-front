import { api } from "../api";
import { User } from "../../types";

export async function registerUser(data: User) {
  const response = await api.post("/user", data);
  return response.data;
}
