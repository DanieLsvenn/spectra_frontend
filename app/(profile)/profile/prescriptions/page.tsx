"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { prescriptionsApi } from "@/lib/api/prescriptions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const prescriptionSchema = z.object({
  sphereRight: z.number().min(-20).max(20),
  sphereLeft: z.number().min(-20).max(20),
  cylinderRight: z.number().min(-10).max(0).optional(),
  cylinderLeft: z.number().min(-10).max(0).optional(),
  axisRight: z.number().min(0).max(180).optional(),
  axisLeft: z.number().min(0).max(180).optional(),
  addRight: z.number().min(0).max(4).optional(),
  addLeft: z.number().min(0).max(4).optional(),
  pupillaryDistance: z.number().min(50).max(80).optional(),
  doctorName: z.string().optional(),
  clinicName: z.string().optional(),
  expirationDate: z.string().optional(),
});

type PrescriptionForm = z.infer<typeof prescriptionSchema>;

export default function PrescriptionsPage() {
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["my-prescriptions", page],
    queryFn: () => prescriptionsApi.getMyPrescriptions(page, 10),
    select: (res) => res.data,
  });

  const createMutation = useMutation({
    mutationFn: prescriptionsApi.create,
    onSuccess: () => {
      toast.success("Prescription saved!");
      queryClient.invalidateQueries({ queryKey: ["my-prescriptions"] });
      setDialogOpen(false);
    },
    onError: () => toast.error("Failed to save prescription."),
  });

  const deleteMutation = useMutation({
    mutationFn: prescriptionsApi.delete,
    onSuccess: () => {
      toast.success("Prescription deleted.");
      queryClient.invalidateQueries({ queryKey: ["my-prescriptions"] });
    },
    onError: () => toast.error("Cannot delete (may be in use)."),
  });

  const form = useForm<PrescriptionForm>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      sphereRight: 0,
      sphereLeft: 0,
    },
  });

  const onSubmit = (data: PrescriptionForm) => {
    createMutation.mutate(data);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Prescriptions</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your eye prescriptions.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Prescription
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>New Prescription</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="sphereRight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sphere OD (Right)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.25"
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sphereLeft"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sphere OS (Left)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.25"
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cylinderRight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cylinder OD</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.25"
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.valueAsNumber || undefined,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cylinderLeft"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cylinder OS</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.25"
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.valueAsNumber || undefined,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="axisRight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Axis OD</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.valueAsNumber || undefined,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="axisLeft"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Axis OS</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.valueAsNumber || undefined,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="addRight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add OD</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.25"
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.valueAsNumber || undefined,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="addLeft"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add OS</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.25"
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.valueAsNumber || undefined,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="pupillaryDistance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pupillary Distance (mm)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber || undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="doctorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doctor Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clinicName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Clinic Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="expirationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiration Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={createMutation.isPending}
                >
                  Save Prescription
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 space-y-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-xl" />
            ))
          : data?.items?.map((rx) => (
              <Card key={rx.prescriptionId}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">
                          {rx.doctorName || "Prescription"}
                        </p>
                        {rx.expirationDate &&
                        new Date(rx.expirationDate) > new Date() ? (
                          <Badge className="bg-green-100 text-green-800">
                            Valid
                          </Badge>
                        ) : (
                          <Badge variant="destructive">Expired</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {rx.clinicName || "N/A"}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => deleteMutation.mutate(rx.prescriptionId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-4">
                    <div>
                      <span className="text-muted-foreground">SPH OD:</span>{" "}
                      {rx.sphereRight}
                    </div>
                    <div>
                      <span className="text-muted-foreground">SPH OS:</span>{" "}
                      {rx.sphereLeft}
                    </div>
                    <div>
                      <span className="text-muted-foreground">CYL OD:</span>{" "}
                      {rx.cylinderRight || "-"}
                    </div>
                    <div>
                      <span className="text-muted-foreground">CYL OS:</span>{" "}
                      {rx.cylinderLeft || "-"}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Axis OD:</span>{" "}
                      {rx.axisRight || "-"}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Axis OS:</span>{" "}
                      {rx.axisLeft || "-"}
                    </div>
                    <div>
                      <span className="text-muted-foreground">PD:</span>{" "}
                      {rx.pupillaryDistance || "-"}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Exp:</span>{" "}
                      {rx.expirationDate
                        ? new Date(rx.expirationDate).toLocaleDateString()
                        : "-"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

        {data && data.items?.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No prescriptions saved yet.
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
