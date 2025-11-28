import axios from "axios";
import cookies from "js-cookie";
import Router from "next/router";

export const api = axios.create({
  baseURL: "https://localhost:7211/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const publicRoutes = ["/auth/login", "/user"];

function getApiResponseErrors(errors: Record<string, string[]>): string {
  return Object.values(errors)
    .map((error) => error[0])
    .join("\n");
}

const token = cookies.get("token");
if (token) {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

api.interceptors.request.use((config) => {
  const token = cookies.get("token");
  const endpoint = config.url ?? "";

  config.headers.Authorization = `Bearer ${token}`;

  if (publicRoutes.some((route) => endpoint.includes(route))) {
    return config;
  }

  if (!token) {
    Router.push("/auth/login");
    throw new axios.Cancel("Token inexistente. Redirecionando para login.");
  }

  return config;
});

function handleApiError(error: any) {
  const { status, data } = error.response ?? {};

  if (status === 401) {
    cookies.remove("token");
    Router.push("/auth/login");
    return Promise.reject(error);
  }

  if (status === 400 && data?.errors) {
    error.message = getApiResponseErrors(data.errors);
  } else {
    const fallback = "Ocorreu um erro inesperado. Tente novamente mais tarde.";
    error.message = data?.detail || fallback;
  }

  return Promise.reject(error);
}

api.interceptors.response.use((response) => response, handleApiError);
