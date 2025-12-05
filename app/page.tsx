import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <section id="home" className="pt-20 min-h-screen bg-[#fffaf6] flex items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#b85c1b]">Amna’s Mehndi Studio</h1>
      </section>
    </>
  );
}
