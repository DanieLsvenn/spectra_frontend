"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/lib/api/dashboard";
import { framesApi } from "@/lib/api/frames";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Package,
  Users,
  Glasses,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

export default function ManagerDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => dashboardApi.getStatistics(),
    select: (res) => res.data,
  });

  const { data: lowStock } = useQuery({
    queryKey: ["low-stock"],
    queryFn: () => framesApi.getLowStock(),
    select: (res) => res.data,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Manager Dashboard</h1>
      <p className="mt-1 text-muted-foreground">
        Overview of business performance and inventory.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">
                ${stats?.totalRevenue?.toFixed(0) ?? 0}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold">{stats?.totalOrders ?? 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Customers</p>
              <p className="text-2xl font-bold">{stats?.totalCustomers ?? 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <Glasses className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Frames</p>
              <p className="text-2xl font-bold">{stats?.totalFrames ?? 0}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      {lowStock && lowStock.length > 0 && (
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Low Stock Alerts
            </CardTitle>
            <Link
              href="/manager/inventory"
              className="text-sm text-primary hover:underline"
            >
              Manage Inventory
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStock.slice(0, 5).map((frame) => (
                <div
                  key={frame.frameId}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{frame.frameName}</p>
                    <p className="text-xs text-muted-foreground">
                      {frame.brand}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        frame.stockQuantity === 0 ? "destructive" : "outline"
                      }
                    >
                      Stock: {frame.stockQuantity ?? 0}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
