import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// Configure Cloudinary with official SDK
cloudinary.config({
  cloud_name: "agcnziwc",
  api_key: "873399844943115",
  api_secret: "rGAe_ahpge_vUDzlJXXgMBxQM_o",
});

const imageDir = "/mnt/localdrive/HP Shared/All Freelance Projects/devfest/drive-download-20261012T191901Z-1-001";
const outputFile = "/mnt/localdrive/HP Shared/All Freelance Projects/devfest/src/data/cloudinaryUploadedImages.json";

async function run() {
  const files = fs.readdirSync(imageDir).filter((f) => f.endsWith(".JPG")).sort();
  console.log(`Found ${files.length} images to upload.`);

  const results = [];

  // Pick top curated photos for optimal gallery quality
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fullPath = path.join(imageDir, file);
    console.log(`Uploading [${i + 1}/${files.length}]: ${file}...`);

    try {
      const uploadRes = await cloudinary.uploader.upload(fullPath, {
        folder: "devfest_indore_photos",
        resource_type: "image",
        quality: "auto",
        fetch_format: "auto",
      });

      console.log(`✓ Uploaded ${file} -> ${uploadRes.secure_url}`);
      results.push({
        id: `cld-${i + 1}`,
        title: `DevFest Indore Live Moment #${i + 1}`,
        category: i < 8 ? "Keynotes" : i < 16 ? "Showcase" : i < 24 ? "Community" : "Space",
        imageUrl: uploadRes.secure_url,
        caption: `High-resolution stage and attendee interaction from DevFest Indore.`,
      });
    } catch (err) {
      console.error(`Failed ${file}:`, err.message || err);
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  console.log(`Done! Curated ${results.length} images saved to ${outputFile}`);
}

run();
