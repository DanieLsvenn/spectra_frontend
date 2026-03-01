/**
 * Transform a Cloudinary URL to include background removal and PNG output.
 * Inserts `e_background_removal/f_png/` after the `/upload/` segment.
 */
export function getBackgroundRemovedUrl(originalUrl: string): string {
  const uploadSegment = "/upload/";
  const uploadIndex = originalUrl.indexOf(uploadSegment);
  if (uploadIndex === -1) return originalUrl;

  const before = originalUrl.slice(0, uploadIndex + uploadSegment.length);
  const after = originalUrl.slice(uploadIndex + uploadSegment.length);

  return `${before}e_background_removal/f_png/${after}`;
}
