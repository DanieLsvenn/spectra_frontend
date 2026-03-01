"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { lensFeaturesApi } from "@/lib/api/lens";
import { Card, CardContent } from "@/components/ui/card";
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
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function LensFeaturesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const [spec, setSpec] = useState("");
  const [index, setIndex] = useState(1.56);
  const [price, setPrice] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["lens-features-manage"],
    queryFn: () => lensFeaturesApi.getAll(1, 50),
    select: (res) => res.data,
  });

  const createMutation = useMutation({
    mutationFn: () =>
      lensFeaturesApi.create({
        featureSpecification: spec,
        lensIndex: index,
        extraPrice: price,
      }),
    onSuccess: () => {
      toast.success("Lens feature created!");
      queryClient.invalidateQueries({ queryKey: ["lens-features-manage"] });
      setDialogOpen(false);
      setSpec("");
      setIndex(1.56);
      setPrice(0);
    },
    onError: () => toast.error("Failed to create."),
  });

  const deleteMutation = useMutation({
    mutationFn: lensFeaturesApi.delete,
    onSuccess: () => {
      toast.success("Deleted.");
      queryClient.invalidateQueries({ queryKey: ["lens-features-manage"] });
    },
    onError: () => toast.error("Cannot delete (may be in use)."),
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Lens Features</h1>
          <p className="mt-1 text-muted-foreground">
            Manage lens feature options.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>New Lens Feature</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label>Specification</Label>
                <Input value={spec} onChange={(e) => setSpec(e.target.value)} />
              </div>
              <div>
                <Label>Lens Index</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={index}
                  onChange={(e) => setIndex(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Extra Price</Label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <Button
                className="w-full"
                onClick={() => createMutation.mutate()}
                disabled={createMutation.isPending}
              >
                Create
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 space-y-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))
          : data?.items?.map((lf) => (
              <Card key={lf.featureId}>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{lf.featureSpecification}</p>
                    <p className="text-sm text-muted-foreground">
                      Index {lf.lensIndex} · +${lf.extraPrice.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMutation.mutate(lf.featureId)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
