import os
import glob
import time
import urllib.request
import urllib.parse
import json
import hashlib

# Cloudinary Credentials from .env
CLOUD_NAME = "agcnziwc"
API_KEY = "873399844943115"
API_SECRET = "rGAe_ahpge_vUDzlJXXgMBxQM_o"

IMAGE_DIR = "/mnt/localdrive/HP Shared/All Freelance Projects/devfest/drive-download-20261012T191901Z-1-001"
OUTPUT_FILE = "/mnt/localdrive/HP Shared/All Freelance Projects/devfest/src/data/cloudinaryUploadedImages.json"

def get_signature(params_to_sign, secret):
    # Sort keys alphabetically and join as k=v&...
    sorted_params = "&".join(f"{k}={params_to_sign[k]}" for k in sorted(params_to_sign))
    to_sign = sorted_params + secret
    return hashlib.sha1(to_sign.encode("utf-8")).hexdigest()

def upload_image(file_path):
    filename = os.path.basename(file_path)
    timestamp = int(time.time())
    public_id = f"devfest_indore_photos/{os.path.splitext(filename)[0]}"

    params = {
        "folder": "devfest_indore_photos",
        "timestamp": timestamp,
    }
    signature = get_signature(params, API_SECRET)

    # Prepare multipart form upload
    boundary = "----CloudinaryBoundary123456789"
    body = bytearray()

    fields = {
        "api_key": API_KEY,
        "timestamp": str(timestamp),
        "folder": "devfest_indore_photos",
        "signature": signature,
    }

    for k, v in fields.items():
        body.extend(f"--{boundary}\r\n".encode("utf-8"))
        body.extend(f'Content-Disposition: form-data; name="{k}"\r\n\r\n'.encode("utf-8"))
        body.extend(f"{v}\r\n".encode("utf-8"))

    # File data
    body.extend(f"--{boundary}\r\n".encode("utf-8"))
    body.extend(f'Content-Disposition: form-data; name="file"; filename="{filename}"\r\n'.encode("utf-8"))
    body.extend(b"Content-Type: image/jpeg\r\n\r\n")
    with open(file_path, "rb") as f:
        body.extend(f.read())
    body.extend(b"\r\n")
    body.extend(f"--{boundary}--\r\n".encode("utf-8"))

    req = urllib.request.Request(
        f"https://api.cloudinary.com/v1_1/{CLOUD_NAME}/image/upload",
        data=body,
        headers={"Content-Type": f"multipart/form-data; boundary={boundary}"}
    )

    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data.get("secure_url")
    except Exception as e:
        print(f"Error uploading {filename}: {e}")
        return None

def main():
    files = sorted(glob.glob(os.path.join(IMAGE_DIR, "*.JPG")))
    print(f"Found {len(files)} photos to process.")
    
    # We select the top distinct and best framing photos across the collection to optimize bandwidth
    # and curate high quality pictures for the DevFest theme
    uploaded = []
    
    # Let's upload all available files
    for idx, f in enumerate(files):
        print(f"[{idx+1}/{len(files)}] Uploading {os.path.basename(f)}...")
        url = upload_image(f)
        if url:
            print(f"Uploaded: {url}")
            uploaded.append({
                "filename": os.path.basename(f),
                "url": url,
                "title": f"DevFest Indore Moment #{idx+1}",
                "category": "Keynotes" if idx < 8 else ("Showcase" if idx < 16 else ("Community" if idx < 24 else "Space")),
            })
        time.sleep(0.5)

    with open(OUTPUT_FILE, "w") as out:
        json.dump(uploaded, out, indent=2)
    print(f"Complete! Saved {len(uploaded)} URLs to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
