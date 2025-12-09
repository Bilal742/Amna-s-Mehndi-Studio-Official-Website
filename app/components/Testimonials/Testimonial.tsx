"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { useState } from "react";

const testimonialsData = [
  {
    name: "Nudrat",
    review:
      "Bohot pyari mehndi lagayi! Design clean tha, color bohot dark aya. Highly recommended!",
    stars: 5,
  },
  {
    name: "Fatima",
    review:
      "Wedding mehndi bilkul perfect bani. Time bhi on-time and behavior also good!",
    stars: 5,
  },
  {
    name: "Shaziya",
    review:
      "Amazing work! Mehndi design bohot unique tha. Sab guests ne tarif ki.",
    stars: 4,
  },
  {
    name: "Muskhan",
    review:
      "Bohot pyari mehndi lagayi! Design clean tha, color bohot dark aya. Highly recommended!",
    stars: 5,
  },
  {
    name: "Rida",
    review:
      "Wedding mehndi bilkul perfect bani. Time bhi on-time and behavior also good!",
    stars: 5,
  },
  {
    name: "Iqra",
    review:
      "Amazing work! Mehndi design bohot unique tha. Sab guests ne tarif ki.",
    stars: 4,
  },
];

export default function Testimonials() {
  const { theme } = useTheme();

  return (
    <section
      id="testimonials"
      className="pt-30 px-6 md:px-20 transition-colors duration-500"
      style={{ background: theme.background, color: theme.text }}
    >
      <h2
        className="text-4xl font-bold text-center mb-12"
        style={{ color: theme.text }}
      >
        Client Reviews
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonialsData.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-lg bg-white/90 backdrop-blur-md hover:-translate-y-2 transform transition-all duration-300"
          >
            <div className="flex mb-3">
              {Array(item.stars)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
            </div>

            <p className="text-gray-700 italic">“{item.review}”</p>
            <h3 className="mt-4 font-bold text-lg text-gray-900">
              — {item.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
