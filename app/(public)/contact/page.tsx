"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { AnimateOnScroll } from "@/components/home/animate-on-scroll";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    detail: "support@spectra.com",
    color: "text-brand-violet",
    bg: "bg-brand-violet/10",
  },
  {
    icon: Phone,
    title: "Phone",
    detail: "+84 123 456 789",
    color: "text-brand-teal",
    bg: "bg-brand-teal/10",
  },
  {
    icon: MapPin,
    title: "Address",
    detail: "123 Nguyen Hue, District 1, Ho Chi Minh City",
    color: "text-brand-coral",
    bg: "bg-brand-coral/10",
  },
];

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-80 w-80 blob-violet opacity-20 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-80 w-80 blob-teal opacity-15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            Get In Touch
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            We&apos;d love to{" "}
            <span className="gradient-text">hear from you</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a question, feedback, or just want to say hi? Drop us a line.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {/* Info Cards */}
          <AnimateOnScroll
            variant="fadeLeft"
            className="space-y-4 lg:col-span-1"
          >
            {contactInfo.map((info) => (
              <motion.div
                key={info.title}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="rounded-2xl border-primary/10 transition-shadow hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="flex items-start gap-4 p-5">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${info.bg} ${info.color}`}
                    >
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{info.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {info.detail}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimateOnScroll>

          {/* Form */}
          <AnimateOnScroll variant="fadeRight" className="lg:col-span-2">
            <Card className="rounded-2xl border-primary/10">
              <CardHeader>
                <CardTitle className="text-xl">Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        required
                        className="rounded-xl border-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="rounded-xl border-primary/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      required
                      className="rounded-xl border-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more..."
                      rows={5}
                      required
                      className="rounded-xl border-primary/20"
                    />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="gap-2 rounded-xl px-8 shadow-lg shadow-primary/30"
                    >
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  );
}
