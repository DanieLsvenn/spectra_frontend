"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Glasses,
  Eye,
  RotateCcw,
  Shield,
  Sparkles,
  Star,
  Zap,
  Camera,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@/components/home/animate-on-scroll";

const FloatingGlasses = dynamic(
  () =>
    import("@/components/home/floating-glasses").then(
      (mod) => mod.FloatingGlasses,
    ),
  { ssr: false },
);

const heroImages = [
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&h=400&fit=crop",
];

const lifestyleImages = [
  {
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
    alt: "Stylish person wearing glasses in sunlight",
  },
  {
    src: "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=600&h=600&fit=crop",
    alt: "Person trying on trendy frames",
  },
  {
    src: "https://images.unsplash.com/photo-1589642380614-4a8c2147b857?w=600&h=600&fit=crop",
    alt: "Fun lifestyle shot with eyewear",
  },
  {
    src: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&h=600&fit=crop",
    alt: "Fashion forward glasses look",
  },
];

const features = [
  {
    icon: Glasses,
    title: "Premium Frames",
    desc: "Curated collection from top brands like Rayban, Gucci, and Oakley.",
    color: "from-brand-violet to-brand-purple",
    bgColor: "bg-brand-violet/10",
    textColor: "text-brand-violet",
  },
  {
    icon: Eye,
    title: "Virtual Try-On",
    desc: "See how frames look on you with our 3D & VR technology.",
    color: "from-brand-teal to-brand-cyan",
    bgColor: "bg-brand-teal/10",
    textColor: "text-brand-teal",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    desc: "Not satisfied? Submit a return or exchange request with ease.",
    color: "from-brand-coral to-brand-orange",
    bgColor: "bg-brand-coral/10",
    textColor: "text-brand-coral",
  },
  {
    icon: Shield,
    title: "Prescription Safe",
    desc: "Store your prescriptions securely and link them to every order.",
    color: "from-brand-pink to-brand-coral",
    bgColor: "bg-brand-pink/10",
    textColor: "text-brand-pink",
  },
];

