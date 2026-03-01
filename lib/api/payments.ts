import api from "@/lib/api";
import type {
  Payment,
  PaginatedResponse,
  CreatePaymentRequest,
  CreatePaymentResponse,
} from "@/types";

export const paymentsApi = {
  create: (data: CreatePaymentRequest) =>
    api.post<CreatePaymentResponse>("/Payments", data),

  getMyPayments: (page = 1, pageSize = 10) =>
    api.get<PaginatedResponse<Payment>>("/Payments/my", {
      params: { page, pageSize },
    }),

  getById: (id: string) => api.get<Payment>(`/Payments/${id}`),

  getByOrder: (orderId: string) =>
    api.get<Payment[]>(`/Payments/order/${orderId}`),

  getByPreorder: (preorderId: string) =>
    api.get<Payment[]>(`/Payments/preorder/${preorderId}`),

  updateStatus: (id: string, paymentStatus: string) =>
    api.put(`/Payments/${id}/status`, { paymentStatus }),
};
