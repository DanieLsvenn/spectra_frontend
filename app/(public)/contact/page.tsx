"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@/components/home/animate-on-scroll";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Particles } from "@/components/ui/particles";
import { GridPattern } from "@/components/ui/grid-pattern";
import { MagicCard } from "@/components/ui/magic-card";
import { SpotlightCard } from "@/components/ui/spotlight";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    detail: "support@spectra.com",
    desc: "We respond within 24 hours",
    color: "from-brand-violet to-brand-purple",
  },
  {
    icon: Phone,
    title: "Phone",
    detail: "+84 123 456 789",
    desc: "Mon-Fri 9AM to 6PM",
    color: "from-brand-teal to-brand-cyan",
  },
  {
    icon: MapPin,
    title: "Address",
    detail: "123 Nguyen Hue, District 1",
    desc: "Ho Chi Minh City, Vietnam",
    color: "from-brand-coral to-brand-orange",
  },
  {
    icon: Clock,
    title: "Working Hours",
    detail: "Mon - Fri: 9AM - 6PM",
    desc: "Sat: 10AM - 4PM",
    color: "from-brand-pink to-brand-coral",
  },
];

const faqs = [
  {
    q: "How does Virtual Try-On work?",
    a: "Our 3D try-on uses your webcam and face-mapping technology to overlay frames in real-time.",
  },
  {
    q: "Can I return frames I don't like?",
    a: "Yes! We offer hassle-free returns within 30 days of purchase. Just submit a request.",
  },
  {
    q: "Do you accept prescriptions?",
    a: "Absolutely. You can upload and store your prescription securely in your Spectra account.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard delivery takes 5-7 business days. Express shipping is available for 2-3 day delivery.",
  },
];

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="overflow-hidden">
      {/* ==================== HERO ==================== */}
      <AuroraBackground className="relative">
        <section className="relative py-24 sm:py-32">
          <Particles
            className="absolute inset-0"
            quantity={35}
            color="#7c3aed"
            staticity={40}
          />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-2xl text-center"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
                <MessageCircle className="h-4 w-4" />
                Get In Touch
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">
                We&apos;d love to{" "}
                <span className="gradient-text">hear from you</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Have a question, feedback, or just want to say hi? Drop us a
                line and we&apos;ll get back to you within 24 hours.
              </p>
            </motion.div>
          </div>
        </section>
      </AuroraBackground>

      {/* ==================== CONTACT INFO CARDS ==================== */}
      <section className="relative py-20 section-mesh noise-overlay">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info) => (
              <StaggerItem key={info.title}>
                <SpotlightCard className="h-full">
                  <div className="p-6 text-center">
                    <div
                      className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${info.color} text-white shadow-lg`}
                    >
                      <info.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold">{info.title}</h3>
                    <p className="mt-1 text-sm font-medium text-primary">
                      {info.detail}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {info.desc}
                    </p>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ==================== FORM + FAQ ==================== */}
      <section className="relative py-28 overflow-hidden section-gradient-subtle">
        <GridPattern
          width={40}
          height={40}
          className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <AnimateOnScroll variant="fadeLeft">
              <MagicCard>
                <div className="p-8">
                  <h2 className="text-2xl font-bold">Send us a message</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Fill out the form below and we&apos;ll respond within 24
                    hours
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          required
                          className="rounded-xl border-primary/20 bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="rounded-xl border-primary/20 bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-primary/20"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="How can we help?"
                        required
                        className="rounded-xl border-primary/20 bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more..."
                        rows={5}
                        required
                        className="rounded-xl border-primary/20 bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-primary/20"
                      />
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="shimmer-button w-full gap-2 rounded-xl px-8 shadow-lg shadow-primary/30"
                      >
                        <Send className="h-4 w-4" />
                        Send Message
                      </Button>
                    </motion.div>
                  </form>
                </div>
              </MagicCard>
            </AnimateOnScroll>

            {/* FAQ */}
            <AnimateOnScroll variant="fadeRight">
              <div>
                <h2 className="text-2xl font-bold">
                  Frequently Asked Questions
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Quick answers to common questions
                </p>

                <div className="mt-8 space-y-4">
                  {faqs.map((faq, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <MagicCard>
                        <div className="p-5">
                          <h3 className="font-semibold text-sm">{faq.q}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {faq.a}
                          </p>
                        </div>
                      </MagicCard>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-brand-pink/5 p-6">
                  <h3 className="font-semibold">Need urgent help?</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    For order issues or urgent matters, call us directly during
                    business hours.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-4 inline-block"
                  >
                    <Button
                      variant="outline"
                      className="gap-2 rounded-xl border-primary/30"
                    >
                      <Phone className="h-4 w-4" />
                      Call +84 123 456 789
                    </Button>
                  </motion.div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ==================== MAP VISUAL ==================== */}
      <section className="relative overflow-hidden bg-foreground py-20 text-background">
        <div className="absolute inset-0">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-brand-violet blur-3xl opacity-10" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-brand-teal blur-3xl opacity-10" />
        </div>
        <Particles
          className="absolute inset-0"
          quantity={20}
          color="#a78bfa"
          staticity={50}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimateOnScroll variant="fadeLeft">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-cyan">
                Visit Us
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Come say{" "}
                <span className="text-brand-purple">hello</span> in person
              </h2>
              <p className="mt-4 text-background/70">
                Visit our showroom in the heart of Ho Chi Minh City. Try on
                frames, get expert advice, and experience Spectra firsthand.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-background/60">
                  <MapPin className="h-4 w-4 text-brand-cyan" />
                  123 Nguyen Hue, District 1, Ho Chi Minh City
                </div>
                <div className="flex items-center gap-3 text-sm text-background/60">
                  <Clock className="h-4 w-4 text-brand-cyan" />
                  Mon-Fri 9AM-6PM, Sat 10AM-4PM
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fadeRight">
              <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
                <div className="relative aspect-video bg-gradient-to-br from-brand-violet/20 via-brand-teal/10 to-brand-pink/20 flex items-center justify-center">
                  <GridPattern
                    width={24}
                    height={24}
                    className="opacity-20 stroke-white/20 fill-white/5"
                  />
                  <div className="relative text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <p className="mt-4 text-sm font-medium text-white/80">
                      Ho Chi Minh City, Vietnam
                    </p>
                    <p className="mt-1 text-xs text-white/50">
                      District 1, Nguyen Hue Boulevard
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
