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
import { Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Shop Frames</h1>
        <p className="mt-2 text-muted-foreground">
          Find your perfect pair from our curated collection.
        </p>
      </div>

      {/* Search & Filter Toggle */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search frames or brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1">
              Active
            </Badge>
          )}
        </Button>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="gap-1"
          >
            <X className="h-3 w-3" />
            Clear
          </Button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-8 grid grid-cols-2 gap-4 rounded-xl border bg-card p-4 sm:grid-cols-3 lg:grid-cols-5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Brand
            </label>
            <Select value={brand} onValueChange={setBrand}>
              <SelectTrigger>
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
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Shape
            </label>
            <Select value={shape} onValueChange={setShape}>
              <SelectTrigger>
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
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Material
            </label>
            <Select value={material} onValueChange={setMaterial}>
              <SelectTrigger>
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
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Size
            </label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger>
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
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
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
      )}

      {/* Results Count */}
      <p className="mb-4 text-sm text-muted-foreground">
        {isLoading ? "Loading..." : `${filtered.length} frames found`}
      </p>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <Skeleton className="aspect-square w-full rounded-t-lg" />
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg font-medium">No frames found</p>
          <p className="mt-1 text-muted-foreground">
            Try adjusting your filters or search term.
          </p>
          <Button variant="outline" className="mt-4" onClick={clearFilters}>
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((frame: Frame) => (
            <Link key={frame.frameId} href={`/shop/${frame.frameId}`}>
              <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative aspect-square bg-muted/50">
                  {frame.frameMedia?.[0]?.mediaUrl ? (
                    <Image
                      src={frame.frameMedia[0].mediaUrl}
                      alt={frame.frameName}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
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
                      className="absolute right-2 top-2"
                    >
                      Out of Stock
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {frame.brand}
                  </p>
                  <h3 className="mt-1 font-semibold">{frame.frameName}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-lg font-bold">
                      ${frame.basePrice.toFixed(2)}
                    </p>
                    <div className="flex gap-1">
                      <Badge variant="outline" className="text-xs">
                        {frame.shape}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {frame.size}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="flex items-center px-4 text-sm text-muted-foreground">
            Page {page} of {data.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === data.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
