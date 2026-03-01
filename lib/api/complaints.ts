import api from "@/lib/api";
import type {
  ComplaintRequest,
  PaginatedResponse,
  CreateComplaintRequest,
  UpdateComplaintRequest,
} from "@/types";

export const complaintsApi = {
  create: (data: CreateComplaintRequest) =>
    api.post<ComplaintRequest>("/Complaints", data),

  getMyComplaints: (page = 1, pageSize = 10) =>
    api.get<PaginatedResponse<ComplaintRequest>>("/Complaints/my", {
      params: { page, pageSize },
    }),

  getById: (id: string) => api.get<ComplaintRequest>(`/Complaints/${id}`),

  update: (id: string, data: UpdateComplaintRequest) =>
    api.put<ComplaintRequest>(`/Complaints/${id}`, data),

  getAll: (page = 1, pageSize = 10) =>
    api.get<PaginatedResponse<ComplaintRequest>>("/Complaints", {
      params: { page, pageSize },
    }),

  getByStatus: (status: string, page = 1, pageSize = 10) =>
    api.get<PaginatedResponse<ComplaintRequest>>(
      `/Complaints/status/${status}`,
      { params: { page, pageSize } },
    ),

  updateStatus: (id: string, status: string) =>
    api.put(`/Complaints/${id}/status`, { status }),
};
