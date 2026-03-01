"use client";

import { useQuery } from "@tanstack/react-query";
import { ordersApi } from "@/lib/api/orders";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-indigo-100 text-indigo-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function MyOrdersPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["my-orders", page],
    queryFn: () => ordersApi.getMyOrders(page, 10),
    select: (res) => res.data,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">My Orders</h1>
      <p className="mt-1 text-muted-foreground">View and track your orders.</p>

      <div className="mt-6 space-y-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))
          : data?.items?.map((order) => (
              <Card key={order.orderId}>
                <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold">
                      Order #{order.orderId.slice(0, 8)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()} &middot;{" "}
                      {order.shippingAddress}
                    </p>
                    {order.arrivalDate && (
                      <p className="text-xs text-muted-foreground">
                        Expected:{" "}
                        {new Date(order.arrivalDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      className={`capitalize ${statusColors[order.status] || ""}`}
                      variant="outline"
                    >
                      {order.status}
                    </Badge>
                    <p className="text-lg font-bold">
                      ${order.totalAmount?.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}

        {data && data.items?.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No orders found.
          </div>
        )}

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
