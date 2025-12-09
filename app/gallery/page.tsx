"use client";

import { useTheme } from "@/app/context/ThemeContext";
import Gallery from "../components/Gallery/gallery";

export default function GalleryPage() {
  const { theme } = useTheme();

  return <Gallery theme={theme}/>;
}
