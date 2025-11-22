'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Instagram, Facebook, Mail, Phone, Camera, Home, Users, Calendar, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const menuItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Rosa', href: '/rosa', icon: Users },
    { label: 'Calendario', href: '/calendario', icon: Calendar },
    { label: 'Classifica', href: '/classifica', icon: Trophy },
    { label: 'Gallery', href: '/gallery', icon: Camera },
    { label: 'Contatti', href: '/contatti', icon: Mail },
  ];

  const socialLinks = [
    { 
      icon: Instagram, 
      href: 'https://instagram.com/patavinaehirundines', 
      label: 'Instagram'
    },
    { 
      icon: Facebook, 
      href: 'https://facebook.com/patavinaehirundines', 
      label: 'Facebook'
    },
    { 
      icon: Phone, 
      href: 'tel:+393401234567', 
      label: 'Telefono'
    },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#001f54]/98 backdrop-blur-lg shadow-2xl border-b-2 border-white/10' 
            : 'bg-gradient-to-b from-[#001f54]/80 to-transparent backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link
              href="/" 
              className="group flex items-center gap-3 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg px-2 py-1"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-white via-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30 group-hover:border-white group-hover:shadow-white/50 group-hover:shadow-xl transition-all duration-300 group-hover:rotate-12">
                  <span className="text-3xl">🦅</span>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="text-white font-black text-xl leading-tight tracking-tight group-hover:text-blue-100 transition-colors">
                  PATAVINAE
                  <span className="block text-sm font-bold text-blue-200 group-hover:text-white transition-colors">HIRUNDINES</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="group relative px-5 py-3 text-white font-bold text-sm uppercase tracking-wider hover:text-blue-200 transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <item.icon size={16} strokeWidth={2.5} />
                    {item.label}
                  </span>
                  <div className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </Link>
              ))}
            </nav>

            {/* Social Links Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="w-px h-8 bg-white/20"></div>
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target={social.href.startsWith('tel:') ? '_self' : '_blank'}
                  rel={social.href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                  className="group relative w-11 h-11 flex items-center justify-center rounded-full bg-white/10 transition-all duration-300 border-2 border-white/20 hover:border-white hover:scale-110 hover:shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label={social.label}
                >
                  <social.icon 
                    size={20} 
                    className="text-white group-hover:text-[#003d82] group-hover:scale-110 transition-all" 
                    strokeWidth={2.5}
                  />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition-all duration-300 border-2 border-white/30 hover:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label={isMobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
            >
              <div className="relative w-6 h-6">
                <X 
                  className={`absolute inset-0 text-white transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
                  }`} 
                  size={24} 
                  strokeWidth={2.5} 
                />
                <Menu 
                  className={`absolute inset-0 text-white transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-90 opacity-0' : 'rotate-0 opacity-100'
                  }`} 
                  size={24} 
                  strokeWidth={2.5} 
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden transition-all duration-500 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen border-t-2 border-white/10' : 'max-h-0'
          }`}
        >
          <div className="bg-[#001f54]/98 backdrop-blur-lg px-4 py-6 space-y-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wider transition-all border-2 border-white/10 hover:border-white/30"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon size={20} strokeWidth={2.5} />
                {item.label}
              </Link>
            ))}
            
            {/* Social Mobile */}
            <div className="pt-4 mt-2 border-t-2 border-white/10">
              <p className="text-blue-200 text-sm font-bold uppercase tracking-wider mb-3 px-2">
                Seguici
              </p>
              <div className="grid grid-cols-3 gap-3">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('tel:') ? '_self' : '_blank'}
                    rel={social.href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                    className="flex flex-col items-center justify-center gap-2 py-4 rounded-xl bg-white/10 hover:bg-white text-white hover:text-[#003d82] font-semibold transition-all border-2 border-white/20 hover:border-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <social.icon size={24} strokeWidth={2.5} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-20"></div>
    </>
  );
}