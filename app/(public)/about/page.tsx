"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Glasses,
  Eye,
  Users,
  Award,
  Heart,
  Lightbulb,
  Target,
  ArrowRight,
  Clock,
  Globe,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@/components/home/animate-on-scroll";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Particles } from "@/components/ui/particles";
import { GridPattern, DotPattern } from "@/components/ui/grid-pattern";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { MagicCard } from "@/components/ui/magic-card";
import { SpotlightCard } from "@/components/ui/spotlight";
import { Marquee } from "@/components/ui/marquee";

const stats = [
  {
    label: "Frames Available",
    value: 500,
    suffix: "+",
    icon: Glasses,
    color: "text-brand-violet",
  },
  {
    label: "Happy Customers",
    value: 10000,
    suffix: "+",
    icon: Users,
    color: "text-brand-teal",
  },
  {
    label: "Virtual Try-Ons",
    value: 50000,
    suffix: "+",
    icon: Eye,
    color: "text-brand-coral",
  },
  {
    label: "Partner Brands",
    value: 20,
    suffix: "+",
    icon: Award,
    color: "text-brand-pink",
  },
];

const values = [
  {
    title: "Mission",
    desc: "Make premium eyewear accessible through innovative technology. Everyone deserves to see clearly and look great.",
    icon: Target,
    color: "from-brand-violet to-brand-purple",
  },
  {
    title: "Vision",
    desc: "A world where everyone can try before they buy, from anywhere. Bridging the gap between online convenience and in-store experience.",
    icon: Lightbulb,
    color: "from-brand-teal to-brand-cyan",
  },
  {
    title: "Values",
    desc: "Quality, innovation, transparency, and customer satisfaction. We never compromise on what matters most.",
    icon: Heart,
    color: "from-brand-coral to-brand-orange",
  },
];

const timeline = [
  {
    year: "2023",
    title: "The Idea",
    desc: "Identified the gap in online eyewear shopping — no way to try before buying.",
    icon: Lightbulb,
  },
  {
    year: "2024",
    title: "Building the Tech",
    desc: "Developed proprietary 3D face-mapping and virtual try-on engine using WebXR.",
    icon: Zap,
  },
  {
    year: "2024",
    title: "Launch & Growth",
    desc: "Launched Spectra with 200+ frames and 3D try-on. Grew to 10,000+ customers.",
    icon: Globe,
  },
  {
    year: "2025",
    title: "The Future",
    desc: "Expanding to 500+ frames, AI-powered recommendations, and international shipping.",
    icon: Clock,
  },
];

