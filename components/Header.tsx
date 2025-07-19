"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 w-full z-20 glass-effect border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-extrabold tracking-tight text-white flex items-center">
          <Link href="/" className="text-glow flex items-center">
            <Image src="/AI-CRM-Logo.png" alt="AI-CRM Logo" width={40} height={40} className="mr-2" priority quality={90} />
            <span>AI-CRM</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/#features" className="text-white/80 hover:text-white transition-colors font-medium">
            Features
          </Link>
          <Link href="/#pricing" className="text-white/80 hover:text-white transition-colors font-medium">
            Pricing
          </Link>
          <Link href="/auth/login" className="text-white/80 hover:text-white transition-colors font-medium">
            Log In
          </Link>
          <Link href="/auth/signup" className="btn-primary px-6 py-2.5 rounded-lg font-semibold inline-block">
            Sign Up
          </Link>
        </nav>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            className="text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-effect border-t border-white/5">
          <div className="px-4 py-5 space-y-4">
            <Link href="/#features" onClick={() => setMobileMenuOpen(false)} className="block text-white/80 hover:text-white py-2 font-medium">
              Features
            </Link>
            <Link href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-white/80 hover:text-white py-2 font-medium">
              Pricing
            </Link>
            <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)} className="block text-white/80 hover:text-white py-2 font-medium">
              Log In
            </Link>
            <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)} className="btn-primary block text-center py-2 rounded-lg font-medium">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
