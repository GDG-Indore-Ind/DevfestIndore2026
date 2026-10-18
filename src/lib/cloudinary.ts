/**
 * Cloudinary asset optimizer & direct upload integration
 */
export const CLOUDINARY_CONFIG = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "agcnziwc",
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "873399844943115",
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default",
};

/**
 * Format any image URL through Cloudinary's dynamic CDN
 */
export const getCloudinaryUrl = (
  pathOrUrl: string,
  options: {
    width?: number;
    height?: number;
    crop?: "fill" | "fit" | "limit" | "thumb";
    quality?: "auto" | number;
    format?: "auto" | "webp" | "avif";
  } = {}
) => {
  if (!pathOrUrl) return "";

  // If already on Cloudinary, return as is or add transforms
  if (pathOrUrl.includes("res.cloudinary.com")) {
    return pathOrUrl;
  }

  // If it's an external URL (e.g. Unsplash), use Cloudinary fetch proxy
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    const { width, height, quality = "auto", format = "auto" } = options;
    const transforms = [`f_${format}`, `q_${quality}`];
    if (width) transforms.push(`w_${width}`);
    if (height) transforms.push(`h_${height}`);
    if (options.crop) transforms.push(`c_${options.crop}`);

    return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/fetch/${transforms.join(",")}/${encodeURIComponent(pathOrUrl)}`;
  }

  const { width, height, quality = "auto", format = "auto" } = options;
  const transforms = [`f_${format}`, `q_${quality}`];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (options.crop) transforms.push(`c_${options.crop}`);

  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/${transforms.join(",")}/${pathOrUrl.replace(/^\//, "")}`;
};

/**
 * Direct client-side unsigned upload to Cloudinary
 */
export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);
  formData.append("cloud_name", CLOUDINARY_CONFIG.cloudName);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || "Failed to upload image to Cloudinary");
  }

  const data = await res.json();
  return data.secure_url;
};
