import React from 'react';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-vibe text-white font-sans h-[100%]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Left Side: Brand Name */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-custom">Malik Asad Stitchers</h3>
            <p className="text-gray-300 mt-1">Exquisite Traditional Attire</p>
          </div>

          {/* Right Side: Social Icons */}
          <div className="flex space-x-6">
            {/* Instagram Icon */}
            <Link href="https://www.instagram.com/asadmalikstitchersofficial?utm_source=qr&igsh=M3VmaGNhNHNicXN0" aria-label="Instagram" className="text-white hover:text-opacity-80 transition-opacity duration-300">
              <FaInstagram size={28} className="text-pink-500" />
            </Link>

            {/* TikTok Icon */}
            <Link href="#" aria-label="TikTok" className="text-white hover:text-opacity-80 transition-opacity duration-300">
              {/* TikTok's logo is complex, so a simple white icon is standard. 
                  You could also use a gradient or multiple colors if you prefer. */}
              <FaTiktok size={28} />
            </Link>

            {/* Facebook Icon */}
            <Link href="#" aria-label="Facebook" className="text-white hover:text-opacity-80 transition-opacity duration-300">
              <FaFacebook size={28} className="text-blue-600" />
            </Link>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-8 pt-6 border-t border-custom/30 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Malik Asad Stitchers. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
