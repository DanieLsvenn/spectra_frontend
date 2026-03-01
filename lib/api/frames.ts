import api from "@/lib/api";
import type { Frame, PaginatedResponse, UpdateStockRequest } from "@/types";

export const framesApi = {
  getAll: (page = 1, pageSize = 10) =>
    api.get<PaginatedResponse<Frame>>("/Frames", {
      params: { page, pageSize },
    }),

  getById: (id: string) => api.get<Frame>(`/Frames/${id}`),

  getMedia: (id: string) => api.get(`/Frames/${id}/media`),

  getLowStock: () => api.get<Frame[]>("/Frames/inventory/low-stock"),

  getOutOfStock: () => api.get<Frame[]>("/Frames/inventory/out-of-stock"),

  create: (data: Partial<Frame>) => api.post<Frame>("/Frames", data),

  update: (id: string, data: Partial<Frame>) =>
    api.put<Frame>(`/Frames/${id}`, data),

  updateInventory: (id: string, data: UpdateStockRequest) =>
    api.patch(`/Frames/${id}/inventory`, data),

  delete: (id: string) => api.delete(`/Frames/${id}`),
};
