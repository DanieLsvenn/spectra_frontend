"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { framesApi } from "@/lib/api/frames";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { Frame } from "@/types";

export default function InventoryPage() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const [editingFrame, setEditingFrame] = useState<Frame | null>(null);
  const [stock, setStock] = useState(0);
  const [reorder, setReorder] = useState(5);

  const { data, isLoading } = useQuery({
    queryKey: ["inventory-frames", page],
    queryFn: () => framesApi.getAll(page, 20),
    select: (res) => res.data,
  });

  const { data: lowStock } = useQuery({
    queryKey: ["low-stock"],
    queryFn: () => framesApi.getLowStock(),
    select: (res) => res.data,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      stockQuantity,
      reorderLevel,
    }: {
      id: string;
      stockQuantity: number;
      reorderLevel: number;
    }) => framesApi.updateInventory(id, { stockQuantity, reorderLevel }),
    onSuccess: () => {
      toast.success("Inventory updated!");
      queryClient.invalidateQueries({ queryKey: ["inventory-frames"] });
      queryClient.invalidateQueries({ queryKey: ["low-stock"] });
      setEditingFrame(null);
    },
    onError: () => toast.error("Failed to update inventory."),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Inventory Management</h1>
      <p className="mt-1 text-muted-foreground">
        Track stock levels and reorder points.
      </p>

      {/* Low Stock Summary */}
      {lowStock && lowStock.length > 0 && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="font-medium text-amber-800">
            {lowStock.length} frame(s) below reorder level
          </p>
        </div>
      )}

      <div className="mt-6 space-y-3">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))
          : data?.items?.map((frame) => {
              const isLow =
                (frame.stockQuantity ?? 0) <= (frame.reorderLevel ?? 5);
              return (
                <Card key={frame.frameId}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{frame.frameName}</p>
                        <Badge variant="outline">{frame.brand}</Badge>
                      </div>
                      <div className="mt-1 flex gap-4 text-sm text-muted-foreground">
                        <span>
                          Stock:{" "}
                          <span
                            className={
                              isLow ? "font-bold text-red-600" : "font-semibold"
                            }
                          >
                            {frame.stockQuantity ?? 0}
                          </span>
                        </span>
                        <span>Reorder Level: {frame.reorderLevel ?? 5}</span>
                      </div>
                    </div>
                    <Dialog
                      open={editingFrame?.frameId === frame.frameId}
                      onOpenChange={(open) => {
                        if (open) {
                          setEditingFrame(frame);
                          setStock(frame.stockQuantity ?? 0);
                          setReorder(frame.reorderLevel ?? 5);
                        } else {
                          setEditingFrame(null);
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Update Stock
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-sm">
                        <DialogHeader>
                          <DialogTitle>Update {frame.frameName}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Stock Quantity</Label>
                            <Input
                              type="number"
                              value={stock}
                              onChange={(e) => setStock(Number(e.target.value))}
                              min={0}
                            />
                          </div>
                          <div>
                            <Label>Reorder Level</Label>
                            <Input
                              type="number"
                              value={reorder}
                              onChange={(e) =>
                                setReorder(Number(e.target.value))
                              }
                              min={0}
                            />
                          </div>
                          <Button
                            className="w-full"
                            onClick={() =>
                              updateMutation.mutate({
                                id: frame.frameId,
                                stockQuantity: stock,
                                reorderLevel: reorder,
                              })
                            }
                            disabled={updateMutation.isPending}
                          >
                            Save
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              );
            })}

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
