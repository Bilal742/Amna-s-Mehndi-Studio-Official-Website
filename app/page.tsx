"use client";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import { useTheme } from "./context/ThemeContext";
import About from "./components/About/about";
import Gallery from "./components/Gallery/gallery";
import Reviews from "./components/Reviews/ReviewsSection";
import ContactForm from "./components/Contact/Contact";
import Categories from "./categories/page";
// import MehndiProjects3D from "./gallery/Projects";


export default function Home() {
  const { theme } = useTheme();

  return (
    <main style={{ background: theme.background, color: theme.text }}>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Categories />
      <Gallery theme={theme} limit={8} />
      <Reviews maxReviews={3} showViewAllButton={true} />
      <ContactForm />
    </main>
  );
}
