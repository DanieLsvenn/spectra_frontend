export interface GlassesTransform {
  centerX: number;
  centerY: number;
  width: number;
  height: number;
  rotation: number;
}

interface NormalizedLandmark {
  x: number;
  y: number;
  z: number;
}

// Default scale factor: glasses extend ~1.8x the outer eye-to-eye distance
const BASE_SCALE_FACTOR = 1.8;
// Reference frame width (mm) used to adjust scale for different frame sizes
const REFERENCE_FRAME_WIDTH = 138;

/**
 * Compute the position, size, and rotation for the glasses overlay
 * based on MediaPipe Face Mesh landmarks.
 *
 * Key landmarks:
 *  - 33: left eye outer corner (viewer's left = face's right)
 *  - 263: right eye outer corner
 *  - 168: nose bridge between the eyes (vertical anchor)
 */
export function computeGlassesTransform(
  landmarks: NormalizedLandmark[],
  canvasWidth: number,
  canvasHeight: number,
  imageAspectRatio: number,
  frameWidth: number | null,
): GlassesTransform {
  // Convert normalized (0-1) landmarks to canvas pixel coordinates
  const leftEye = {
    x: landmarks[33].x * canvasWidth,
    y: landmarks[33].y * canvasHeight,
  };
  const rightEye = {
    x: landmarks[263].x * canvasWidth,
    y: landmarks[263].y * canvasHeight,
  };
  const noseBridge = {
    x: landmarks[168].x * canvasWidth,
    y: landmarks[168].y * canvasHeight,
  };

  // Center between the eyes, vertically at the nose bridge
  const centerX = (leftEye.x + rightEye.x) / 2;
  const centerY = noseBridge.y;

  // Distance between outer eye corners
  const dx = rightEye.x - leftEye.x;
  const dy = rightEye.y - leftEye.y;
  const eyeDistance = Math.sqrt(dx * dx + dy * dy);

  // Scale factor adjusted by actual frame width if available
  let scaleFactor = BASE_SCALE_FACTOR;
  if (frameWidth && frameWidth > 0) {
    scaleFactor = BASE_SCALE_FACTOR * (frameWidth / REFERENCE_FRAME_WIDTH);
  }

  const width = eyeDistance * scaleFactor;
  const height = width / imageAspectRatio;

  // Head tilt (roll) from the eye line angle
  const rotation = Math.atan2(dy, dx);

  return { centerX, centerY, width, height, rotation };
}
