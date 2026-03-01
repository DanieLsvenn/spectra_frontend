"use client";

import { useQuery } from "@tanstack/react-query";
import { preordersApi } from "@/lib/api/preorders";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function MyPreordersPage() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["my-preorders", page],
    queryFn: () => preordersApi.getMyPreorders(page, 10),
    select: (res) => res.data,
  });

  const cancelMutation = useMutation({
    mutationFn: (id: string) => preordersApi.cancel(id),
    onSuccess: () => {
      toast.success("Preorder cancelled.");
      queryClient.invalidateQueries({ queryKey: ["my-preorders"] });
    },
    onError: () => toast.error("Failed to cancel preorder."),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">My Preorders</h1>
      <p className="mt-1 text-muted-foreground">Track your preorder status.</p>

      <div className="mt-6 space-y-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))
          : data?.items?.map((preorder) => (
              <Card key={preorder.preorderId}>
                <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold">
                      Preorder #{preorder.preorderId.slice(0, 8)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(preorder.createdAt).toLocaleDateString()}
                    </p>
                    {preorder.expectedDate && (
                      <p className="text-xs text-muted-foreground">
                        Expected:{" "}
                        {new Date(preorder.expectedDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="capitalize">
                      {preorder.status}
                    </Badge>
                    {preorder.status === "pending" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          cancelMutation.mutate(preorder.preorderId)
                        }
                        disabled={cancelMutation.isPending}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

        {data && data.items?.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No preorders found.
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
