"use client";
import { useTheme } from "@/app/context/ThemeContext";

export default function About() {
  const { theme } = useTheme();

  return (
    <section
      style={{ background: theme.background, color: theme.text }}
      className="py-30 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        
        <div className="lg:w-1/2 flex flex-col gap-6">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            About <span className="text-[#b85c1b]">Amna’s</span>
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-gray-500">
            Experience premium services with care and elegance. Our team ensures
            every customer leaves with a smile. Book your appointment today and
            step into a world of style and comfort.
          </p>

          <div className="flex flex-wrap gap-8 mt-8">
            <div className="flex flex-col hover:scale-105 transition-transform duration-300">
              <span className="text-3xl md:text-4xl font-bold text-[#b85c1b]">
                2k+
              </span>
              <span className="text-gray-400">Happy Customers</span>
            </div>

            <div className="flex flex-col hover:scale-105 transition-transform duration-300">
              <span className="text-3xl md:text-4xl font-bold text-[#b85c1b]">
                5
              </span>
              <span className="text-gray-400">Years of Style</span>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 w-full rounded-xl overflow-hidden shadow-2xl">
          <img
            src="/Slider_Img/bg2.jpg"
            alt="Amna’s Premium Service"
            className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
}
