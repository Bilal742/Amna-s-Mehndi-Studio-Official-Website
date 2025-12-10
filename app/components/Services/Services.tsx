"use client";

import React from "react";
import { useTheme } from "@/app/context/ThemeContext";
import {
  GiFlowerEmblem,
  GiFlowerPot,
  GiDiamonds,
  GiPartyPopper,
  GiHand,
  GiSpiralBottle,
  GiTempleDoor,
} from "react-icons/gi";

const services = [
  { name: "Basic Mehndi", icon: <GiFlowerPot size={40} /> },
  { name: "Advanced Mehndi", icon: <GiDiamonds size={40} /> },
  { name: "Bridal Mehndi", icon: <GiFlowerEmblem size={40} /> },
  { name: "Finger Designs", icon: <GiHand size={40} /> },
  { name: "Aesthetic Designs", icon: <GiSpiralBottle size={40} /> },
  { name: "Arabic Designs", icon: <GiTempleDoor size={40} /> },
];

export default function Services() {
  const { theme } = useTheme();

  return (
    <section
      id="services"
      className="py-30 px-6 md:px-20"
      style={{ background: theme.background, color: theme.text }}
    >
      <h2
        className="text-4xl font-bold text-center mb-12"
        style={{ color: theme.text }}
      >
        Our Mehndi Services
      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {services.map((service, i) => (
          <div
            key={i}
            className="relative bg-gradient-to-tr from-[#fff0f5] to-[#fffaf0] rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-500 overflow-hidden"
          >
            <div className="relative z-10 flex justify-center items-center flex-col">
              <div className="mb-6 text-[#b85c1b]">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
              <p className="text-gray-500 text-sm md:text-base">
                Elegant designs for {service.name}, combining classic, aesthetic & Arabic motifs for your hands.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
