import api from "./axios";

export async function loginRequest(emailOrUsername: string, password: string) {
  const loginData = {
    username: emailOrUsername,
    password,
  };

  const response = await api.post("/users/login/", loginData);
  return response.data;
}

export async function registerRequest(
  username: string,
  email: string,
  password: string,
) {
  const registerData = {
    username,
    email,
    password,
  };

  const response = await api.post("/users/register/", registerData);
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
