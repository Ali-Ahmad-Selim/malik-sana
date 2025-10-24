"use client"
import { useState, useEffect } from 'react';
import SendButton from './mail';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // This effect injects the keyframe animations into the document's head.
  // This makes the component self-contained without needing a separate CSS file.
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);

    // Cleanup function to remove the style when the component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);


  // This effect disables body scroll when the mobile menu is open.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function to reset the overflow style when the component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Waist coat', href: '/components/waist' },
    { name: 'Casual coat', href: '/components/casual' },
    { name: 'Shairwani', href: '/components/shairwani' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 shadow-lg py-4">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-3 ">
            <a href="#">
              <img
                src="/favicon.jpg" // Replace with your logo path
                alt="Logo"
                width={50}
                height={50}
                className="rounded-full border-2 border-custom p-1"
              />
            </a>
            <h1 className='text-white lg:text-2xl lg:font-bold'> Elite fitters</h1> 
          </div>
                 
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-white border border-custom rounded-md bg-gray-800 hover:bg-custom-500 hover:border-custom transition-all duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-custom p-2 z-50 relative focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
           
          </div>
        </div>

        {/* --- Mobile Menu & Overlay --- */}

        {/* Overlay: Fades in to cover the content */}
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out md:hidden ${
            isOpen ? 'opacity-60' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Mobile Menu: Slides in from the right */}
        <div
          className={`md:hidden fixed right-0 top-0 h-full w-64 bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* A small header for the mobile menu */}
          <div className="p-4 border-b border-gray-700">
             <h2 className="text-white text-lg font-semibold">Menu</h2>
          </div>
          <div className="flex flex-col space-y-3 p-4">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={`block px-4 py-2 text-white border border-custom rounded-md bg-gray-800 hover:bg-custom-500 transition-all transform ${
                  // Only apply animation when menu is opening
                  isOpen ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  // Staggered animation for each item
                  animation: isOpen ? `fadeIn 0.5s ease forwards ${index * 100 + 200}ms` : 'none',
                }}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

