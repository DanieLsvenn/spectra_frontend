"use client";

import { useQuery } from "@tanstack/react-query";
import { framesApi } from "@/lib/api/frames";
import { frameMediaApi } from "@/lib/api/frame-media";
import { lensTypesApi, lensFeaturesApi } from "@/lib/api/lens";
import { prescriptionsApi } from "@/lib/api/prescriptions";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Heart, ArrowLeft, Check, Ruler, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, use } from "react";
import { toast } from "sonner";
import type { LensType, LensFeature, Prescription } from "@/types";

export default function FrameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();

  const [selectedLensType, setSelectedLensType] = useState<LensType | null>(
    null,
  );
  const [selectedFeature, setSelectedFeature] = useState<LensFeature | null>(
    null,
  );
  const [selectedPrescription, setSelectedPrescription] =
    useState<Prescription | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: frame, isLoading } = useQuery({
    queryKey: ["frame", id],
    queryFn: () => framesApi.getById(id),
    select: (res) => res.data,
  });

  const { data: media } = useQuery({
    queryKey: ["frame-media", id],
    queryFn: () => frameMediaApi.getByFrame(id),
    select: (res) => res.data,
  });

  const { data: lensTypes } = useQuery({
    queryKey: ["lens-types"],
    queryFn: () => lensTypesApi.getAll(1, 50),
    select: (res) => res.data.items,
  });

  const { data: lensFeatures } = useQuery({
    queryKey: ["lens-features"],
    queryFn: () => lensFeaturesApi.getAll(1, 50),
    select: (res) => res.data.items,
  });

  const { data: prescriptions } = useQuery({
    queryKey: ["my-valid-prescriptions"],
    queryFn: () => prescriptionsApi.getMyValid(),
    select: (res) => res.data,
    enabled: isAuthenticated,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!frame) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg">Frame not found</p>
        <Link href="/shop">
          <Button variant="outline" className="mt-4">
            Back to Shop
          </Button>
        </Link>
      </div>
    );
  }

  const totalPrice =
    (frame.basePrice || 0) +
    (selectedLensType?.extraPrice || 0) +
    (selectedFeature?.extraPrice || 0);

  const colorOptions = frame.color
    ? [frame.color]
    : ["Matte Black", "Matte Red", "Transparent Blue", "Silver"];

  const isOutOfStock = frame.status === "out_of_stock";

  const handleAddToCart = () => {
    if (selectedLensType?.requiresPrescription && !selectedPrescription) {
      toast.error("Please select a prescription for this lens type.");
      return;
    }
    addItem({
      frame,
      lensType: selectedLensType,
      lensFeature: selectedFeature,
      prescription: selectedPrescription,
      quantity: 1,
      selectedColor: frame.color ? null : selectedColor,
      isPreorder: isOutOfStock,
    });
    toast.success(isOutOfStock ? "Added as preorder!" : "Added to cart!");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/shop"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Shop
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted/50">
            {media && media.length > 0 ? (
              <Image
                src={media[selectedImageIndex]?.mediaUrl || ""}
                alt={frame.frameName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <svg
                  className="h-32 w-32 text-muted-foreground/20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={0.5}
                >
                  <circle cx="6" cy="12" r="4" />
                  <circle cx="18" cy="12" r="4" />
                  <path d="M10 12h4" />
                </svg>
              </div>
            )}
          </div>
          {media && media.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {media.map((m, i) => (
                <button
                  key={m.mediaId}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${i === selectedImageIndex ? "border-primary" : "border-transparent"}`}
                >
                  <Image
                    src={m.mediaUrl}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {frame.brand}
          </p>
          <h1 className="mt-1 text-3xl font-bold">{frame.frameName}</h1>
          <p className="mt-2 text-3xl font-bold">${totalPrice.toFixed(2)}</p>

          {frame.status === "out_of_stock" && (
            <Badge variant="destructive" className="mt-2">
              Out of Stock
            </Badge>
          )}

          <Separator className="my-6" />

          {/* Specs */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Shape", value: frame.shape },
              { label: "Size", value: frame.size },
              { label: "Material", value: frame.material },
              {
                label: "Lens Width",
                value: frame.lensWidth ? `${frame.lensWidth}mm` : "-",
              },
            ].map((spec) => (
              <div
                key={spec.label}
                className="rounded-lg border p-3 text-center"
              >
                <p className="text-xs text-muted-foreground">{spec.label}</p>
                <p className="mt-0.5 text-sm font-semibold">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* Color Selection */}
          {!frame.color && (
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-semibold">Select Color</h3>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && (
                      <Check className="mr-1 h-3 w-3" />
                    )}
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Lens Type */}
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Eye className="h-4 w-4" />
                Lens Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedLensType?.lensTypeId || ""}
                onValueChange={(val) => {
                  const lt = lensTypes?.find((l) => l.lensTypeId === val);
                  setSelectedLensType(lt || null);
                  if (lt && !lt.requiresPrescription) {
                    setSelectedPrescription(null);
                  }
                }}
              >
                <div className="space-y-2">
                  {lensTypes?.map((lt) => (
                    <div
                      key={lt.lensTypeId}
                      className="flex items-center gap-3 rounded-lg border p-3"
                    >
                      <RadioGroupItem
                        value={lt.lensTypeId}
                        id={lt.lensTypeId}
                      />
                      <Label
                        htmlFor={lt.lensTypeId}
                        className="flex-1 cursor-pointer"
                      >
                        <span className="font-medium">
                          {lt.lensSpecification}
                        </span>
                        {lt.requiresPrescription && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            Rx Required
                          </Badge>
                        )}
                      </Label>
                      <span className="text-sm font-semibold">
                        {lt.extraPrice > 0
                          ? `+$${lt.extraPrice.toFixed(2)}`
                          : "Free"}
                      </span>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Lens Feature */}
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Ruler className="h-4 w-4" />
                Lens Feature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedFeature?.featureId || ""}
                onValueChange={(val) => {
                  const lf = lensFeatures?.find((f) => f.featureId === val);
                  setSelectedFeature(lf || null);
                }}
              >
                <div className="space-y-2">
                  {lensFeatures?.map((lf) => (
                    <div
                      key={lf.featureId}
                      className="flex items-center gap-3 rounded-lg border p-3"
                    >
                      <RadioGroupItem value={lf.featureId} id={lf.featureId} />
                      <Label
                        htmlFor={lf.featureId}
                        className="flex-1 cursor-pointer"
                      >
                        <span className="font-medium">
                          {lf.featureSpecification}
                        </span>
                        <span className="ml-2 text-xs text-muted-foreground">
                          Index {lf.lensIndex}
                        </span>
                      </Label>
                      <span className="text-sm font-semibold">
                        +${lf.extraPrice.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Prescription */}
          {selectedLensType?.requiresPrescription && isAuthenticated && (
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Select Prescription</CardTitle>
              </CardHeader>
              <CardContent>
                {prescriptions && prescriptions.length > 0 ? (
                  <RadioGroup
                    value={selectedPrescription?.prescriptionId || ""}
                    onValueChange={(val) => {
                      const p = prescriptions.find(
                        (pr) => pr.prescriptionId === val,
                      );
                      setSelectedPrescription(p || null);
                    }}
                  >
                    <div className="space-y-2">
                      {prescriptions.map((p) => (
                        <div
                          key={p.prescriptionId}
                          className="flex items-center gap-3 rounded-lg border p-3"
                        >
                          <RadioGroupItem
                            value={p.prescriptionId}
                            id={p.prescriptionId}
                          />
                          <Label
                            htmlFor={p.prescriptionId}
                            className="flex-1 cursor-pointer"
                          >
                            <span className="font-medium">
                              {p.doctorName || "Prescription"} -{" "}
                              {p.clinicName || "N/A"}
                            </span>
                            <span className="block text-xs text-muted-foreground">
                              OD: {p.sphereRight} / OS: {p.sphereLeft} | PD:{" "}
                              {p.pupillaryDistance}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">
                      No prescriptions found.
                    </p>
                    <Link href="/profile/prescriptions">
                      <Button variant="link" size="sm">
                        Add Prescription
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Price Breakdown */}
          <div className="mb-6 rounded-xl bg-muted/50 p-4">
            <h3 className="mb-3 text-sm font-semibold">Price Breakdown</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Frame</span>
                <span>${(frame.basePrice || 0).toFixed(2)}</span>
              </div>
              {selectedLensType && (
                <div className="flex justify-between">
                  <span>{selectedLensType.lensSpecification}</span>
                  <span>+${selectedLensType.extraPrice.toFixed(2)}</span>
                </div>
              )}
              {selectedFeature && (
                <div className="flex justify-between">
                  <span>{selectedFeature.featureSpecification}</span>
                  <span>+${selectedFeature.extraPrice.toFixed(2)}</span>
                </div>
              )}
              <Separator className="my-2" />
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1 gap-2"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {isOutOfStock ? "Preorder" : "Add to Cart"}
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* 3D Try-On Link */}
          <Link href={`/try-on?frameId=${frame.frameId}`}>
            <Button variant="outline" className="mt-3 w-full gap-2">
              <Eye className="h-4 w-4" />
              Try On Virtually
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
