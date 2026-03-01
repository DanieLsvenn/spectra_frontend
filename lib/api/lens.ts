import api from "@/lib/api";
import type {
  LensType,
  LensFeature,
  PaginatedResponse,
  PriceCalculationRequest,
  PriceCalculationResponse,
} from "@/types";

export const lensTypesApi = {
  getAll: (page = 1, pageSize = 50) =>
    api.get<PaginatedResponse<LensType>>("/LensTypes", {
      params: { page, pageSize },
    }),

  getById: (id: string) => api.get<LensType>(`/LensTypes/${id}`),

  getPrescriptionRequired: () =>
    api.get<LensType[]>("/LensTypes/prescription-required"),

  getNoPrescription: () => api.get<LensType[]>("/LensTypes/no-prescription"),

  create: (data: Partial<LensType>) => api.post<LensType>("/LensTypes", data),

  update: (id: string, data: Partial<LensType>) =>
    api.put<LensType>(`/LensTypes/${id}`, data),

  delete: (id: string) => api.delete(`/LensTypes/${id}`),
};

export const lensFeaturesApi = {
  getAll: (page = 1, pageSize = 50) =>
    api.get<PaginatedResponse<LensFeature>>("/LensFeatures", {
      params: { page, pageSize },
    }),

  getById: (id: string) => api.get<LensFeature>(`/LensFeatures/${id}`),

  getByIndex: (lensIndex: number) =>
    api.get<LensFeature[]>(`/LensFeatures/by-index/${lensIndex}`),

  calculatePrice: (data: PriceCalculationRequest) =>
    api.post<PriceCalculationResponse>("/LensFeatures/calculate-price", data),

  create: (data: Partial<LensFeature>) =>
    api.post<LensFeature>("/LensFeatures", data),

  update: (id: string, data: Partial<LensFeature>) =>
    api.put<LensFeature>(`/LensFeatures/${id}`, data),

  delete: (id: string) => api.delete(`/LensFeatures/${id}`),
};
