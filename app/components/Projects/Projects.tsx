"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useTheme } from "@/app/context/ThemeContext";

type ProjectType = {
    id: number;
    category: "Bridal" | "Party" | "Special";
    clientName: string;
    name: string;
    description: string;
    src: string;
    additionalImages?: string[];
};

// Projects Data
const projects: ProjectType[] = [
    { id: 1, category: "Bridal", clientName: "Ayesha Khan", name: "Full Hand Bridal Mehndi", description: "Detailed bridal mehndi covering full hands and arms, traditional floral and paisley patterns.", src: "/Gallery_Img/bg1.jpg", additionalImages: ["/Gallery_Img/bg1.jpg", "/Gallery_Img/bg2.jpg"] },
    { id: 2, category: "Bridal", clientName: "Sara Ali", name: "Full Arm Bridal Mehndi", description: "Bridal mehndi extending from hands to elbow, intricate floral patterns.", src: "/Gallery_Img/bg2.jpg" },
    { id: 3, category: "Bridal", clientName: "Zara Ahmed", name: "Full Leg Bridal Mehndi", description: "Bridal mehndi designs covering legs, traditional patterns with elegance.", src: "/Gallery_Img/bg3.jpg" },
    { id: 4, category: "Bridal", clientName: "Hina Malik", name: "Back/Shoulder Bridal Mehndi", description: "Mehndi designs on upper back and shoulders, bridal style.", src: "/Gallery_Img/bg4.jpg" },
    { id: 5, category: "Bridal", clientName: "Fariha Qureshi", name: "Bridal Arabic Mehndi", description: "Simple and flowy Arabic style bridal mehndi.", src: "/Gallery_Img/bg5.jpg" },
    { id: 6, category: "Bridal", clientName: "Nadia Shah", name: "Bridal Indian Mehndi", description: "Dense and intricate Indian bridal mehndi patterns.", src: "/Gallery_Img/bg6.jpg" },
    { id: 7, category: "Bridal", clientName: "Amna Riaz", name: "Bridal Pakistani Mehndi", description: "Combination of Arabic and Indian style mehndi, floral + geometric.", src: "/Gallery_Img/bg7.jpg" },
    { id: 8, category: "Party", clientName: "Sana Tariq", name: "Simple Hand Mehndi", description: "Quick and easy mehndi designs for hands, minimal patterns.", src: "/Gallery_Img/bg8.jpg" },
    { id: 9, category: "Party", clientName: "Maha Iqbal", name: "Finger Mehndi", description: "Mehndi applied only on fingers.", src: "/Gallery_Img/bg9.jpg" },
    { id: 10, category: "Party", clientName: "Rabia Aslam", name: "Arabic Party Mehndi", description: "Flowing vines and floral Arabic style mehndi for parties.", src: "/Gallery_Img/bg10.jpg" },
    { id: 11, category: "Party", clientName: "Laiba Khan", name: "Modern Minimal Mehndi", description: "Geometric and minimal mehndi patterns for modern look.", src: "/Gallery_Img/bg11.jpg" },
    { id: 12, category: "Special", clientName: "Maryam Javed", name: "Henna Tattoos", description: "Fun small mehndi designs like temporary tattoos.", src: "/Gallery_Img/bg12.jpg" },
    { id: 13, category: "Special", clientName: "Fatima Iqbal", name: "Engagement Mehndi", description: "Mehndi specially designed for engagement ceremony.", src: "/Gallery_Img/bg13.jpg" },
    { id: 14, category: "Special", clientName: "Hira Ali", name: "Sangeet Mehndi", description: "Vibrant mehndi for sangeet celebration.", src: "/Gallery_Img/bg14.jpg" },
    { id: 15, category: "Special", clientName: "Zoya Raza", name: "Eid Mehndi", description: "Traditional mehndi designs for Eid celebration.", src: "/Gallery_Img/bg15.jpg" },
    { id: 16, category: "Special", clientName: "Noor Fatima", name: "Baby Shower Mehndi", description: "Mehndi designs for baby shower ceremony.", src: "/Gallery_Img/bg16.jpg" },
    { id: 17, category: "Special", clientName: "Amina Shah", name: "Festival Mehndi", description: "Mehndi designs for festivals like Diwali or Karva Chauth.", src: "/Gallery_Img/bg17.jpg" },
];

