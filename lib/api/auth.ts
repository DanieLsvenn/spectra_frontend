import api from "@/lib/api";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  GoogleLoginRequest,
} from "@/types";

export const authApi = {
  login: (data: LoginRequest) => api.post<LoginResponse>("/Auth/login", data),

  register: (data: RegisterRequest) => api.post("/Auth/register", data),

  googleLogin: (data: GoogleLoginRequest) =>
    api.post<LoginResponse>("/Auth/google", data),
};
