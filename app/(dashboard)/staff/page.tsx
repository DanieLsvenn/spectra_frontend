"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/lib/api/dashboard";
import { ordersApi } from "@/lib/api/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Clock, CheckCircle, AlertTriangle } from "lucide-react";

export default function StaffDashboard() {
  const { data: summary } = useQuery({
    queryKey: ["order-summary"],
    queryFn: () => dashboardApi.getOrderSummary(),
    select: (res) => res.data,
  });

  const { data: recentOrders } = useQuery({
    queryKey: ["all-orders-staff", 1],
    queryFn: () => ordersApi.getAll(1, 5),
    select: (res) => res.data,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Staff Dashboard</h1>
      <p className="mt-1 text-muted-foreground">
        Manage orders and support requests.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Today&apos;s Orders
              </p>
              <p className="text-2xl font-bold">{summary?.todayOrders ?? 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Week</p>
              <p className="text-2xl font-bold">{summary?.weekOrders ?? 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold">{summary?.monthOrders ?? 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Today Revenue</p>
              <p className="text-2xl font-bold">
                ${summary?.todayRevenue?.toFixed(0) ?? 0}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentOrders?.items?.map((order) => (
              <div
                key={order.orderId}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="text-sm font-medium">
                    #{order.orderId.slice(0, 8)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.shippingAddress}
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
            )) || (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No orders.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