export default function ProjectsPage() {
        const { themeMode, theme, toggleTheme } = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [zoomProject, setZoomProject] = useState<ProjectType | null>(null);
    const [filter, setFilter] = useState<"All" | "Bridal" | "Party" | "Special">("All");

    const filteredProjects = filter === "All" ? projects : projects.filter(p => p.category === filter);

    const prevSlide = () => setCurrentIndex((currentIndex - 1 + filteredProjects.length) % filteredProjects.length);
    const nextSlide = () => setCurrentIndex((currentIndex + 1) % filteredProjects.length);

    // Autoplay
    // useEffect(() => {
    //     const interval = setInterval(() => nextSlide(), 4000);
    //     return () => clearInterval(interval);
    // }, [currentIndex, filteredProjects.length]);

    const handleKey = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prevSlide();
            else if (e.key === "ArrowRight") nextSlide();
            else if (e.key === "Escape") setZoomProject(null);
        },
        [currentIndex]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [handleKey]);

    return (
        <section className="max-w-6xl mx-auto px-4 py-30">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mehndi Projects</h2>

            <div className="flex justify-center gap-4 mb-10">
                {["All", "Bridal", "Party", "Special"].map(cat => (
                    <button
                        key={cat}
                        onClick={() => { setFilter(cat as any); setCurrentIndex(0); }}
                        className={`cursor-pointer px-4 py-2 rounded-full font-semibold transition ${filter === cat ? "bg-[#b85c1b] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="relative flex items-center justify-center">
                <button style={{ background: theme.text, color: theme.background }}  onClick={prevSlide} className="absolute left-0 z-20 text-3xl p-3 rounded-full hover:bg-opacity-80 transition cursor-pointer">‹</button>

                <div className="relative w-full max-w-4xl h-96 flex items-center justify-center perspective-1000 overflow-visible">
                    <AnimatePresence initial={false}>
                        {filteredProjects.map((project, index) => {
                            let position = index - currentIndex;
                            if (position < -1) position = -2;
                            if (position > 1) position = 2;

                            return (
                                <motion.div
                                    key={project.id}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    onDragEnd={(event, info) => {
                                        if (info.offset.x > 50) prevSlide();
                                        else if (info.offset.x < -50) nextSlide();
                                    }}
                                    initial={{ opacity: 0, scale: 0.7, x: position * 200, rotateY: position * 30 }}
                                    animate={{ opacity: position === 0 ? 1 : 0.7, scale: position === 0 ? 1 : 0.8, x: position * 200, rotateY: position * 30, zIndex: position === 0 ? 10 : 0 }}
                                    exit={{ opacity: 0, scale: 0.7 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute w-72 h-96 rounded-xl shadow-2xl overflow-hidden cursor-pointer"
                                    onClick={() => setZoomProject(project)}
                                >
                                    <Image src={project.src} alt={project.name} fill className="object-cover rounded-xl" />
                                    <div 
                                    style={{ background: theme.background, color: theme.text }}
                                    className="absolute bottom-0 w-full  p-3 text-center">
                                        <p className="text-sm italic">{project.clientName}</p>
                                        <h3 className="font-bold">{project.name}</h3>
                                        <p className="text-xs mt-1">{project.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                <button style={{ background: theme.text, color: theme.background }} onClick={nextSlide} className="absolute right-0 z-20 text-3xl p-3 cursor-pointer rounded-full hover:bg-opacity-80 transition">›</button>
            </div>

            <div className="flex justify-center mt-6 gap-2">
                {filteredProjects.map((_, index) => (
                    <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition ${index === currentIndex ? "bg-[#b85c1b]" : "bg-gray-400"}`} />
                ))}
            </div>
            {filteredProjects.length > 0 && (
                <div className="mt-10 bg-white rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold mb-2 text-center">{filteredProjects[currentIndex].name}</h3>
                    <p className="text-gray-700 mb-1"><strong>Client:</strong> {filteredProjects[currentIndex].clientName}</p>
                    <p className="text-gray-700 mb-3"><strong>Occasion:</strong> {filteredProjects[currentIndex].category}</p>
                    <p className="text-gray-700 mb-4">{filteredProjects[currentIndex].description}</p>

                    <div className="grid grid-cols-3 gap-4">
                        <div
                            className="relative w-full h-32 cursor-pointer overflow-hidden rounded-lg shadow hover:scale-105 transition"
                            onClick={() => setZoomProject({ ...filteredProjects[currentIndex], src: filteredProjects[currentIndex].src })}
                        >
                            <Image
                                src={filteredProjects[currentIndex].src}
                                alt={filteredProjects[currentIndex].name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {filteredProjects[currentIndex].additionalImages?.map((img, idx) => (
                            <div
                                key={idx}
                                className="relative w-full h-32 cursor-pointer overflow-hidden rounded-lg shadow hover:scale-105 transition"
                                onClick={() => setZoomProject({ ...filteredProjects[currentIndex], src: img })}
                            >
                                <Image
                                    src={img}
                                    alt={`${filteredProjects[currentIndex].name}-${idx}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {zoomProject && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="relative max-w-4xl w-full h-full flex flex-col rounded-lg overflow-hidden bg-white/10">
                        <button
                            className="absolute top-4 right-4 text-white text-3xl p-2 rounded-full hover:bg-black/50 transition z-50"
                            onClick={() => setZoomProject(null)}
                        >
                            <FiX />
                        </button>

                        <div className="relative w-full flex-1">
                            <Image
                                src={zoomProject.src}
                                alt={zoomProject.name}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="p-4 text-center text-white bg-black/20">
                            <p className="text-sm italic">{zoomProject.clientName}</p>
                            <h3 className="text-2xl font-bold">{zoomProject.name}</h3>
                            <p className="text-gray-300 mb-4">{zoomProject.description}</p>

                            {zoomProject.additionalImages && zoomProject.additionalImages.length > 1 && (
                                <div className="flex justify-center mt-2 gap-2 overflow-x-auto">
                                    {zoomProject.additionalImages.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className="w-24 h-24 flex-shrink-0 rounded overflow-hidden shadow cursor-pointer hover:scale-105 transition"
                                            onClick={() => setZoomProject({ ...zoomProject, src: img })}
                                        >
                                            <Image
                                                src={img}
                                                alt={`${zoomProject.name}-${idx}`}
                                                width={100}
                                                height={100}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