const testimonials = [
  {
    name: "Minh Anh",
    text: "The virtual try-on is insane! I could see exactly how my frames would look before ordering.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Thanh Nguyen",
    text: "Best eyewear shopping experience I've ever had. The 3D feature blew my mind!",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Linh Tran",
    text: "Super fast delivery and the frames quality is amazing. Spectra is now my go-to!",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <>
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] blob-violet opacity-40 blur-3xl animate-blob" />
          <div className="absolute -right-40 top-20 h-[400px] w-[400px] blob-pink opacity-30 blur-3xl animate-blob [animation-delay:2s]" />
          <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] blob-teal opacity-20 blur-3xl animate-blob [animation-delay:4s]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Left: Text Content */}
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                  <Sparkles className="h-4 w-4" />
                  New: 3D Virtual Try-On is here
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
              >
                See Life in <span className="gradient-text">Full Color</span>
                <br />
                <span className="text-muted-foreground">
                  Through Your Style
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
              >
                Premium eyewear crafted for clarity, comfort, and pure vibes.
                Try on frames virtually with our cutting-edge 3D technology
                before you buy.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <Link href="/shop">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      size="lg"
                      className="gap-2 rounded-xl bg-primary px-8 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40"
                    >
                      Shop Frames
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/try-on">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="gap-2 rounded-xl border-primary/30 hover:bg-primary/5"
                    >
                      <Camera className="h-4 w-4" />
                      Virtual Try-On
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-10 flex items-center gap-4"
              >
                <div className="flex -space-x-3">
                  {testimonials.map((t, i) => (
                    <div
                      key={i}
                      className="h-10 w-10 overflow-hidden rounded-full border-2 border-background"
                    >
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-brand-yellow text-brand-yellow"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Loved by{" "}
                    <span className="font-semibold text-foreground">
                      10,000+
                    </span>{" "}
                    happy customers
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right: 3D + Image Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative order-1 lg:order-2"
            >
              {/* 3D Glasses */}
              <div className="relative mx-auto aspect-square max-w-[500px]">
                {/* Glow ring */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-brand-violet/20 via-brand-pink/10 to-brand-teal/20 blur-2xl" />

                <div className="relative h-full w-full">
                  <FloatingGlasses />
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -left-2 top-1/4 rounded-2xl bg-card p-3 shadow-xl sm:left-0"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-teal/10">
                      <Zap className="h-4 w-4 text-brand-teal" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">3D Try-On</p>
                      <p className="text-[10px] text-muted-foreground">
                        Real-time
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -right-2 bottom-1/4 rounded-2xl bg-card p-3 shadow-xl sm:right-0"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-coral/10">
                      <Star className="h-4 w-4 text-brand-coral fill-brand-coral" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">500+ Frames</p>
                      <p className="text-[10px] text-muted-foreground">
                        Premium brands
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== BRAND MARQUEE ==================== */}
      <section className="border-y border-primary/10 bg-secondary/30 py-6 overflow-hidden">
        <div className="relative">
          <div className="flex animate-marquee gap-12 whitespace-nowrap">
            {[...Array(2)].flatMap(() =>
              [
                "Rayban",
                "Gucci",
                "Oakley",
                "Persol",
                "Spectra",
                "Prada",
                "Tom Ford",
                "Versace",
              ].map((brand, i) => (
                <span
                  key={`${brand}-${i}`}
                  className="inline-flex items-center gap-3 text-xl font-bold tracking-tight text-muted-foreground/40"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/30" />
                  {brand}
                </span>
              )),
            )}
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="relative py-24">
        <div className="absolute right-0 top-0 h-64 w-64 blob-teal opacity-15 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Why Spectra
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need,{" "}
              <span className="gradient-text">nothing you don&apos;t</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From browsing to buying, we make every step effortless and fun.
            </p>
          </AnimateOnScroll>

          <StaggerContainer className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative rounded-2xl border border-primary/10 bg-card p-6 text-center transition-shadow hover:shadow-xl hover:shadow-primary/10"
                >
                  <div
                    className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bgColor} ${feature.textColor} transition-transform group-hover:scale-110`}
                  >
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.desc}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ==================== LIFESTYLE BANNER ==================== */}
      <section className="relative overflow-hidden bg-foreground py-24 text-background">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-brand-violet blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-brand-pink blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimateOnScroll variant="fadeLeft">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-cyan">
                Express Yourself
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Your face.{" "}
                <span className="text-brand-purple">Your frames.</span>
                <br />
                Your story.
              </h2>
              <p className="mt-6 max-w-lg text-lg text-background/70">
                Glasses aren&apos;t just vision correction — they&apos;re the
                first thing people notice. Make it count with frames that match
                your vibe.
              </p>
              <div className="mt-8">
                <Link href="/try-on">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-block"
                  >
                    <Button
                      size="lg"
                      className="gap-2 rounded-xl bg-white text-foreground hover:bg-white/90 shadow-xl"
                    >
                      Try Frames On Your Face
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fadeRight">
              <div className="grid grid-cols-2 gap-4">
                {lifestyleImages.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`overflow-hidden rounded-2xl ${i === 0 ? "row-span-2" : ""}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={400}
                      height={i === 0 ? 500 : 250}
                      className={`h-full w-full object-cover ${i === 0 ? "aspect-[3/4]" : "aspect-square"}`}
                    />
                  </motion.div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="relative py-24">
        <div className="absolute left-0 bottom-0 h-64 w-64 blob-orange opacity-15 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              How It Works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps to{" "}
              <span className="gradient-text">perfect vision</span>
            </h2>
          </AnimateOnScroll>

          <StaggerContainer
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
            staggerDelay={0.15}
          >
            {[
              {
                step: "01",
                title: "Browse & Discover",
                desc: "Explore our curated collection of premium frames from top brands worldwide.",
                icon: Sparkles,
                color: "text-brand-violet",
                bg: "bg-brand-violet/10",
              },
              {
                step: "02",
                title: "Try On Virtually",
                desc: "Use your webcam for a real-time 3D preview of how frames look on your face.",
                icon: Camera,
                color: "text-brand-teal",
                bg: "bg-brand-teal/10",
              },
              {
                step: "03",
                title: "Order with Confidence",
                desc: "Add your prescription, checkout securely, and get frames delivered to your door.",
                icon: Zap,
                color: "text-brand-coral",
                bg: "bg-brand-coral/10",
              },
            ].map((item, i) => (
              <StaggerItem key={item.step}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="relative rounded-2xl border border-primary/10 bg-card p-8"
                >
                  <span className="absolute -top-4 right-6 text-6xl font-black text-primary/5">
                    {item.step}
                  </span>
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg} ${item.color}`}
                  >
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                  {i < 2 && (
                    <div className="absolute -right-4 top-1/2 hidden text-primary/20 md:block">
                      <ArrowRight className="h-8 w-8" />
                    </div>
                  )}
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="relative overflow-hidden bg-secondary/30 py-24">
        <div className="absolute -right-32 top-0 h-64 w-64 blob-pink opacity-20 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Testimonials
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              People <span className="gradient-text">love Spectra</span>
            </h2>
          </AnimateOnScroll>

          <StaggerContainer className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-primary/10 bg-card p-6 shadow-sm"
                >
                  <div className="mb-4 flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-brand-yellow text-brand-yellow"
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Verified Buyer
                      </p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="relative overflow-hidden">
        <div className="gradient-hero animate-gradient py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to find your
                <br />
                perfect frames?
              </h2>
              <p className="mt-4 text-lg text-white/80">
                Join 10,000+ happy customers who found their style through
                Spectra.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link href="/shop">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      size="lg"
                      className="gap-2 rounded-xl bg-white text-foreground hover:bg-white/90 px-8 shadow-xl"
                    >
                      Browse Collection
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
                      size="lg"
                      variant="outline"
                      className="gap-2 rounded-xl border-white/30 text-white hover:bg-white/10"
                    >
                      Try On Now
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
