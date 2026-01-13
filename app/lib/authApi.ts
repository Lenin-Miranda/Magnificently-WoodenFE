import api from "./axios";

export async function loginRequest(email: string, password: string) {
  const response = await api.post("/users/login/", {
    username: email,
    password,
  });
  return response.data;
}

export async function registerRequest(
  name: string,
  email: string,
  password: string
) {
  const response = await api.post("/users/register/", {
    username: email,
    email,
    password,
    first_name: name,
  });
  return response.data;
}

export async function getUserRequest() {
  const response = await api.get("/users/me/");
  return response.data;
}

export async function logoutRequest() {
  const response = await api.post("/users/logout/");
  return response.data;
}
