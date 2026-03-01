"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { framesApi } from "@/lib/api/frames";
import { frameMediaApi } from "@/lib/api/frame-media";
import { getBackgroundRemovedUrl } from "@/lib/cloudinary-utils";
import { useWebcam } from "@/hooks/use-webcam";
import { useFaceLandmarker } from "@/hooks/use-face-landmarker";
import { TryOnCanvas } from "./try-on-canvas";
import { FrameSelector } from "./frame-selector";
import { FrameInfoPanel } from "./frame-info-panel";
import { CameraPermissionFallback } from "./camera-permission-fallback";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Camera,
  Video,
  VideoOff,
  Maximize2,
  Minimize2,
  Download,
  Loader2,
} from "lucide-react";

interface WebcamTryOnProps {
  initialFrameId: string | null;
}

export function WebcamTryOn({ initialFrameId }: WebcamTryOnProps) {
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(
    initialFrameId,
  );
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { videoRef, state: webcamState, startCamera, stopCamera } = useWebcam();
  const {
    landmarker,
    isLoading: isModelLoading,
    error: modelError,
  } = useFaceLandmarker();

  // Fetch selected frame data
  const { data: frame, isLoading: frameLoading } = useQuery({
    queryKey: ["frame", selectedFrameId],
    queryFn: () => framesApi.getById(selectedFrameId!),
    select: (res) => res.data,
    enabled: !!selectedFrameId,
  });

  // Fetch selected frame media
  const { data: media } = useQuery({
    queryKey: ["frame-media", selectedFrameId],
    queryFn: () => frameMediaApi.getByFrame(selectedFrameId!),
    select: (res) => res.data,
    enabled: !!selectedFrameId,
  });

  // Compute the background-removed image URL
  const glassesImageUrl = useMemo(() => {
    if (!media || media.length === 0) return null;
    const frontImage = media.find((m) => m.mediaType === "image") || media[0];
    return getBackgroundRemovedUrl(frontImage.mediaUrl);
  }, [media]);

  const handleFaceDetected = useCallback((detected: boolean) => {
    setIsFaceDetected(detected);
  }, []);

  const handleTakePhoto = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `spectra-tryon-${frame?.frameName || "photo"}.png`;
    link.href = dataUrl;
    link.click();
  }, [frame]);

  const isReady = landmarker && webcamState.status === "active";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Virtual Try-On</h1>
        <p className="mt-2 text-muted-foreground">
          See how frames look on your face in real-time.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Main viewer */}
        <div
          className={`lg:col-span-3 ${isFullscreen ? "fixed inset-0 z-50 flex flex-col bg-background p-4" : ""}`}
        >
          <div
            className={`relative overflow-hidden rounded-2xl border bg-gradient-to-b from-muted/30 to-muted/60 ${isFullscreen ? "flex-1" : "aspect-[4/3]"}`}
          >
            {/* Hidden video element for webcam stream */}
            <video ref={videoRef} playsInline muted className="hidden" />

            {/* Camera denied / error state */}
            {(webcamState.status === "denied" ||
              webcamState.status === "error") && (
              <CameraPermissionFallback
                error={
                  webcamState.status === "denied"
                    ? webcamState.error
                    : webcamState.error
                }
                onRetry={startCamera}
              />
            )}

            {/* Idle state: prompt to start camera */}
            {webcamState.status === "idle" && (
              <div className="flex h-full flex-col items-center justify-center gap-4">
                {isModelLoading ? (
                  <>
                    <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Loading face detection model...
                    </p>
                  </>
                ) : modelError ? (
                  <>
                    <VideoOff className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-destructive">{modelError}</p>
                  </>
                ) : (
                  <>
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                      <Video className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Ready to try on</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Start your camera to see frames on your face
                      </p>
                    </div>
                    <Button onClick={startCamera} size="lg" className="gap-2">
                      <Camera className="h-4 w-4" />
                      Start Camera
                    </Button>
                  </>
                )}
              </div>
            )}

            {/* Requesting permission state */}
            {webcamState.status === "requesting" && (
              <div className="flex h-full flex-col items-center justify-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Requesting camera access...
                </p>
              </div>
            )}

            {/* Active: render the try-on canvas */}
            {webcamState.status === "active" && landmarker && (
              <TryOnCanvas
                videoRef={videoRef}
                landmarker={landmarker}
                glassesImageUrl={glassesImageUrl}
                frameData={frame ?? null}
                onFaceDetected={handleFaceDetected}
                canvasRef={canvasRef}
              />
            )}

            {/* Loading model overlay while camera is active */}
            {webcamState.status === "active" && isModelLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                <div className="flex items-center gap-2 rounded-lg bg-background/90 px-4 py-2 shadow">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Loading face detection...</span>
                </div>
              </div>
            )}
          </div>

          {/* Status bar */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {webcamState.status === "active" && (
                <>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`h-2 w-2 rounded-full ${isFaceDetected ? "bg-green-500" : "bg-amber-500"}`}
                    />
                    <span className="text-xs text-muted-foreground">
                      {isFaceDetected ? "Face detected" : "No face detected"}
                    </span>
                  </div>
                  {!selectedFrameId && (
                    <Badge variant="outline" className="text-xs">
                      Select a frame to try on
                    </Badge>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              {webcamState.status === "active" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    onClick={handleTakePhoto}
                    disabled={!isFaceDetected}
                  >
                    <Download className="h-3.5 w-3.5" />
                    Take Photo
                  </Button>
                  <Button variant="outline" size="sm" onClick={stopCamera}>
                    <VideoOff className="h-3.5 w-3.5" />
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-3.5 w-3.5" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`space-y-4 ${isFullscreen ? "hidden" : ""}`}>
          <FrameInfoPanel frame={frame} isLoading={frameLoading} />
          <FrameSelector
            selectedFrameId={selectedFrameId}
            onSelectFrame={setSelectedFrameId}
          />
        </div>
      </div>
    </div>
  );
}
