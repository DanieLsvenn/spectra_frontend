"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/lib/api/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Package,
  Users,
  Glasses,
  AlertTriangle,
  MessageSquareWarning,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => dashboardApi.getStatistics(),
    select: (res) => res.data,
  });

  const { data: summary } = useQuery({
    queryKey: ["admin-order-summary"],
    queryFn: () => dashboardApi.getOrderSummary(),
    select: (res) => res.data,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-1 text-muted-foreground">
        System-wide overview and management.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Revenue</p>
              <p className="text-xl font-bold">
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
              <p className="text-xs text-muted-foreground">Orders</p>
              <p className="text-xl font-bold">{stats?.totalOrders ?? 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Customers</p>
              <p className="text-xl font-bold">{stats?.totalCustomers ?? 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <Glasses className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Frames</p>
              <p className="text-xl font-bold">{stats?.totalFrames ?? 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pending Orders</p>
              <p className="text-xl font-bold">{stats?.pendingOrders ?? 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <MessageSquareWarning className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Complaints</p>
              <p className="text-xl font-bold">
                {stats?.pendingComplaints ?? 0}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            href: "/admin/users",
            label: "Manage Users",
            desc: "CRUD and role assignment",
          },
          {
            href: "/admin/orders",
            label: "All Orders",
            desc: "Order & payment overview",
          },
          {
            href: "/admin/complaints",
            label: "Complaints",
            desc: "Resolution center",
          },
          {
            href: "/admin/analytics",
            label: "Analytics",
            desc: "System-wide insights",
          },
        ].map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <p className="font-semibold">{link.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {link.desc}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Period Summary */}
      {summary && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Period Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-muted/50 p-4 text-center">
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-2xl font-bold">
                  {summary.todayOrders} orders
                </p>
                <p className="text-sm text-green-600">
                  ${summary.todayRevenue?.toFixed(0)}
                </p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4 text-center">
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">
                  {summary.weekOrders} orders
                </p>
                <p className="text-sm text-green-600">
                  ${summary.weekRevenue?.toFixed(0)}
                </p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4 text-center">
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">
                  {summary.monthOrders} orders
                </p>
                <p className="text-sm text-green-600">
                  ${summary.monthRevenue?.toFixed(0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
