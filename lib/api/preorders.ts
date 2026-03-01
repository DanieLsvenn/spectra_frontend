import api from "@/lib/api";
import type {
  Preorder,
  PaginatedResponse,
  CreatePreorderRequest,
} from "@/types";

export const preordersApi = {
  create: (data: CreatePreorderRequest) =>
    api.post<Preorder>("/Preorders", data),

  getMyPreorders: (page = 1, pageSize = 10) =>
    api.get<PaginatedResponse<Preorder>>("/Preorders/my", {
      params: { page, pageSize },
    }),

  getById: (id: string) => api.get<Preorder>(`/Preorders/${id}`),

  getAll: (page = 1, pageSize = 10) =>
    api.get<PaginatedResponse<Preorder>>("/Preorders", {
      params: { page, pageSize },
    }),

  updateStatus: (id: string, status: string) =>
    api.put(`/Preorders/${id}/status`, { status }),

  convertToOrder: (id: string, shippingAddress?: string) =>
    api.post(`/Preorders/${id}/convert`, { shippingAddress }),

  cancel: (id: string) => api.delete(`/Preorders/${id}`),
};
