import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// Cloudinary configuration
cloudinary.config({
  cloud_name: "agcnziwc",
  api_key: "873399844943115",
  api_secret: "rGAe_ahpge_vUDzlJXXgMBxQM_o",
});

const imageDir = "/mnt/localdrive/HP Shared/All Freelance Projects/devfest/drive-download-20261012T191901Z-1-001";
const tempDir = "/mnt/localdrive/HP Shared/All Freelance Projects/devfest/drive-download-20261012T191901Z-1-001/optimized";
const outputFile = "/mnt/localdrive/HP Shared/All Freelance Projects/devfest/src/data/cloudinaryUploadedImages.json";

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

async function run() {
  const files = fs.readdirSync(imageDir).filter((f) => f.endsWith(".JPG")).sort();
  console.log(`Found ${files.length} images to compress and upload.`);

  const results = [];

  // Pick top 15 prime curated photos for diverse topics
  // (Keynotes, Audience, Stage, Lighting, Hackathon, Networking)
  const selectedFiles = files.slice(0, 15);

  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];
    const sourcePath = path.join(imageDir, file);
    const optimizedPath = path.join(tempDir, `opt_${file}`);

    console.log(`[${i + 1}/${selectedFiles.length}] Compressing ${file} with ffmpeg...`);
    // Scale down 4000x3000 -> 2400 width high-res, qscale:v 2 (keeps crystal quality ~2.5MB)
    try {
      execSync(`ffmpeg -y -i "${sourcePath}" -vf "scale=2400:-1" -q:v 2 "${optimizedPath}" -loglevel error`);
      const stat = fs.statSync(optimizedPath);
      console.log(`Compressed to ${(stat.size / 1024 / 1024).toFixed(2)} MB`);

      console.log(`Uploading ${file} to Cloudinary...`);
      const uploadRes = await cloudinary.uploader.upload(optimizedPath, {
        folder: "devfest_indore_photos",
        resource_type: "image",
        quality: "auto",
        fetch_format: "auto",
      });

      console.log(`✓ Uploaded ${file} -> ${uploadRes.secure_url}`);

      const category = i < 4 ? "Keynotes" : i < 8 ? "AI & Robotics" : i < 12 ? "Showcase" : "Community";
      results.push({
        id: `cld-${i + 1}`,
        title: `DevFest Indore Live Moment #${i + 1}`,
        category: category,
        imageUrl: uploadRes.secure_url,
        caption: `Official GDG Indore photo from the flagship tech conference sessions.`,
      });
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message || err);
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  console.log(`\n🎉 Success! Uploaded ${results.length} photos to Cloudinary. Data saved to ${outputFile}`);
}

run();
