"use client";

import Link from "next/link";
import type { Frame } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface FrameInfoPanelProps {
  frame: Frame | null | undefined;
  isLoading: boolean;
}

export function FrameInfoPanel({ frame, isLoading }: FrameInfoPanelProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-20" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-9 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!frame) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-sm text-muted-foreground">
          Select a frame to see details.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{frame.frameName}</CardTitle>
        <div className="flex items-center gap-2">
          {frame.brand && (
            <Badge variant="secondary" className="text-xs">
              {frame.brand}
            </Badge>
          )}
          {frame.shape && (
            <Badge variant="outline" className="text-xs">
              {frame.shape}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xl font-bold">
          {frame.basePrice.toLocaleString("vi-VN")} VND
        </p>

        <Separator />

        <div className="grid grid-cols-2 gap-2 text-xs">
          {frame.lensWidth && (
            <div>
              <span className="text-muted-foreground">Lens</span>
              <p className="font-medium">{frame.lensWidth}mm</p>
            </div>
          )}
          {frame.bridgeWidth && (
            <div>
              <span className="text-muted-foreground">Bridge</span>
              <p className="font-medium">{frame.bridgeWidth}mm</p>
            </div>
          )}
          {frame.frameWidth && (
            <div>
              <span className="text-muted-foreground">Frame</span>
              <p className="font-medium">{frame.frameWidth}mm</p>
            </div>
          )}
          {frame.templeLength && (
            <div>
              <span className="text-muted-foreground">Temple</span>
              <p className="font-medium">{frame.templeLength}mm</p>
            </div>
          )}
        </div>

        {(frame.color || frame.material) && (
          <>
            <Separator />
            <div className="grid grid-cols-2 gap-2 text-xs">
              {frame.color && (
                <div>
                  <span className="text-muted-foreground">Color</span>
                  <p className="font-medium">{frame.color}</p>
                </div>
              )}
              {frame.material && (
                <div>
                  <span className="text-muted-foreground">Material</span>
                  <p className="font-medium">{frame.material}</p>
                </div>
              )}
            </div>
          </>
        )}

        <Separator />

        <div className="flex flex-col gap-2">
          <Link href={`/shop/${frame.frameId}`}>
            <Button variant="outline" className="w-full gap-2" size="sm">
              <ExternalLink className="h-3.5 w-3.5" />
              View in Shop
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
