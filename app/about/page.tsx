"use client";

import { useRouter } from "next/navigation";
import themeColors from "../components/themeColors/themeColors";

export default function About() {
  const theme = themeColors.dark;
  const router = useRouter()

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-20 py-16 bg-[#fffaf6] text-white text-center md:text-left">

      <div className="max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          About Amna’s
        </h2>

        <p
          style={{ color: theme.text }}
          className="mb-4 text-lg md:text-xl">
          Amna’s is dedicated to creating memorable experiences for our clients.
          We combine professionalism with creativity to ensure every service
          is perfectly tailored to your needs.
        </p>

        <p
          style={{ color: theme.text }}
          className="mb-6 text-lg md:text-xl">
          Our team works tirelessly to deliver the best results, ensuring every
          visit leaves a lasting impression. Discover the difference with Amna’s.
        </p>

        <button
          onClick={() => router.push("/services")}
          style={{ background: theme.text, color: theme.background }}
          className="px-8 py-3 font-semibold rounded-lg hover:bg-yellow-400 transition cursor-pointer">
          Learn More
        </button>
      </div>

    </section>
  );
}
