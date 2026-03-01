import api from "@/lib/api";
import type {
  DashboardStatistics,
  RevenueData,
  PopularFrame,
  OrderSummary,
} from "@/types";

export const dashboardApi = {
  getStatistics: (startDate?: string, endDate?: string) =>
    api.get<DashboardStatistics>("/Dashboard/statistics", {
      params: { startDate, endDate },
    }),

  getDailyRevenue: (startDate?: string, endDate?: string) =>
    api.get<RevenueData[]>("/Dashboard/revenue/daily", {
      params: { startDate, endDate },
    }),

  getMonthlyRevenue: (year?: number) =>
    api.get<RevenueData[]>("/Dashboard/revenue/monthly", {
      params: { year },
    }),

  getPopularFrames: (limit = 10, startDate?: string, endDate?: string) =>
    api.get<PopularFrame[]>("/Dashboard/popular-frames", {
      params: { limit, startDate, endDate },
    }),

  getOrderSummary: () => api.get<OrderSummary>("/Dashboard/orders/summary"),
};
