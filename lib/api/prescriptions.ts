import api from "@/lib/api";
import type {
  Prescription,
  PaginatedResponse,
  CreatePrescriptionRequest,
  UpdatePrescriptionRequest,
} from "@/types";

export const prescriptionsApi = {
  create: (data: CreatePrescriptionRequest) =>
    api.post<Prescription>("/Prescriptions", data),

  getMyPrescriptions: (page = 1, pageSize = 10) =>
    api.get<PaginatedResponse<Prescription>>("/Prescriptions/my", {
      params: { page, pageSize },
    }),

  getMyValid: () => api.get<Prescription[]>("/Prescriptions/my/valid"),

  getById: (id: string) => api.get<Prescription>(`/Prescriptions/${id}`),

  validate: (id: string) =>
    api.get<{ isValid: boolean }>(`/Prescriptions/${id}/validate`),

  update: (id: string, data: UpdatePrescriptionRequest) =>
    api.put<Prescription>(`/Prescriptions/${id}`, data),

  delete: (id: string) => api.delete(`/Prescriptions/${id}`),

  getByUser: (userId: string, page = 1, pageSize = 10) =>
    api.get<PaginatedResponse<Prescription>>(`/Prescriptions/user/${userId}`, {
      params: { page, pageSize },
    }),
};
