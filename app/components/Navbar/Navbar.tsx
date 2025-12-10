"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FiLogOut, FiMenu, FiUser, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/app/context/ThemeContext";
import toast from "react-hot-toast";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const { themeMode, theme, toggleTheme } = useTheme();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Gallery", href: "/gallery" },
        { name: "Projects", href: "/project" },  
        { name: "Booking", href: "/booking" },
        { name: "Testimonials", href: "/testimonials" },
        { name: "Contact", href: "/contact" },
    ];

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u: User | null) => setUser(u));
        return () => unsub();
    }, []);

    const handleLogout = async () => {
        const isConfirmed = window.confirm("Are you sure you want to logout?");
        if (!isConfirmed) return;

        try {
            await signOut(auth);
            toast.success("Logged out successfully!");
            router.push("/");
        } catch (err) {
            console.error(err);
            toast.error("Error logging out!");
        }
    };
    return (
        <nav
            style={{ background: theme.background, color: theme.text }}
            className="shadow-md fixed w-full z-50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:p-3">
                <div className="flex justify-between h-16 items-center">

                    <div
                        onClick={() => router.push("/")}
                        className="cursor-pointer text-2xl font-bold">Amna’s</div>

                    <div className="hidden lg:flex space-x-6 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{ color: theme.text }}
                                className="hover:text-orange-600"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <button
                            onClick={() => router.push("/booking")}
                            style={{ background: theme.text, color: theme.background }}
                            className="px-4 py-2 rounded-lg"
                        >
                            Book Now
                        </button>

                        {/* <button onClick={toggleTheme} className="text-xl">
                            {themeMode === "dark" ? <FiSun /> : <FiMoon />}
                        </button> */}

                        {user ? (
                            <button onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
                                <FiLogOut /> Logout
                            </button>
                        ) : (
                            <Link href="/auth" className="text-xl cursor-pointer">
                                <FiUser />
                            </Link>
                        )}
                    </div>

                    <button className="lg:hidden text-xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div
                    style={{ background: theme.background, color: theme.text }}
                    className="lg:hidden px-4 pb-4 shadow-lg space-y-3 flex flex-col"
                >
                    {navLinks.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            onClick={() => setIsOpen(false)}
                        >
                            {l.name}
                        </Link>
                    ))}

                    {user ? (
                        <button
                            onClick={() => { handleLogout(); setIsOpen(false); }}
                            className="flex items-center gap-2 mt-3 cursor-pointer"
                        >
                            <FiLogOut /> Logout
                        </button>
                    ) : (
                        <Link
                            href="/auth"
                            className="text-xl mt-3 cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            <FiUser />
                        </Link>
                    )}
                </div>
            )}

        </nav>
    );
}
