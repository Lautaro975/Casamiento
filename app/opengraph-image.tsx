import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { SEO } from "../constants/seo";

export const alt = SEO.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

export default async function OpenGraphImage() {
  const relativePath = SEO.ogImage.replace(/^\//, "");
  const filePath = path.join(process.cwd(), "public", relativePath);
  const input = await readFile(filePath);
  const jpeg = await sharp(input)
    .rotate()
    .resize(size.width, size.height, { fit: "cover", position: "centre" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  return new Response(jpeg, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
