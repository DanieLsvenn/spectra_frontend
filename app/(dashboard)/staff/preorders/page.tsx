"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { preordersApi } from "@/lib/api/preorders";
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

const statuses = ["pending", "confirmed", "paid", "converted", "cancelled"];

export default function StaffPreordersPage() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["all-preorders", page],
    queryFn: () => preordersApi.getAll(page, 10),
    select: (res) => res.data,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      preordersApi.updateStatus(id, status),
    onSuccess: () => {
      toast.success("Preorder status updated.");
      queryClient.invalidateQueries({ queryKey: ["all-preorders"] });
    },
    onError: () => toast.error("Failed to update status."),
  });

  const convertMutation = useMutation({
    mutationFn: (id: string) => preordersApi.convertToOrder(id),
    onSuccess: () => {
      toast.success("Preorder converted to order!");
      queryClient.invalidateQueries({ queryKey: ["all-preorders"] });
    },
    onError: () => toast.error("Failed to convert preorder."),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Preorders</h1>
      <p className="mt-1 text-muted-foreground">
        View, update and convert preorders.
      </p>

      <div className="mt-6 space-y-4">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))
          : data?.items?.map((po) => (
              <Card key={po.preorderId}>
                <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <p className="font-semibold">
                      #{po.preorderId.slice(0, 8)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(po.createdAt).toLocaleDateString()}
                      {po.expectedDate &&
                        ` · Expected: ${new Date(po.expectedDate).toLocaleDateString()}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      defaultValue={po.status}
                      onValueChange={(val) =>
                        updateMutation.mutate({
                          id: po.preorderId,
                          status: val,
                        })
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((s) => (
                          <SelectItem key={s} value={s} className="capitalize">
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {po.status === "paid" && (
                      <Button
                        size="sm"
                        onClick={() => convertMutation.mutate(po.preorderId)}
                      >
                        Convert
                      </Button>
                    )}
                  </div>
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
