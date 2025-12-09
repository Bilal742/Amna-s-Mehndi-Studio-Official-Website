"use client";

export default function About() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-20 py-16 bg-gray-900 text-white text-center md:text-left">
      
      <div className="max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          About Amna’s
        </h2>

        <p className="text-gray-300 mb-4 text-lg md:text-xl">
          Amna’s is dedicated to creating memorable experiences for our clients. 
          We combine professionalism with creativity to ensure every service 
          is perfectly tailored to your needs.
        </p>

        <p className="text-gray-300 mb-6 text-lg md:text-xl">
          Our team works tirelessly to deliver the best results, ensuring every 
          visit leaves a lasting impression. Discover the difference with Amna’s.
        </p>

        <button className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition">
          Learn More
        </button>
      </div>

    </section>
  );
}
