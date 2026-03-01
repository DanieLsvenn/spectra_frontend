"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { complaintsApi } from "@/lib/api/complaints";
import { ordersApi } from "@/lib/api/orders";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const complaintSchema = z.object({
  orderItemId: z.string().min(1, "Select an order item"),
  requestType: z.enum([
    "return",
    "exchange",
    "refund",
    "complaint",
    "warranty",
  ]),
  reason: z.string().min(5, "Reason must be at least 5 characters"),
  mediaUrl: z.string().url().optional().or(z.literal("")),
});

type ComplaintForm = z.infer<typeof complaintSchema>;

export default function ComplaintsPage() {
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["my-complaints", page],
    queryFn: () => complaintsApi.getMyComplaints(page, 10),
    select: (res) => res.data,
  });

  const { data: orders } = useQuery({
    queryKey: ["my-orders-for-complaints"],
    queryFn: () => ordersApi.getMyOrders(1, 50),
    select: (res) => res.data.items,
  });

  const createMutation = useMutation({
    mutationFn: complaintsApi.create,
    onSuccess: () => {
      toast.success("Complaint submitted!");
      queryClient.invalidateQueries({ queryKey: ["my-complaints"] });
      setDialogOpen(false);
      form.reset();
    },
    onError: () => toast.error("Failed to submit complaint."),
  });

  const form = useForm<ComplaintForm>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      orderItemId: "",
      requestType: "complaint",
      reason: "",
      mediaUrl: "",
    },
  });

  const onSubmit = (data: ComplaintForm) => {
    createMutation.mutate({
      orderItemId: data.orderItemId,
      requestType: data.requestType,
      reason: data.reason,
      mediaUrl: data.mediaUrl || undefined,
    });
  };

  const allOrderItems =
    orders?.flatMap(
      (o) =>
        o.orderItems?.map((oi) => ({
          ...oi,
          orderShort: o.orderId.slice(0, 8),
        })) || [],
    ) || [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Complaints & Returns</h1>
          <p className="mt-1 text-muted-foreground">
            Submit and track your requests.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit a Request</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="orderItemId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Item</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an item" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {allOrderItems.map((oi) => (
                            <SelectItem
                              key={oi.orderItemId}
                              value={oi.orderItemId}
                            >
                              Order #{oi.orderShort} -{" "}
                              {oi.frame?.frameName || "Item"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="requestType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Request Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="return">Return</SelectItem>
                          <SelectItem value="exchange">Exchange</SelectItem>
                          <SelectItem value="refund">Refund</SelectItem>
                          <SelectItem value="complaint">Complaint</SelectItem>
                          <SelectItem value="warranty">Warranty</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="Describe your issue..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mediaUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={createMutation.isPending}
                >
                  Submit Request
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 space-y-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))
          : data?.items?.map((c) => (
              <Card key={c.requestId}>
                <CardContent className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold capitalize">
                        {c.requestType}
                      </p>
                      <Badge variant="outline" className="capitalize">
                        {c.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {c.reason}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}

        {data && data.items?.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No requests yet.
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
