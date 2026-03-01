"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { framesApi } from "@/lib/api/frames";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface FrameSelectorProps {
  selectedFrameId: string | null;
  onSelectFrame: (frameId: string) => void;
}

export function FrameSelector({
  selectedFrameId,
  onSelectFrame,
}: FrameSelectorProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["frames", "try-on"],
    queryFn: () => framesApi.getAll(1, 50),
    select: (res) => res.data.items,
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Browse Frames</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] px-4 pb-4">
          {isLoading && (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          )}

          {data && data.length === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No frames available.
            </p>
          )}

          {data && (
            <div className="space-y-1.5">
              {data.map((frame) => {
                const thumbnail =
                  frame.frameMedia?.find(
                    (m) =>
                      m.mediaType === "thumbnail" || m.mediaType === "image",
                  )?.mediaUrl || null;

                return (
                  <button
                    key={frame.frameId}
                    onClick={() => onSelectFrame(frame.frameId)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg border p-2 text-left transition-colors hover:bg-muted/50",
                      selectedFrameId === frame.frameId
                        ? "border-primary bg-muted/50"
                        : "border-transparent",
                    )}
                  >
                    {thumbnail ? (
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={thumbnail}
                          alt={frame.frameName}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    ) : (
                      <div className="h-10 w-10 shrink-0 rounded-md bg-muted" />
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {frame.frameName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {frame.brand}{" "}
                        {frame.basePrice
                          ? `- ${frame.basePrice.toLocaleString("vi-VN")} VND`
                          : ""}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
