"use client";

import { useEffect, useRef, useCallback } from "react";
import type { FaceLandmarker } from "@mediapipe/tasks-vision";
import type { Frame } from "@/types";
import { computeGlassesTransform } from "@/lib/face-mesh-utils";

interface TryOnCanvasProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  landmarker: FaceLandmarker;
  glassesImageUrl: string | null;
  frameData: Frame | null;
  onFaceDetected: (detected: boolean) => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export function TryOnCanvas({
  videoRef,
  landmarker,
  glassesImageUrl,
  frameData,
  onFaceDetected,
  canvasRef,
}: TryOnCanvasProps) {
  const glassesImgRef = useRef<HTMLImageElement | null>(null);
  const glassesLoadedRef = useRef(false);

  // Preload the glasses image whenever the URL changes
  useEffect(() => {
    glassesLoadedRef.current = false;
    glassesImgRef.current = null;

    if (!glassesImageUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = glassesImageUrl;

    img.onload = () => {
      glassesImgRef.current = img;
      glassesLoadedRef.current = true;
    };

    img.onerror = () => {
      // Fallback: try the original URL without background removal
      const fallbackUrl = glassesImageUrl
        .replace("e_background_removal/", "")
        .replace("f_png/", "");
      const fallbackImg = new Image();
      fallbackImg.crossOrigin = "anonymous";
      fallbackImg.src = fallbackUrl;
      fallbackImg.onload = () => {
        glassesImgRef.current = fallbackImg;
        glassesLoadedRef.current = true;
      };
    };
  }, [glassesImageUrl]);

  // Main render loop
  useEffect(() => {
    let animationId: number;

    const renderFrame = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas || video.readyState < 2) {
        animationId = requestAnimationFrame(renderFrame);
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        animationId = requestAnimationFrame(renderFrame);
        return;
      }

      const { videoWidth, videoHeight } = video;
      canvas.width = videoWidth;
      canvas.height = videoHeight;

      // Draw mirrored (selfie) video
      ctx.save();
      ctx.translate(videoWidth, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
      ctx.restore();

      // Detect face landmarks
      const results = landmarker.detectForVideo(video, performance.now());

      if (results.faceLandmarks && results.faceLandmarks.length > 0) {
        onFaceDetected(true);
        const landmarks = results.faceLandmarks[0];

        if (glassesImgRef.current && glassesLoadedRef.current) {
          const aspectRatio =
            glassesImgRef.current.naturalWidth /
            glassesImgRef.current.naturalHeight;

          const transform = computeGlassesTransform(
            landmarks,
            videoWidth,
            videoHeight,
            aspectRatio,
            frameData?.frameWidth ?? null,
          );

          // Mirror the X coordinate to match the mirrored video
          const mirroredCenterX = videoWidth - transform.centerX;

          ctx.save();
          ctx.translate(mirroredCenterX, transform.centerY);
          // Negate rotation for mirrored view
          ctx.rotate(-transform.rotation);
          ctx.drawImage(
            glassesImgRef.current,
            -transform.width / 2,
            -transform.height / 2,
            transform.width,
            transform.height,
          );
          ctx.restore();
        }
      } else {
        onFaceDetected(false);
      }

      animationId = requestAnimationFrame(renderFrame);
    };

    renderFrame();

    return () => cancelAnimationFrame(animationId);
  }, [landmarker, videoRef, canvasRef, frameData, onFaceDetected]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full rounded-2xl object-contain"
    />
  );
}
