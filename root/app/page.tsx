import fs from "fs";
import path from "path";
import HomeClient from "./HomeClient";

export default function Home() {
  const bildekarusellDir = path.join(process.cwd(), "public", "images", "Bildekarusell");

  let carouselImages: string[] = [];
  try {
    const files = fs.readdirSync(bildekarusellDir);
    carouselImages = files
      .filter(file => /\.(jpe?g|png|gif|webp|avif)$/i.test(file))
      .map(file => `/images/Bildekarusell/${file}`);
  } catch (error) {
    console.error("Error reading Bildekarusell directory:", error);
  }

  return <HomeClient carouselImages={carouselImages} />;
}
