"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="mt-4 text-muted-foreground">
          Have a question or need help? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {/* Info Cards */}
        <div className="space-y-4 lg:col-span-1">
          {[
            {
              icon: Mail,
              title: "Email",
              detail: "support@spectra.com",
            },
            {
              icon: Phone,
              title: "Phone",
              detail: "+84 123 456 789",
            },
            {
              icon: MapPin,
              title: "Address",
              detail: "123 Nguyen Hue, District 1, Ho Chi Minh City",
            },
          ].map((info) => (
            <Card key={info.title}>
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <info.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{info.title}</p>
                  <p className="text-sm text-muted-foreground">{info.detail}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more..."
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
