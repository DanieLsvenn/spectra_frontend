import api from "@/lib/api";
import type { Order, PaginatedResponse, CreateOrderRequest } from "@/types";

export const ordersApi = {
  create: (data: CreateOrderRequest) => api.post<Order>("/Orders", data),

  getMyOrders: (page = 1, pageSize = 10) =>
    api.get<PaginatedResponse<Order>>("/Orders/my", {
      params: { page, pageSize },
    }),

  getById: (id: string) => api.get<Order>(`/Orders/${id}`),

  getAll: (page = 1, pageSize = 10) =>
    api.get<PaginatedResponse<Order>>("/Orders", {
      params: { page, pageSize },
    }),

  updateStatus: (id: string, status: string) =>
    api.put(`/Orders/${id}/status`, { status }),

  cancel: (id: string) => api.delete(`/Orders/${id}`),
};
