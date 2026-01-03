"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/context/ThemeContext";

const images = [
  "/Slider_Img/bg6.jpg",
  "/Slider_Img/bg4.jpg",
  "/Slider_Img/bg5.jpg",
];

const Hero = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${images[current]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
        color: theme.text,
      }}
      className="flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-10 transition-all duration-1000 opacity-95"
    >
      <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
        Welcome to Amna’s Mehndi Studio
      </h1>
      <p className="text-white text-lg sm:text-xl md:text-2xl mb-6 drop-shadow-lg max-w-2xl">
        Experience premium services with care and elegance. Book your appointment today!
      </p>
      <button
        style={{
          background: theme.text,
          color: theme.background,
        }}
        className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded font-semibold transition cursor-pointer text-sm sm:text-base md:text-lg"
        onClick={() => router.push("/booking")}
      >
        Book Now
      </button>
    </section>
  );
};

export default Hero;
