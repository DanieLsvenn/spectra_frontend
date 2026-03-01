import api from "@/lib/api";
import type {
  User,
  PaginatedResponse,
  CreateUserRequest,
  UpdateUserRequest,
} from "@/types";

export const usersApi = {
  getMe: () => api.get<User>("/Users/me"),

  updateMe: (data: UpdateUserRequest) => api.put<User>("/Users/me", data),

  getAll: (page = 1, pageSize = 10) =>
    api.get<PaginatedResponse<User>>("/Users", { params: { page, pageSize } }),

  search: (searchTerm: string, page = 1, pageSize = 10) =>
    api.get<PaginatedResponse<User>>("/Users/search", {
      params: { searchTerm, page, pageSize },
    }),

  getByRole: (role: string, page = 1, pageSize = 10) =>
    api.get<PaginatedResponse<User>>(`/Users/role/${role}`, {
      params: { page, pageSize },
    }),

  getByStatus: (status: string, page = 1, pageSize = 10) =>
    api.get<PaginatedResponse<User>>(`/Users/status/${status}`, {
      params: { page, pageSize },
    }),

  getById: (id: string) => api.get<User>(`/Users/${id}`),

  create: (data: CreateUserRequest) => api.post<User>("/Users", data),

  update: (id: string, data: UpdateUserRequest) =>
    api.put<User>(`/Users/${id}`, data),

  updateStatus: (id: string, status: string) =>
    api.put(`/Users/${id}/status`, { status }),

  updateRole: (id: string, role: string) =>
    api.put(`/Users/${id}/role`, { role }),
};
