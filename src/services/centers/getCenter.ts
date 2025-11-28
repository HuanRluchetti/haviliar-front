import { api } from "../api";
import { User } from "../../types";

export async function registerUser(int: id) {
  const response = await api.get(`/operation-center${id}`);
  return response.data;
}
