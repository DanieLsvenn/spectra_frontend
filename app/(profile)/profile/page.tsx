"use client";

import { useAuth } from "@/contexts/auth-context";
import { useQuery } from "@tanstack/react-query";
import { ordersApi } from "@/lib/api/orders";
import { prescriptionsApi } from "@/lib/api/prescriptions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, FileText, Clock, DollarSign } from "lucide-react";
import Link from "next/link";

export default function ProfileOverview() {
  const { user } = useAuth();

  const { data: orders } = useQuery({
    queryKey: ["my-orders", 1],
    queryFn: () => ordersApi.getMyOrders(1, 5),
    select: (res) => res.data,
  });

  const { data: prescriptions } = useQuery({
    queryKey: ["my-prescriptions", 1],
    queryFn: () => prescriptionsApi.getMyPrescriptions(1, 5),
    select: (res) => res.data,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome back, {user?.fullName}</h1>
      <p className="mt-1 text-muted-foreground">
        Here&apos;s an overview of your account.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold">{orders?.totalItems ?? 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Prescriptions</p>
              <p className="text-2xl font-bold">
                {prescriptions?.totalItems ?? 0}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Processing</p>
              <p className="text-2xl font-bold">
                {orders?.items?.filter((o) => o.status === "processing")
                  .length ?? 0}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="text-2xl font-bold">
                $
                {orders?.items
                  ?.reduce((s, o) => s + (o.totalAmount || 0), 0)
                  .toFixed(0) ?? "0"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Link
            href="/profile/orders"
            className="text-sm text-primary hover:underline"
          >
            View All
          </Link>
        </CardHeader>
        <CardContent>
          {orders?.items && orders.items.length > 0 ? (
            <div className="space-y-3">
              {orders.items.slice(0, 5).map((order) => (
                <div
                  key={order.orderId}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">
                      Order #{order.orderId.slice(0, 8)}...
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      ${order.totalAmount?.toFixed(2)}
                    </p>
                    <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs capitalize">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No orders yet. Start shopping!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
