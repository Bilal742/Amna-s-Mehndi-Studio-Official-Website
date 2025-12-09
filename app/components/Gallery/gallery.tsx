"use client";

import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState, useEffect } from "react";
import { mehndiGallery } from "@/mehndiGallery_data/data";
import { useRouter } from "next/navigation";

type GalleryProps = {
    theme: {
        background: string;
        text: string;
    };
    limit?: number;
};

export default function Gallery({ theme, limit }: GalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const router = useRouter();

    const openSlider = (index: number) => setSelectedIndex(index);
    const closeSlider = () => setSelectedIndex(null);

    const prevImage = () => {
        if (selectedIndex === null) return;
        setSelectedIndex(
            (selectedIndex - 1 + mehndiGallery.length) % mehndiGallery.length
        );
    };

    const nextImage = () => {
        if (selectedIndex === null) return;
        setSelectedIndex((selectedIndex + 1) % mehndiGallery.length);
    };

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (selectedIndex !== null) {
                if (e.key === "ArrowLeft") prevImage();
                if (e.key === "ArrowRight") nextImage();
                if (e.key === "Escape") closeSlider();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [selectedIndex]);

    const galleryItems = limit ? mehndiGallery.slice(0, limit) : mehndiGallery;

    return (
        <section
            id="gallery"
            className="pt-40 px-6 md:px-20 transition-colors duration-500"
            style={{ background: theme.background, color: theme.text }}
        >
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: theme.text }}>
                Gallery
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {galleryItems.map((item, i) => (
                    <div
                        key={i}
                        className="relative overflow-hidden rounded-lg cursor-pointer shadow-lg group"
                        onClick={() => openSlider(i)}
                    >
                        <img
                            src={item.src}
                            alt={item.name}
                            className="w-full h-48 object-cover transform transition duration-300 group-hover:scale-105"
                        />
                        <div
                            style={{ backgroundColor: theme.background + "aa", color: theme.text }}
                            className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-all duration-300"
                        >
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-sm">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {limit && limit < mehndiGallery.length && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => router.push("/gallery")}
                        style={{ background: theme.text, color: theme.background }}
                        className="text-white px-6 py-2 rounded-md transition cursor-pointer"
                    >
                        View All Gallery
                    </button>
                </div>
            )}

            {selectedIndex !== null && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={closeSlider}
                >
                    <div
                        className="relative flex flex-col items-center justify-center max-w-5xl w-full h-full px-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeSlider}
                            className="absolute top-5 right-5 text-white text-3xl z-50 hover:text-gray-300 transition cursor-pointer"
                        >
                            <FiX />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                            }}
                            className="absolute left-5 text-white text-4xl z-50 hover:text-gray-300 transition cursor-pointer"
                        >
                            <FiChevronLeft />
                        </button>
                        <img
                            src={mehndiGallery[selectedIndex].src}
                            alt={mehndiGallery[selectedIndex].name}
                            className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
                        />
                        <div className="mt-4 text-center text-white px-4">
                            <h3 className="text-2xl font-bold">{mehndiGallery[selectedIndex].name}</h3>
                            <p className="text-sm md:text-base mt-1">{mehndiGallery[selectedIndex].description}</p>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                            }}
                            className="absolute right-5 text-white text-4xl z-50 hover:text-gray-300 transition cursor-pointer"
                        >
                            <FiChevronRight />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
