"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "@/lib/api/orders";
import { Card, CardContent } from "@/components/ui/card";
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

const statuses = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function ManagerOrdersPage() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["manager-orders", page],
    queryFn: () => ordersApi.getAll(page, 10),
    select: (res) => res.data,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      ordersApi.updateStatus(id, status),
    onSuccess: () => {
      toast.success("Order updated.");
      queryClient.invalidateQueries({ queryKey: ["manager-orders"] });
    },
    onError: () => toast.error("Failed to update."),
  });

  const cancelMutation = useMutation({
    mutationFn: (id: string) => ordersApi.cancel(id),
    onSuccess: () => {
      toast.success("Order cancelled.");
      queryClient.invalidateQueries({ queryKey: ["manager-orders"] });
    },
    onError: () => toast.error("Failed to cancel."),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Orders</h1>
      <p className="mt-1 text-muted-foreground">Manage all customer orders.</p>

      <div className="mt-6 space-y-4">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))
          : data?.items?.map((order) => (
              <Card key={order.orderId}>
                <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <p className="font-semibold">
                      #{order.orderId.slice(0, 8)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.shippingAddress} &middot; $
                      {order.totalAmount?.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      defaultValue={order.status}
                      onValueChange={(val) =>
                        updateMutation.mutate({
                          id: order.orderId,
                          status: val,
                        })
                      }
                    >
                      <SelectTrigger className="w-36">
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
                    {order.status !== "cancelled" &&
                      order.status !== "delivered" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => cancelMutation.mutate(order.orderId)}
                        >
                          Cancel
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
