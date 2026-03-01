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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function AdminAnalyticsPage() {
  const { data: monthlyRevenue } = useQuery({
    queryKey: ["admin-monthly-revenue"],
    queryFn: () => dashboardApi.getMonthlyRevenue(),
    select: (res) => res.data,
  });

  const { data: dailyRevenue } = useQuery({
    queryKey: ["admin-daily-revenue"],
    queryFn: () => dashboardApi.getDailyRevenue(),
    select: (res) => res.data,
  });

  const { data: popularFrames } = useQuery({
    queryKey: ["admin-popular-frames"],
    queryFn: () => dashboardApi.getPopularFrames(5),
    select: (res) => res.data,
  });

  const pieData =
    popularFrames?.map((f) => ({
      name: f.frameName,
      value: f.totalSold,
    })) || [];

  return (
    <div>
      <h1 className="text-2xl font-bold">System Analytics</h1>
      <p className="mt-1 text-muted-foreground">
        Comprehensive business insights.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
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
                  <Bar dataKey="revenue" fill="#0088FE" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Revenue Trend</CardTitle>
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
                    stroke="#00C49F"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="orderCount"
                    stroke="#FFBB28"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Frames by Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name }) => name}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Selling Frames</CardTitle>
          </CardHeader>
          <CardContent>
            {popularFrames && popularFrames.length > 0 ? (
              <div className="space-y-3">
                {popularFrames.map((f, i) => (
                  <div
                    key={f.frameId}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                        style={{
                          backgroundColor: COLORS[i % COLORS.length] + "20",
                          color: COLORS[i % COLORS.length],
                        }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-medium">{f.frameName}</p>
                        <p className="text-xs text-muted-foreground">
                          {f.brand}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        ${f.revenue.toFixed(0)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {f.totalSold} sold
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No data.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
