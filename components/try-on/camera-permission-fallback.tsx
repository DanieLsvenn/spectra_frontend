"use client";

import { VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CameraPermissionFallbackProps {
  error: string;
  onRetry: () => void;
}

export function CameraPermissionFallback({
  error,
  onRetry,
}: CameraPermissionFallbackProps) {
  return (
    <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border bg-muted/30">
      <Card className="mx-4 max-w-md border-0 bg-transparent shadow-none">
        <CardContent className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <VideoOff className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Camera Access Required</h3>
            <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Allow camera access in your browser settings, then try again.
            </p>
          </div>
          <Button onClick={onRetry}>Try Again</Button>
        </CardContent>
      </Card>
    </div>
  );
}
