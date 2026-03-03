"use client";

import { useQuery } from "@tanstack/react-query";
import { framesApi } from "@/lib/api/frames";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, X, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Frame } from "@/types";

const BRANDS = ["All", "Rayban", "Gucci", "Oakley", "Persol", "OwnBrand"];
const SHAPES = ["All", "Square", "Round", "Rectangle", "Oval"];
const MATERIALS = ["All", "Metal", "Plastic", "Titanium", "Acetate"];
const SIZES = ["All", "S", "M", "L"];

export default function ShopPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [shape, setShape] = useState("All");
  const [material, setMaterial] = useState("All");
  const [size, setSize] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["frames", page],
    queryFn: () => framesApi.getAll(page, 50),
    select: (res) => res.data,
  });

  const filtered = useMemo(() => {
    if (!data?.items) return [];
    return data.items.filter((frame: Frame) => {
      if (
        search &&
        !frame.frameName.toLowerCase().includes(search.toLowerCase()) &&
        !frame.brand.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (brand !== "All" && frame.brand !== brand) return false;
      if (shape !== "All" && frame.shape !== shape) return false;
      if (material !== "All" && frame.material !== material) return false;
      if (size !== "All" && frame.size !== size) return false;
      if (frame.basePrice < priceRange[0] || frame.basePrice > priceRange[1])
        return false;
      return true;
    });
  }, [data?.items, search, brand, shape, material, size, priceRange]);

  const hasActiveFilters =
    brand !== "All" ||
    shape !== "All" ||
    material !== "All" ||
    size !== "All" ||
    priceRange[0] > 0 ||
    priceRange[1] < 500;

  const clearFilters = () => {
    setBrand("All");
    setShape("All");
    setMaterial("All");
    setSize("All");
    setPriceRange([0, 500]);
    setSearch("");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-10 overflow-hidden rounded-3xl bg-foreground p-8 text-background sm:p-12"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brand-violet blur-3xl" />
          <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-brand-pink blur-3xl" />
        </div>
        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
            <Sparkles className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Shop Frames
            </h1>
            <p className="mt-1 text-background/70">
              Find your perfect pair from our curated collection of 500+ premium
              frames.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Search & Filter Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search frames or brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl pl-10 border-primary/20 focus-visible:ring-primary/30"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2 rounded-xl border-primary/20 hover:bg-primary/5"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge className="ml-1 bg-primary text-primary-foreground">
              Active
            </Badge>
          )}
        </Button>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="gap-1 text-destructive hover:text-destructive"
          >
            <X className="h-3 w-3" />
            Clear
          </Button>
        )}
      </motion.div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-4 rounded-2xl border border-primary/10 bg-card p-5 sm:grid-cols-3 lg:grid-cols-5">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Brand
                </label>
                <Select value={brand} onValueChange={setBrand}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BRANDS.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Shape
                </label>
                <Select value={shape} onValueChange={setShape}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SHAPES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Material
                </label>
                <Select value={material} onValueChange={setMaterial}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MATERIALS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Size
                </label>
                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SIZES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Price: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={500}
                  step={10}
                  className="mt-3"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <p className="mb-4 text-sm text-muted-foreground">
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Loading frames...
          </span>
        ) : (
          <>
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            frames found
          </>
        )}
      </p>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card
              key={i}
              className="overflow-hidden rounded-2xl border-primary/10"
            >
              <Skeleton className="aspect-square w-full" />
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-20 text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-lg font-semibold">No frames found</p>
          <p className="mt-1 text-muted-foreground">
            Try adjusting your filters or search term.
          </p>
          <Button
            variant="outline"
            className="mt-4 rounded-xl"
            onClick={clearFilters}
          >
            Clear All Filters
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((frame: Frame, index: number) => (
            <motion.div
              key={frame.frameId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.4) }}
            >
              <Link href={`/shop/${frame.frameId}`}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="group overflow-hidden rounded-2xl border-primary/10 transition-shadow hover:shadow-xl hover:shadow-primary/10">
                    <div className="relative aspect-square bg-secondary/50">
                      {frame.frameMedia?.[0]?.mediaUrl ? (
                        <Image
                          src={frame.frameMedia[0].mediaUrl}
                          alt={frame.frameName}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                          <svg
                            className="h-16 w-16 opacity-20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1}
                          >
                            <circle cx="6" cy="12" r="4" />
                            <circle cx="18" cy="12" r="4" />
                            <path d="M10 12h4" />
                            <path d="M2 12h0" />
                            <path d="M22 12h0" />
                          </svg>
                        </div>
                      )}
                      {frame.status === "out_of_stock" && (
                        <Badge
                          variant="destructive"
                          className="absolute right-2 top-2 rounded-lg"
                        >
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {frame.brand}
                      </p>
                      <h3 className="mt-1 font-semibold">{frame.frameName}</h3>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-lg font-bold gradient-text">
                          ${frame.basePrice.toFixed(2)}
                        </p>
                        <div className="flex gap-1">
                          <Badge
                            variant="secondary"
                            className="rounded-lg text-xs"
                          >
                            {frame.shape}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="rounded-lg text-xs"
                          >
                            {frame.size}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-xl"
          >
            Previous
          </Button>
          <span className="flex items-center px-4 text-sm font-medium text-muted-foreground">
            Page <span className="mx-1 text-foreground">{page}</span> of{" "}
            {data.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === data.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-xl"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
