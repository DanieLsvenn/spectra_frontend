"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { framesApi } from "@/lib/api/frames";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Frame } from "@/types";
import {
  ArrowRight,
  Glasses,
  Eye,
  Shield,
  Star,
  Camera,
  Truck,
  RotateCcw,
  Headphones,
  Sun,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Hero banner slides
const heroSlides = [
  {
    id: 1,
    title: "QUALITY EYEWEAR",
    subtitle: "FOR EVERYONE",
    description:
      "Premium frames at affordable prices. Find your perfect pair today.",
    bgColor: "bg-[#97B68A]",
    textColor: "text-white",
    image:
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=400&fit=crop",
    cta: "Shop Now",
    link: "/shop",
  },
  {
    id: 2,
    title: "VIRTUAL TRY-ON",
    subtitle: "See Before You Buy",
    description:
      "Use your camera to try on frames from the comfort of your home.",
    bgColor: "bg-[#e8f0e4]",
    textColor: "text-[#1a1a2e]",
    image:
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&h=400&fit=crop",
    cta: "Try Now",
    link: "/try-on",
  },
  {
    id: 3,
    title: "NEW ARRIVALS",
    subtitle: "Fresh Styles",
    description: "Discover the latest frames from top brands.",
    bgColor: "bg-[#7a9e6c]",
    textColor: "text-white",
    image:
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&h=400&fit=crop",
    cta: "Explore",
    link: "/shop",
  },
];

// Frame shape categories with placeholder images
const frameShapes = [
  {
    name: "Square",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&h=200&fit=crop",
    count: "120+ styles",
  },
  {
    name: "Rectangle",
    image:
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=200&h=200&fit=crop",
    count: "95+ styles",
  },
  {
    name: "Round",
    image:
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=200&h=200&fit=crop",
    count: "80+ styles",
  },
  {
    name: "Cat-Eye",
    image:
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=200&h=200&fit=crop",
    count: "65+ styles",
  },
  {
    name: "Aviator",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop",
    count: "55+ styles",
  },
  {
    name: "Browline",
    image:
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=200&h=200&fit=crop",
    count: "45+ styles",
  },
];

// Face shape categories
const faceShapes = [
  {
    name: "Round",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    recommendation: "Angular frames",
  },
  {
    name: "Oval",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    recommendation: "Most frame styles",
  },
  {
    name: "Heart",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    recommendation: "Bottom-heavy frames",
  },
  {
    name: "Square",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    recommendation: "Round frames",
  },
  {
    name: "Diamond",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    recommendation: "Oval frames",
  },
];

// Lens features
const lensFeatures = [
  {
    name: "Blue Light Protection",
    description: "Filter blue light to reduce eye strain.",
    icon: Eye,
    image:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=300&fit=crop",
    bgColor: "bg-[#e8f0e4]",
  },
  {
    name: "UV Protection",
    description: "100% UV protection for every lens. Every style.",
    icon: Sun,
    image:
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&h=300&fit=crop",
    bgColor: "bg-[#f0f5ed]",
  },
  {
    name: "Prescription Ready",
    description: "Add your prescription to any frame with ease.",
    icon: Glasses,
    image:
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop",
    bgColor: "bg-[#e8f0e4]",
  },
];

// Customer photos placeholder
const customerPhotos = [
  {
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=400&fit=crop",
    name: "Alex",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop",
    name: "Sarah",
  },
  {
    image:
      "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=300&h=400&fit=crop",
    name: "Linh",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    name: "David",
  },
  {
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=400&fit=crop",
    name: "Emma",
  },
];

// Trust badges
const trustBadges = [
  { icon: Truck, text: "Free Shipping", subtext: "On orders $89+" },
  { icon: RotateCcw, text: "30-Day Returns", subtext: "Easy exchanges" },
  { icon: Headphones, text: "24/7 Support", subtext: "We're here to help" },
  { icon: Shield, text: "Secure Checkout", subtext: "Protected payments" },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Fetch featured products
  const { data: framesData, isLoading: framesLoading } = useQuery({
    queryKey: ["featured-frames"],
    queryFn: () => framesApi.getAll(1, 10),
    select: (res) => res.data?.items?.slice(0, 10) || [],
  });

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  return (
    <>
      {/* ==================== HERO CAROUSEL ==================== */}
      <section className="relative overflow-hidden">
        <div className="relative h-[500px] md:h-[600px]">
          {heroSlides.map((slide, index) => (
            <motion.div
              key={slide.id}
              initial={false}
              animate={{
                opacity: index === currentSlide ? 1 : 0,
                x:
                  index === currentSlide
                    ? 0
                    : index < currentSlide
                      ? -100
                      : 100,
              }}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 ${slide.bgColor} ${index === currentSlide ? "z-10" : "z-0"}`}
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
                <div className="grid h-full items-center gap-8 lg:grid-cols-2">
                  <div className={`${slide.textColor}`}>
                    <p className="text-sm font-semibold uppercase tracking-wider mb-2">
                      {slide.title}
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-4">
                      {slide.subtitle}
                    </h1>
                    <p className="text-lg opacity-90 mb-8 max-w-md">
                      {slide.description}
                    </p>
                    <Link href={slide.link}>
                      <Button
                        size="lg"
                        className={`rounded-full px-8 ${
                          slide.textColor === "text-white"
                            ? "bg-white text-[#1a1a2e] hover:bg-white/90"
                            : "bg-[#1a1a2e] text-white hover:bg-[#1a1a2e]/90"
                        }`}
                      >
                        {slide.cta}
                      </Button>
                    </Link>
                  </div>
                  <div className="hidden lg:flex justify-center items-center">
                    <div className="relative w-96 h-80 rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={slide.image}
                        alt={slide.subtitle}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-[#1a1a2e]" />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentSlide(index);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-[#1a1a2e]" : "bg-white/60"
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-[#1a1a2e]" />
          </button>
        </div>
      </section>

      {/* ==================== TRUST BADGES ==================== */}
      <section className="border-y border-border bg-background py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-3 justify-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f0e4]">
                  <badge.icon className="h-5 w-5 text-[#5d8653]" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{badge.text}</p>
                  <p className="text-xs text-muted-foreground">
                    {badge.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BEST SELLERS ==================== */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                BEST SELLERS
              </h2>
              <div className="flex gap-4 mt-3">
                <button className="text-sm font-medium border-b-2 border-[#1a1a2e] pb-1">
                  Eyeglasses
                </button>
                <button className="text-sm font-medium text-muted-foreground pb-1">
                  Sunglasses
                </button>
              </div>
            </div>
            <Link href="/shop">
              <Button className="rounded-full bg-[#1a1a2e] hover:bg-[#1a1a2e]/90">
                Shop all
              </Button>
            </Link>
          </div>

          {framesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-xl" />
              ))}
            </div>
          ) : framesData && framesData.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {framesData.slice(0, 5).map((frame: Frame) => (
                <Link key={frame.frameId} href={`/shop/${frame.frameId}`}>
                  <Card className="group overflow-hidden rounded-xl border-border hover:shadow-lg transition-shadow">
                    <div className="relative aspect-square bg-[#f8faf6]">
                      <Badge className="absolute left-2 top-2 bg-[#97B68A] text-white text-xs">
                        Top rated
                      </Badge>
                      <button className="absolute right-2 top-2 p-1.5 rounded-full bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                      </button>
                      {frame.frameMedia?.[0]?.mediaUrl ? (
                        <Image
                          src={frame.frameMedia[0].mediaUrl}
                          alt={frame.frameName}
                          fill
                          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                          <Glasses className="h-16 w-16 opacity-20" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-bold">${frame.basePrice}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs text-muted-foreground">
                            4.5 (1K+)
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {frame.frameName}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            // Placeholder products when no data
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                {
                  name: "Classic Round",
                  price: 29.95,
                  image:
                    "https://images.unsplash.com/photo-1577803645773-f96470509666?w=300&h=300&fit=crop",
                },
                {
                  name: "Modern Square",
                  price: 34.95,
                  image:
                    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=300&fit=crop",
                },
                {
                  name: "Retro Aviator",
                  price: 39.95,
                  image:
                    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop",
                },
                {
                  name: "Elegant Cat-Eye",
                  price: 44.95,
                  image:
                    "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=300&h=300&fit=crop",
                },
                {
                  name: "Bold Rectangle",
                  price: 32.95,
                  image:
                    "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=300&h=300&fit=crop",
                },
              ].map((item, i) => (
                <Card
                  key={i}
                  className="group overflow-hidden rounded-xl border-border hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-square bg-[#f8faf6]">
                    <Badge className="absolute left-2 top-2 bg-[#97B68A] text-white text-xs">
                      Top rated
                    </Badge>
                    <button className="absolute right-2 top-2 p-1.5 rounded-full bg-white/80 hover:bg-white">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-bold">${item.price}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-muted-foreground">
                          4.5 (1K+)
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.name}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==================== SHOP BY FRAME SHAPE ==================== */}
      <section className="py-16 bg-[#f8faf6]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                SHOP BY FRAME SHAPE
              </h2>
              <p className="text-muted-foreground mt-2">
                Find frames that complement your style and fit your face
                perfectly.
              </p>
            </div>
            <Link href="/shop">
              <Button className="rounded-full bg-[#1a1a2e] hover:bg-[#1a1a2e]/90">
                Shop all
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {frameShapes.map((shape) => (
              <Link
                key={shape.name}
                href={`/shop?shape=${shape.name.toLowerCase()}`}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#e8f0e4] mb-3">
                    <Image
                      src={shape.image}
                      alt={shape.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-semibold text-center">{shape.name}</h3>
                  <p className="text-xs text-muted-foreground text-center">
                    {shape.count}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== LENS FEATURES ==================== */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              LENS PROTECTION
            </h2>
            <p className="text-muted-foreground mt-2">
              Every lens delivers protection with a purpose.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {lensFeatures.map((feature) => (
              <motion.div
                key={feature.name}
                whileHover={{ y: -4 }}
                className={`${feature.bgColor} rounded-2xl overflow-hidden`}
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <feature.icon className="h-6 w-6 text-[#5d8653]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {feature.description}
                  </p>
                  <Link href="/shop">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white"
                    >
                      Shop now
                    </Button>
                  </Link>
                </div>
                <div className="relative h-48">
                  <Image
                    src={feature.image}
                    alt={feature.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SHOP BY FACE SHAPE ==================== */}
      <section className="py-16 bg-[#f8faf6]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                SHOP BY FACE SHAPE
              </h2>
              <p className="text-muted-foreground mt-2">
                Find frames that flatter your unique features.
              </p>
            </div>
            <Link href="/shop">
              <Button className="rounded-full bg-[#1a1a2e] hover:bg-[#1a1a2e]/90">
                Shop all
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {faceShapes.map((shape, index) => {
              const colors = [
                "bg-rose-100",
                "bg-cyan-100",
                "bg-amber-100",
                "bg-blue-100",
                "bg-orange-100",
              ];
              return (
                <Link
                  key={shape.name}
                  href={`/shop?face=${shape.name.toLowerCase()}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="group cursor-pointer text-center"
                  >
                    <div
                      className={`relative w-32 h-32 mx-auto rounded-full overflow-hidden ${colors[index % colors.length]} mb-3`}
                    >
                      <Image
                        src={shape.image}
                        alt={shape.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="font-semibold">{shape.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {shape.recommendation}
                    </p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== VIRTUAL TRY-ON CTA ==================== */}
      <section className="py-16 bg-[#97B68A]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                TRY BEFORE YOU BUY
              </h2>
              <p className="text-lg opacity-90 mb-6 max-w-md">
                Use our virtual try-on feature to see how frames look on your
                face. No guesswork, just confidence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/try-on">
                  <Button
                    size="lg"
                    className="rounded-full bg-white text-[#1a1a2e] hover:bg-white/90"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Start Virtual Try-On
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-white text-white hover:bg-white/10"
                  >
                    Browse Frames
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=300&h=400&fit=crop"
                      alt="Person trying glasses"
                      width={300}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=300&h=400&fit=crop"
                      alt="Person with glasses"
                      width={300}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CUSTOMER GALLERY ==================== */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              LOOKS WE LOVE FROM YOU
            </h2>
            <p className="text-muted-foreground mt-2">
              Tag us on social with #SpectraEyewear
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {customerPhotos.map((photo, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={photo.image}
                  alt={`Customer ${photo.name}`}
                  fill
                  className="object-cover transition-all duration-300 hover:brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity">
                  <p className="absolute bottom-3 left-3 text-white text-sm font-medium">
                    @{photo.name.toLowerCase()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="py-20 bg-[#1a1a2e]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            Ready to find your perfect frames?
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Browse our collection of premium eyewear and find frames that match
            your style.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop">
              <Button
                size="lg"
                className="rounded-full bg-[#97B68A] text-white hover:bg-[#97B68A]/90"
              >
                Shop Collection
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/try-on">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/30 text-white hover:bg-white/10"
              >
                <Camera className="h-4 w-4 mr-2" />
                Virtual Try-On
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