const teamImages = [
  {
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop&crop=face",
    name: "Dedicated Team Member",
  },
  {
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face",
    name: "Innovation First",
  },
  {
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face",
    name: "Customer Love",
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* ==================== HERO ==================== */}
      <AuroraBackground className="relative">
        <section className="relative py-24 sm:py-32">
          <Particles
            className="absolute inset-0"
            quantity={40}
            color="#7c3aed"
            staticity={40}
          />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mx-auto max-w-3xl text-center"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Our Story
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">
                We help you <span className="gradient-text">see the world</span>{" "}
                your way
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                We believe everyone deserves to see the world clearly and look
                great doing it. Spectra combines premium eyewear with
                cutting-edge technology to deliver a seamless shopping
                experience.
              </p>
            </motion.div>
          </div>
        </section>
      </AuroraBackground>

      {/* ==================== STATS ==================== */}
      <section className="relative py-20 section-mesh noise-overlay">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <MagicCard className="text-center">
                  <div className="p-6">
                    <stat.icon
                      className={`mx-auto mb-3 h-8 w-8 ${stat.color}`}
                    />
                    <div className="text-4xl font-extrabold gradient-text">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                      />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </MagicCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ==================== TIMELINE ==================== */}
      <section className="relative py-28 overflow-hidden section-gradient-cool">
        <GridPattern
          width={40}
          height={40}
          className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <AnimateOnScroll className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Our Journey
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              From <span className="gradient-text">idea to reality</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every great product starts with a simple observation
            </p>
          </AnimateOnScroll>

          <div className="relative mt-20">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent md:block" />

            <div className="space-y-12 md:space-y-0">
              {timeline.map((item, i) => (
                <AnimateOnScroll
                  key={item.year + item.title}
                  delay={i * 0.15}
                  variant={i % 2 === 0 ? "fadeLeft" : "fadeRight"}
                >
                  <div
                    className={`relative flex flex-col md:flex-row ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:mb-20`}
                  >
                    {/* Content */}
                    <div className="flex-1 md:w-1/2">
                      <MagicCard>
                        <div
                          className={`p-6 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                        >
                          <span className="text-sm font-bold text-primary">
                            {item.year}
                          </span>
                          <h3 className="mt-1 text-xl font-bold">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {item.desc}
                          </p>
                        </div>
                      </MagicCard>
                    </div>

                    {/* Node */}
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-brand-pink text-white shadow-lg shadow-primary/30">
                      <item.icon className="h-5 w-5" />
                    </div>

                    {/* Spacer */}
                    <div className="hidden flex-1 md:block md:w-1/2" />
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TEAM / IMAGERY ==================== */}
      <section className="relative overflow-hidden bg-foreground py-28 text-background">
        <div className="absolute inset-0">
          <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-brand-violet blur-3xl opacity-10" />
          <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-brand-teal blur-3xl opacity-10" />
          <div className="absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-brand-pink blur-3xl opacity-5" />
        </div>

        <Particles
          className="absolute inset-0"
          quantity={25}
          color="#a78bfa"
          staticity={50}
        />

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
              <div className="mt-8">
                <Link href="/shop">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-block"
                  >
                    <Button
                      size="lg"
                      className="shimmer-button gap-2 rounded-xl bg-white text-foreground hover:bg-white/90 shadow-xl"
                    >
                      Explore Our Collection
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fadeRight">
              <div className="grid grid-cols-3 gap-4">
                {teamImages.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`overflow-hidden rounded-2xl ring-1 ring-white/10 ${i === 1 ? "mt-8" : ""}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.name}
                      width={300}
                      height={400}
                      className="aspect-[3/4] h-full w-full object-cover transition-all duration-500 hover:saturate-[1.2]"
                    />
                  </motion.div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ==================== VALUES ==================== */}
      <section className="relative py-28 overflow-hidden section-gradient-warm">
        <DotPattern
          className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] opacity-40"
          width={20}
          height={20}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <AnimateOnScroll className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              What Drives Us
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Built on <span className="gradient-text">strong foundations</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </AnimateOnScroll>

          <StaggerContainer className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <SpotlightCard className="h-full">
                  <div className="p-8">
                    <div
                      className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${value.color} text-white shadow-lg`}
                    >
                      <value.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold">{value.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {value.desc}
                    </p>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ==================== BRANDS ==================== */}
      <section className="relative border-y border-primary/10 bg-secondary/30 py-8 overflow-hidden">
        <div className="absolute inset-0 section-gradient-subtle" />
        <AnimateOnScroll className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Trusted by top brands
          </p>
        </AnimateOnScroll>
        <Marquee speed={20} pauseOnHover className="[--gap:3rem]">
          {[
            "Rayban",
            "Gucci",
            "Oakley",
            "Persol",
            "Prada",
            "Tom Ford",
            "Versace",
            "Dior",
          ].map((brand) => (
            <span
              key={brand}
              className="inline-flex items-center gap-3 text-2xl font-bold tracking-tight text-muted-foreground/40 transition-colors hover:text-primary/60"
            >
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-primary/40 to-brand-pink/40" />
              {brand}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="relative py-28 section-mesh noise-overlay">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <AnimateOnScroll className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to <span className="gradient-text">join us</span>?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start your journey with Spectra today. Find your perfect frames
              and see the world in full color.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/shop">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    size="lg"
                    className="shimmer-button gap-2 rounded-xl px-8 shadow-xl shadow-primary/30"
                  >
                    Shop Collection
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/try-on">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 rounded-xl border-primary/30"
                  >
                    Try On Virtually
                  </Button>
                </motion.div>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
