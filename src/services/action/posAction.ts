import { api } from "../api";

export async function postAction() {
  const response = await api.post("/Devices/command", {
    serial: "string",
    action: "string",
  });
  return response;
}
