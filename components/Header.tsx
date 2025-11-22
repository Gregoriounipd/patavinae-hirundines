'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Instagram, Facebook, Mail, Phone, Camera, Home, Users, Calendar as CalendarIcon, Info, Trophy } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Detect active section for highlighting
      const sections = ['home', 'calendario', 'classifica', 'contatti'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
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

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  }, []);

  const menuItems = [
    { label: 'Home', href: '/', sectionId: 'hero', icon: Home },
    { label: 'Rosa', href: '/rosa', icon: Users },
    { label: 'Calendario', sectionId: 'calendario', icon: CalendarIcon },
    { label: 'Classifica', sectionId: 'classifica', icon: Trophy },
    { label: 'Gallery', href: '/gallery', icon: Camera },
    { label: 'Contatti', sectionId: 'contatti', icon: Mail },
  ];

  const socialLinks = [
    { 
      icon: Instagram, 
      href: 'https://instagram.com/patavinaehirundines', 
      label: 'Seguici su Instagram',
      color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500'
    },
    { 
      icon: Facebook, 
      href: 'https://facebook.com/patavinaehirundines', 
      label: 'Seguici su Facebook',
      color: 'hover:bg-blue-600'
    },
    { 
      icon: Phone, 
      href: 'tel:+393401234567', 
      label: 'Chiamaci',
      color: 'hover:bg-green-600'
    },
  ];

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (item.sectionId) {
      scrollToSection(item.sectionId);
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#001f54]/98 backdrop-blur-lg shadow-2xl border-b-2 border-white/10' 
            : 'bg-gradient-to-b from-[#001f54]/80 to-transparent backdrop-blur-sm'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo - Enhanced */}
            <a 
              href="/" 
              className="group flex items-center gap-3 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg px-2 py-1"
              aria-label="Patavinae Hirundines - Home"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" aria-hidden="true"></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-white via-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30 group-hover:border-white group-hover:shadow-white/50 group-hover:shadow-xl transition-all duration-300 group-hover:rotate-12">
                  <span className="text-3xl" role="img" aria-label="Aquila">🦅</span>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="text-white font-black text-xl leading-tight tracking-tight group-hover:text-blue-100 transition-colors">
                  PATAVINAE
                  <span className="block text-sm font-bold text-blue-200 group-hover:text-white transition-colors">HIRUNDINES</span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation - Enhanced */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Menu principale">
              {menuItems.map((item, index) => {
                const isActive = activeSection === item.sectionId;
                return item.sectionId ? (
                  <button
                    key={index}
                    onClick={() => handleMenuClick(item)}
                    className={`group relative px-5 py-3 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 ${
                      isActive ? 'text-blue-200' : 'hover:text-blue-200'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {item.icon && <item.icon size={16} strokeWidth={2.5} />}
                      {item.label}
                    </span>
                    <div className={`absolute inset-0 bg-white/10 rounded-lg transition-all duration-300 ${
                      isActive ? 'scale-100 opacity-100' : 'scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100'
                    }`} aria-hidden="true"></div>
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full" aria-hidden="true"></div>
                    )}
                  </button>
                ) : (
                  <a
                    key={index}
                    href={item.href}
                    className="group relative px-5 py-3 text-white font-bold text-sm uppercase tracking-wider hover:text-blue-200 transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {item.icon && <item.icon size={16} strokeWidth={2.5} />}
                      {item.label}
                    </span>
                    <div className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" aria-hidden="true"></div>
                  </a>
                );
              })}
            </nav>

            {/* Social Links Desktop - Enhanced */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="w-px h-8 bg-white/20" aria-hidden="true"></div>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith('tel:') ? '_self' : '_blank'}
                  rel={social.href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                  className={`group relative w-11 h-11 flex items-center justify-center rounded-full bg-white/10 transition-all duration-300 border-2 border-white/20 hover:border-white hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon 
                    size={20} 
                    className="text-white group-hover:scale-110 transition-transform" 
                    strokeWidth={2.5}
                  />
                  {/* Tooltip */}
                  <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-white text-[#003d82] px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button - Enhanced */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition-all duration-300 border-2 border-white/30 hover:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label={isMobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
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

        {/* Mobile Menu - Enhanced */}
        <div 
          id="mobile-menu"
          className={`lg:hidden transition-all duration-500 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen border-t-2 border-white/10' : 'max-h-0'
          }`}
          role="navigation"
          aria-label="Menu mobile"
        >
          <div className="bg-[#001f54]/98 backdrop-blur-lg px-4 py-6 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {menuItems.map((item, index) => {
              const isActive = activeSection === item.sectionId;
              return item.sectionId ? (
                <button
                  key={index}
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl font-bold uppercase tracking-wider transition-all border-2 ${
                    isActive 
                      ? 'bg-white/15 border-white/40 text-white' 
                      : 'bg-white/5 border-white/10 text-white/90 hover:bg-white/10 hover:border-white/30 active:scale-98'
                  }`}
                >
                  {item.icon && <item.icon size={20} strokeWidth={2.5} />}
                  <span className="flex-1 text-left">{item.label}</span>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" aria-hidden="true"></div>
                  )}
                </button>
              ) : (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 active:scale-98 text-white font-bold uppercase tracking-wider transition-all border-2 border-white/10 hover:border-white/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon && <item.icon size={20} strokeWidth={2.5} />}
                  {item.label}
                </a>
              );
            })}
            
            {/* Social Mobile - Enhanced */}
            <div className="pt-4 mt-2 border-t-2 border-white/10">
              <p className="text-blue-200 text-sm font-bold uppercase tracking-wider mb-3 px-2">
                Seguici su
              </p>
              <div className="grid grid-cols-3 gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('tel:') ? '_self' : '_blank'}
                    rel={social.href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                    className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl bg-white/10 hover:bg-white active:scale-95 text-white font-semibold transition-all border-2 border-white/20 hover:border-white ${social.color}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label={social.label}
                  >
                    <social.icon size={24} strokeWidth={2.5} />
                    <span className="text-xs">{social.label.split(' ')[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Contact - Bonus */}
            <div className="pt-4 mt-2 border-t-2 border-white/10">
              <a
                href="mailto:info@patavinae-hirundines.it"
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border-2 border-white/30"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Mail size={20} strokeWidth={2.5} />
                Contattaci Ora
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer ottimizzato */}
      <div className="h-20" role="presentation"></div>
    </>
  );
}