"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { complaintsApi } from "@/lib/api/complaints";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const cStatuses = [
  "pending",
  "under_review",
  "approved",
  "rejected",
  "in_progress",
  "resolved",
  "cancelled",
];

export default function AdminComplaintsPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-complaints", page, statusFilter],
    queryFn: () =>
      statusFilter === "all"
        ? complaintsApi.getAll(page, 10)
        : complaintsApi.getByStatus(statusFilter, page, 10),
    select: (res) => res.data,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      complaintsApi.updateStatus(id, status),
    onSuccess: () => {
      toast.success("Status updated.");
      queryClient.invalidateQueries({ queryKey: ["admin-complaints"] });
    },
    onError: () => toast.error("Failed."),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Complaint Resolution</h1>
      <p className="mt-1 text-muted-foreground">
        Review and resolve complaints system-wide.
      </p>

      <div className="mt-6 mb-4 flex gap-3">
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {cStatuses.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))
          : data?.items?.map((c) => (
              <Card key={c.requestId}>
                <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {c.requestType}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        #{c.requestId.slice(0, 8)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{c.reason}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Select
                    defaultValue={c.status}
                    onValueChange={(val) =>
                      updateMutation.mutate({ id: c.requestId, status: val })
                    }
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cStatuses.map((s) => (
                        <SelectItem key={s} value={s} className="capitalize">
                          {s.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            ))}

        {data && data.totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <span className="flex items-center px-4 text-sm">
              {page} / {data.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === data.totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
