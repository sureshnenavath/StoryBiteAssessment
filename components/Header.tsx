'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, User } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#141414]' 
          : 'bg-gradient-to-b from-black via-black/60 to-transparent'
      }`}
    >
      <div className="w-full mx-auto px-0 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-[68px]">
          {/* Logo */}
          <div className="flex items-center gap-8 md:gap-10">
            <Link href="/" className="flex items-center">
              <span className="text-[#E50914] font-black text-[24px] md:text-[28px] tracking-tight hover:text-[#F40612] transition-colors">
                STREAMHUB
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[14px] font-medium text-white hover:text-gray-300 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Search"
            >
              <Search className="w-[20px] h-[20px]" />
            </button>
            <button
              className="hidden md:block text-white hover:text-gray-300 transition-colors"
              aria-label="User profile"
            >
              <User className="w-[20px] h-[20px]" />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white hover:text-gray-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10 bg-black/95">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-3 px-4 text-white hover:bg-white/5 rounded transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
