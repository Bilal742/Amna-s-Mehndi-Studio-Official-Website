import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
    router.push("/"); // redirect to home after logout
  };

  const goToAuth = () => {
    router.push("/auth");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-[#b85c1b]">
              Amna’s
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="#home"><a className="hover:text-[#f6c37d]">Home</a></Link>
            <Link href="#about"><a className="hover:text-[#f6c37d]">About</a></Link>
            <Link href="#services"><a className="hover:text-[#f6c37d]">Services</a></Link>
            <Link href="#gallery"><a className="hover:text-[#f6c37d]">Gallery</a></Link>
            <Link href="#booking"><a className="hover:text-[#f6c37d]">Booking</a></Link>
            <Link href="#testimonials"><a className="hover:text-[#f6c37d]">Testimonials</a></Link>
            <Link href="#contact"><a className="hover:text-[#f6c37d]">Contact</a></Link>

            <Link href="#booking">
              <a className="ml-4 px-4 py-2 bg-[#b85c1b] text-white rounded-lg hover:bg-[#f6c37d] transition">
                Book Now
              </a>
            </Link>

            {/* User Auth */}
            {user ? (
              // Logged in → show user icon + logout
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#b85c1b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.603 0 5.023.788 7.121 2.135M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <button onClick={handleLogout} className="px-2 py-1 text-[#b85c1b] hover:text-[#f6c37d]">Logout</button>
              </div>
            ) : (
              // Logged out → show login/signup icon
              <button onClick={goToAuth} className="ml-4 text-[#b85c1b] hover:text-[#f6c37d]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.603 0 5.023.788 7.121 2.135M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 pt-2 pb-4 space-y-2">
          <Link href="#home"><a className="block hover:text-[#f6c37d]">Home</a></Link>
          <Link href="#about"><a className="block hover:text-[#f6c37d]">About</a></Link>
          <Link href="#services"><a className="block hover:text-[#f6c37d]">Services</a></Link>
          <Link href="#gallery"><a className="block hover:text-[#f6c37d]">Gallery</a></Link>
          <Link href="#booking"><a className="block hover:text-[#f6c37d]">Booking</a></Link>
          <Link href="#testimonials"><a className="block hover:text-[#f6c37d]">Testimonials</a></Link>
          <Link href="#contact"><a className="block hover:text-[#f6c37d]">Contact</a></Link>
          <Link href="#booking">
            <a className="block mt-2 px-4 py-2 bg-[#b85c1b] text-white rounded-lg hover:bg-[#f6c37d] transition text-center">
              Book Now
            </a>
          </Link>

          {user ? (
            <div className="flex items-center gap-2 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#b85c1b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.603 0 5.023.788 7.121 2.135M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <button onClick={handleLogout} className="px-2 py-1 text-[#b85c1b] hover:text-[#f6c37d]">Logout</button>
            </div>
          ) : (
            <button onClick={goToAuth} className="block mt-2 w-full text-[#b85c1b] hover:text-[#f6c37d] text-left">
              Login / Signup
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
