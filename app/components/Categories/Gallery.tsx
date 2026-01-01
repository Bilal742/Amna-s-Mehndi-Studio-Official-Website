"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

/* ================= TYPES ================= */
type CategoryData = {
  id: number;
  name: string;
  images: string[];
  videos: string[];
  slug: string;
};

type MediaItem = {
  type: "image" | "video";
  src: string;
  index: number;
};

/* ================= DATA ================= */
const allCategories: CategoryData[] = [
  {
    id: 1,
    name: "Basic Mehndi",
    slug: "basic-mehndi",
    images: [
      "/images/basic1.jpg",
      "/images/basic2.jpg",
      "/images/basic3.jpg",
      "/images/basic4.jpg",
    ],
    videos: [
      "/videos/basic1.mp4",
      "/videos/basic2.mp4",
      "/videos/basic3.mp4",
      "/videos/basic4.mp4",
      "/videos/basic5.mp4",
      "/videos/basic6.mp4",
    ],
  },
  {
    id: 2,
    name: "Trending Designs",
    slug: "trending-designs",
    images: [
      "/images/trending1.jpg",
      "/images/trending2.jpg",
      "/images/trending3.jpg",
      "/images/trending4.jpg",
    ],
    videos: [
      "/videos/trending1.mp4",
      "/videos/trending2.mp4",
      "/videos/trending3.mp4",
      "/videos/trending4.mp4",
      "/videos/trending5.mp4",
      "/videos/trending6.mp4",
    ],
  },
  {
    id: 3,
    name: "Aesthetic Designs",
    slug: "aesthetic-designs",
    images: [],
    videos: [],
  },
  {
    id: 4,
    name: "Feet Designs",
    slug: "feet-designs",
    images: [],
    videos: [],
  },
  {
    id: 5,
    name: "Backhand Designs",
    slug: "backhand-designs",
    images: [],
    videos: [],
  },
  {
    id: 6,
    name: "Arabic Designs",
    slug: "arabic-designs",
    images: [],
    videos: [],
  },
];

/* ================= COMPONENT ================= */
export default function CategoriesGallery({ slug }: { slug: string }) {
  const activeCategory = allCategories.find((c) => c.slug === slug);
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const touchStartX = useRef(0);

  if (!activeCategory) {
    return (
      <p className="text-center py-20 text-xl">
        Category not found
      </p>
    );
  }
const allMedia: MediaItem[] = [
  ...activeCategory.images.map((img, i) => ({
    type: "image" as const, 
    src: img,
    index: i,
  })),
  ...activeCategory.videos.map((vid, i) => ({
    type: "video" as const, 
    src: vid,
    index: i + activeCategory.images.length,
  })),
];


  const next = () =>
    setActiveMedia((prev) =>
      prev
        ? allMedia[(prev.index + 1) % allMedia.length]
        : null
    );

  const prev = () =>
    setActiveMedia((prev) =>
      prev
        ? allMedia[(prev.index - 1 + allMedia.length) % allMedia.length]
        : null
    );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!activeMedia) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setActiveMedia(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeMedia]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">

      {/* TITLE */}
      <h2 className="text-4xl font-bold text-center mb-12">
        {activeCategory.name}
      </h2>

      {/* GALLERY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {allMedia.map((media) => (
          <div
            key={media.index}
            onClick={() => setActiveMedia(media)}
            className="relative h-44 rounded-xl overflow-hidden cursor-pointer
            shadow-md hover:scale-105 transition"
          >
            {media.type === "image" ? (
              <Image src={media.src} alt="" fill className="object-cover" />
            ) : (
              <video
                src={media.src}
                muted
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {activeMedia && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onTouchStart={(e) =>
            (touchStartX.current = e.changedTouches[0].screenX)
          }
          onTouchEnd={(e) => {
            const diff =
              touchStartX.current - e.changedTouches[0].screenX;
            if (diff > 50) next();
            if (diff < -50) prev();
          }}
        >
          <button
            onClick={() => setActiveMedia(null)}
            className="absolute top-6 right-6 text-white text-4xl"
          >
            <FiX />
          </button>

          <button
            onClick={prev}
            className="absolute left-6 text-white text-4xl"
          >
            <FiChevronLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-6 text-white text-4xl"
          >
            <FiChevronRight />
          </button>

          <div className="relative w-full max-w-5xl h-[70vh]">
            {activeMedia.type === "image" ? (
              <Image
                src={activeMedia.src}
                alt=""
                fill
                className="object-contain"
              />
            ) : (
              <video
                src={activeMedia.src}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
