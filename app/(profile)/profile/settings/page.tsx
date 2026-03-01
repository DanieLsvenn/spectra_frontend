"use client";

import { useAuth } from "@/contexts/auth-context";
import { usersApi } from "@/lib/api/users";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const schema = z.object({
  fullName: z.string().min(2),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type SettingsForm = z.infer<typeof schema>;

export default function SettingsPage() {
  const { fullUser, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: fullUser?.fullName || "",
      phone: fullUser?.phone || "",
      address: fullUser?.address || "",
    },
  });

  const onSubmit = async (data: SettingsForm) => {
    setLoading(true);
    try {
      await usersApi.updateMe(data);
      await refreshUser();
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-1 text-muted-foreground">
        Manage your account information.
      </p>

      <Card className="mt-6 max-w-lg">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{fullUser?.email}</p>
              </div>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
