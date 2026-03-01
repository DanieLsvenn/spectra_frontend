"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/lib/api/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function AnalyticsPage() {
  const { data: monthlyRevenue } = useQuery({
    queryKey: ["monthly-revenue"],
    queryFn: () => dashboardApi.getMonthlyRevenue(),
    select: (res) => res.data,
  });

  const { data: dailyRevenue } = useQuery({
    queryKey: ["daily-revenue"],
    queryFn: () => dashboardApi.getDailyRevenue(),
    select: (res) => res.data,
  });

  const { data: popularFrames } = useQuery({
    queryKey: ["popular-frames"],
    queryFn: () => dashboardApi.getPopularFrames(10),
    select: (res) => res.data,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Analytics</h1>
      <p className="mt-1 text-muted-foreground">
        Revenue charts and sales insights.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Monthly Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenue || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar
                    dataKey="revenue"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Daily Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Revenue (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyRevenue || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Frames */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Top Selling Frames</CardTitle>
        </CardHeader>
        <CardContent>
          {popularFrames && popularFrames.length > 0 ? (
            <div className="space-y-3">
              {popularFrames.map((frame, i) => (
                <div
                  key={frame.frameId}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium">{frame.frameName}</p>
                      <p className="text-xs text-muted-foreground">
                        {frame.brand}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      ${frame.revenue.toFixed(0)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {frame.totalSold} sold
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No data available.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
