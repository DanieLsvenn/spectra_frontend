"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { WebcamTryOn } from "@/components/try-on/webcam-try-on";
import { Skeleton } from "@/components/ui/skeleton";

function TryOnContent() {
  const searchParams = useSearchParams();
  const frameId = searchParams.get("frameId");

  return <WebcamTryOn initialFrameId={frameId} />;
}

export default function TryOnPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Skeleton className="mb-4 h-8 w-48" />
          <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
        </div>
      }
    >
      <TryOnContent />
    </Suspense>
  );
}
