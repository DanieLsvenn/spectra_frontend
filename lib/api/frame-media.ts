import api from "@/lib/api";
import type { FrameMedia } from "@/types";

export const frameMediaApi = {
  getByFrame: (frameId: string) =>
    api.get<FrameMedia[]>(`/FrameMedia/frame/${frameId}`),

  getById: (id: string) => api.get<FrameMedia>(`/FrameMedia/${id}`),

  add: (data: { frameId: string; mediaUrl: string; mediaType: string }) =>
    api.post<FrameMedia>("/FrameMedia", data),

  addBatch: (data: {
    frameId: string;
    items: { mediaUrl: string; mediaType: string }[];
  }) => api.post("/FrameMedia/batch", data),

  upload: (frameId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post(`/FrameMedia/upload/${frameId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  uploadMultiple: (frameId: string, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    return api.post(`/FrameMedia/upload-multiple/${frameId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  update: (id: string, data: Partial<FrameMedia>) =>
    api.put(`/FrameMedia/${id}`, data),

  delete: (id: string) => api.delete(`/FrameMedia/${id}`),

  deleteByFrame: (frameId: string) =>
    api.delete(`/FrameMedia/frame/${frameId}`),
};
