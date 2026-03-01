"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type WebcamState =
  | { status: "idle" }
  | { status: "requesting" }
  | { status: "active"; stream: MediaStream }
  | { status: "denied"; error: string }
  | { status: "error"; error: string };

export function useWebcam() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [state, setState] = useState<WebcamState>({ status: "idle" });

  const startCamera = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setState({
        status: "error",
        error: "Camera is not supported in this browser.",
      });
      return;
    }

    setState({ status: "requesting" });

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setState({ status: "active", stream });
    } catch (err) {
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        setState({
          status: "denied",
          error: "Camera permission was denied.",
        });
      } else {
        setState({
          status: "error",
          error: "Could not access camera.",
        });
      }
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (state.status === "active") {
      state.stream.getTracks().forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setState({ status: "idle" });
  }, [state]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return { videoRef, state, startCamera, stopCamera };
}
