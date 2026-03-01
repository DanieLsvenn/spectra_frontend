"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { framesApi } from "@/lib/api/frames";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminFramesPage() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-frames", page],
    queryFn: () => framesApi.getAll(page, 10),
    select: (res) => res.data,
  });

  const deleteMutation = useMutation({
    mutationFn: framesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-frames"] });
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Frame Management</h1>
      <p className="mt-1 text-muted-foreground">
        View and manage all frames in the system.
      </p>

      <div className="mt-6 space-y-4">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))
          : data?.items?.map((frame) => (
              <Card key={frame.frameId}>
                <CardContent className="flex items-center justify-between p-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{frame.frameName}</p>
                      <Badge variant="outline">{frame.brand}</Badge>
                      <Badge
                        variant={
                          frame.status === "available"
                            ? "default"
                            : "destructive"
                        }
                        className="capitalize"
                      >
                        {frame.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {frame.material} · {frame.shape} · $
                      {frame.basePrice?.toFixed(2)} · Stock:{" "}
                      {frame.stockQuantity ?? 0}
                    </p>
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
