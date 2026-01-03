"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone } from "react-icons/fi";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      style={{ background: theme.background, color: theme.text }}
      className="pt-30 pb-12 px-6 md:px-20 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Amna’s Mehndi Studio</h3>
          <p className="text-sm md:text-base">
            Providing premium Mehndi and beauty services with elegance and care.  
            Book your appointment today and make your special moments memorable!
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/services" className="hover:text-[#b85c1b] transition-colors">Services</a>
            </li>
            <li>
              <a href="/gallery" className="hover:text-[#b85c1b] transition-colors">Gallery</a>
            </li>
            <li>
              <a href="/booking" className="hover:text-[#b85c1b] transition-colors">Booking</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-[#b85c1b] transition-colors">Contact</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm md:text-base">
            <li className="flex items-center gap-2">
              <FiPhone /> <span>+92 300 1234567</span>
            </li>
            <li className="flex items-center gap-2">
              <FiMail /> <span>usmanali.office.pk@gmail.com</span>
            </li>
            <li className="flex items-center gap-3 mt-2">
              <a href="#" className="hover:text-[#b85c1b] transition-colors"><FiFacebook size={20} /></a>
              <a href="#" className="hover:text-[#b85c1b] transition-colors"><FiInstagram size={20} /></a>
              <a href="#" className="hover:text-[#b85c1b] transition-colors"><FiTwitter size={20} /></a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-500 pt-6 text-center text-sm md:text-base">
        &copy; {new Date().getFullYear()} Amna’s Mehndi Studio. All Rights Reserved.
      </div>
    </footer>
  );
}
