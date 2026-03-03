"use client";

import Image from "next/image";
import {
  Glasses,
  Eye,
  Users,
  Award,
  Heart,
  Lightbulb,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@/components/home/animate-on-scroll";

const stats = [
  {
    label: "Frames Available",
    value: "500+",
    icon: Glasses,
    color: "text-brand-violet",
    bg: "bg-brand-violet/10",
  },
  {
    label: "Happy Customers",
    value: "10,000+",
    icon: Users,
    color: "text-brand-teal",
    bg: "bg-brand-teal/10",
  },
  {
    label: "Virtual Try-Ons",
    value: "50,000+",
    icon: Eye,
    color: "text-brand-coral",
    bg: "bg-brand-coral/10",
  },
  {
    label: "Partner Brands",
    value: "20+",
    icon: Award,
    color: "text-brand-pink",
    bg: "bg-brand-pink/10",
  },
];

const values = [
  {
    title: "Mission",
    desc: "Make premium eyewear accessible through innovative technology.",
    icon: Target,
    color: "text-brand-violet",
    bg: "bg-brand-violet/10",
  },
  {
    title: "Vision",
    desc: "A world where everyone can try before they buy, from anywhere.",
    icon: Lightbulb,
    color: "text-brand-teal",
    bg: "bg-brand-teal/10",
  },
  {
    title: "Values",
    desc: "Quality, innovation, transparency, and customer satisfaction.",
    icon: Heart,
    color: "text-brand-coral",
    bg: "bg-brand-coral/10",
  },
];

const teamImages = [
  {
    src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=500&fit=crop&crop=face",
    name: "Dynamic Team",
  },
  {
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face",
    name: "Innovation First",
  },
  {
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop&crop=face",
    name: "Customer Love",
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-40 top-0 h-80 w-80 blob-violet opacity-30 blur-3xl" />
          <div className="absolute -right-40 bottom-0 h-80 w-80 blob-pink opacity-20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              Our Story
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              We help you <span className="gradient-text">see the world</span>{" "}
              your way
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We believe everyone deserves to see the world clearly and look
              great doing it. Spectra combines premium eyewear with cutting-edge
              technology to deliver a seamless shopping experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="rounded-2xl border border-primary/10 bg-card p-6 text-center"
                >
                  <div
                    className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}
                  >
                    <stat.icon className="h-7 w-7" />
                  </div>
                  <p className="text-3xl font-extrabold gradient-text">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team / Human Imagery */}
      <section className="relative overflow-hidden bg-foreground py-24 text-background">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-brand-violet blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-brand-teal blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimateOnScroll variant="fadeLeft">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-cyan">
                The People Behind Spectra
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Passionate about{" "}
                <span className="text-brand-purple">vision</span> and{" "}
                <span className="text-brand-coral">style</span>
              </h2>
              <div className="mt-6 space-y-4 text-background/70">
                <p>
                  Founded with a simple mission: make premium eyewear accessible
                  to everyone. We noticed that buying glasses online felt
                  impersonal and uncertain.
                </p>
                <p>
                  That&apos;s why we built our Virtual Try-On technology. Using
                  advanced 3D rendering and WebXR, customers can see exactly how
                  frames look on their face before making a purchase.
                </p>
                <p>
                  Combined with our curated selection from brands like Rayban,
                  Gucci, Oakley, and Persol, we offer a shopping experience that
                  rivals any physical store.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fadeRight">
              <div className="grid grid-cols-3 gap-4">
                {teamImages.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`overflow-hidden rounded-2xl ${i === 1 ? "mt-8" : ""}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.name}
                      width={300}
                      height={400}
                      className="aspect-[3/4] h-full w-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              What Drives Us
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built on <span className="gradient-text">strong foundations</span>
            </h2>
          </AnimateOnScroll>

          <StaggerContainer className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="rounded-2xl border border-primary/10 bg-card p-8"
                >
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${value.bg} ${value.color}`}
                  >
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {value.desc}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
