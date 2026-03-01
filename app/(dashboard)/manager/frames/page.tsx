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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function ManagerFramesPage() {
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  // Form state
  const [formData, setFormData] = useState({
    frameName: "",
    brand: "",
    material: "",
    shape: "",
    size: "M",
    basePrice: 0,
    lensWidth: 52,
    bridgeWidth: 18,
    frameWidth: 140,
    templeLength: 145,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["manager-frames", page],
    queryFn: () => framesApi.getAll(page, 10),
    select: (res) => res.data,
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) =>
      framesApi.create({ ...data, status: "available" }),
    onSuccess: () => {
      toast.success("Frame created!");
      queryClient.invalidateQueries({ queryKey: ["manager-frames"] });
      setDialogOpen(false);
    },
    onError: () => toast.error("Failed to create frame."),
  });

  const deleteMutation = useMutation({
    mutationFn: framesApi.delete,
    onSuccess: () => {
      toast.success("Frame deactivated.");
      queryClient.invalidateQueries({ queryKey: ["manager-frames"] });
    },
    onError: () => toast.error("Failed to delete frame."),
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage Frames</h1>
          <p className="mt-1 text-muted-foreground">
            Create, edit, and manage frame catalog.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Frame
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>New Frame</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createMutation.mutate(formData);
              }}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={formData.frameName}
                    onChange={(e) =>
                      setFormData({ ...formData, frameName: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label>Brand</Label>
                  <Input
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label>Material</Label>
                  <Input
                    value={formData.material}
                    onChange={(e) =>
                      setFormData({ ...formData, material: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label>Shape</Label>
                  <Input
                    value={formData.shape}
                    onChange={(e) =>
                      setFormData({ ...formData, shape: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label>Size</Label>
                  <Input
                    value={formData.size}
                    onChange={(e) =>
                      setFormData({ ...formData, size: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Base Price</Label>
                  <Input
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        basePrice: Number(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={createMutation.isPending}
              >
                Create Frame
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

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
                      {frame.material} · {frame.shape} · {frame.size} · $
                      {frame.basePrice?.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Delete"
                      onClick={() => deleteMutation.mutate(frame.frameId)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
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
