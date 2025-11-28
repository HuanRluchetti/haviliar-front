import { api } from "../api";

export async function getCenter() {
  try {
    const response = await api.get(`/operation-center`);
    return response.data;
  } catch {
    console.log("Nao auto");
  }
}
