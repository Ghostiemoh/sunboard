import { getVideoMetadata } from "@remotion/media-utils";
import path from "path";
import fs from "fs";

const dir = "public/raw_pitch";
const files = fs.readdirSync(dir).filter(f => f.endsWith(".MOV"));

async function probe() {
  for (const file of files) {
    try {
      const metadata = await getVideoMetadata(path.join(dir, file));
      console.log(`${file}: ${metadata.durationInSeconds}s (${metadata.width}x${metadata.height})`);
    } catch (e) {
      console.error(`Error probing ${file}:`, e.message);
    }
  }
}

probe();
