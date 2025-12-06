'use client';

import { useState, useEffect, useCallback } from 'react';
import { Calendar, Trophy, Users, ChevronRight, Zap, Target, Mail, Phone, MapPin } from 'lucide-react';
import Header from '../components/Header';

export default function Homepage() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const stats = [
  { label: "Goal Stagione", value: "27", icon: Target, color: "from-blue-400 to-blue-600" },
  { label: "Anni di Storia", value: "4+", icon: Trophy, color: "from-yellow-400 to-orange-500" },
  { label: "Vittorie", value: "2", icon: Zap, color: "from-green-400 to-emerald-600" },
  { label: "Rosa", value: "20", icon: Users, color: "from-purple-400 to-pink-600" }
];

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1128]">
      <Header />
      {/* Hero Section con Carousel */}
      <section className="relative min-h-screen overflow-hidden" id="hero">
        {/* Carousel Background */}
        <div className="absolute inset-0">
          {/* Immagini - sostituisci con le tue foto in /public/images/ */}
          {['/images/hero1.jpg', '/images/hero2.jpg', '/images/hero3.jpg', '/images/hero4.jpg'].map((img, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: Math.floor(Date.now() / 5000) % 3 === index ? 1 : 0,
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Overlay scuro per leggibilità */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#001f54]/80 via-[#003d82]/70 to-[#0051a5]/90"></div>
            </div>
          ))}
          
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-20" aria-hidden="true">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Contenuto Hero */}
        <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
          <div className={`text-center z-10 max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Logo */}
            <div className="mb-8 inline-block">
              <div className="relative">
                <div className="absolute inset-0 bg-white blur-2xl opacity-30 animate-pulse" aria-hidden="true"></div>
                <div className="relative w-40 h-40 bg-gradient-to-br from-white to-blue-100 rounded-full flex items-center justify-center shadow-2xl border-8 border-[#003d82] transform hover:scale-110 hover:rotate-12 transition-all duration-500 overflow-hidden">
                  <img
                    src="/images/logo.png"
                    alt="Logo Patavinae Hirundines"
                    className="w-32 h-32 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Titolo */}
            <div className="mb-8 px-4">
              <h1 className="text-6xl sm:text-7xl md:text-9xl font-black text-white mb-4 tracking-tighter leading-none">
                PATAVINAE
              </h1>
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-none">
                <span className="inline-block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-pulse">
                  HIRUNDINES
                </span>
              </h2>
            </div>

            {/* Tagline */}
            <div className="mb-12">
              <div className="inline-block bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border-2 border-white/30">
                <p className="text-xl md:text-2xl text-white font-bold tracking-wider">
                  CALCIO A 5 • GIRONE C • VENETO
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
              <button
                onClick={() => scrollToSection('calendario')}
                className="group relative bg-white text-[#003d82] px-12 py-6 rounded-xl font-black text-xl hover:scale-105 transform transition-all duration-300 shadow-2xl overflow-hidden focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" aria-hidden="true"></div>
                <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors">
                  PROSSIMA PARTITA
                  <ChevronRight className="group-hover:translate-x-2 transition-transform" size={24} aria-hidden="true" />
                </span>
              </button>
              <button
                onClick={() => scrollToSection('contatti')}
                className="bg-transparent text-white px-12 py-6 rounded-xl font-black text-xl hover:bg-white/10 transform transition-all duration-300 border-4 border-white focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                CONTATTACI
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pb-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 border-2 border-white/20 hover:border-white hover:bg-white/10 cursor-pointer z-20"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: isVisible ? 'slideUp 0.6s ease-out forwards' : 'none'
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity rounded-2xl`} aria-hidden="true"></div>
                  <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-white mx-auto mb-3 md:mb-4 group-hover:scale-125 transition-transform" strokeWidth={2.5} aria-hidden="true" />
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
                  <div className="text-xs md:text-sm text-blue-200 font-bold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollToSection('calendario')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-2 z-30"
          aria-label="Scorri alla sezione successiva"
        >
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/60 text-sm font-semibold uppercase tracking-wider">Scrolla</span>
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-2">
              <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </button>
      </section>

      {/* Calendario e Risultati */}
      <section id="calendario" className="py-24 px-4 bg-gradient-to-b from-[#0a1128] to-[#001f54]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tight">
              LIVE DAL CAMPO
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-transparent via-white to-transparent mx-auto" aria-hidden="true"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calendario */}
            <article className="group">
              <div className="flex items-center gap-4 mb-6">
                <Calendar className="w-12 h-12 text-white" strokeWidth={2.5} aria-hidden="true" />
                <h3 className="text-4xl font-black text-white">PROSSIMA PARTITA</h3>
              </div>
              <div className="relative bg-[#001f54] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 hover:border-white/30 transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-white to-blue-600" aria-hidden="true"></div>
                <div className="flex items-center justify-center p-8 min-h-[400px]">
                  <iframe 
                    src='https://www.tuttocampo.it/WidgetV2/ProssimaPartita/d0fdc489-6b94-4f54-a038-dab4b788589c' 
                    width='500' 
                    height='350' 
                    scrolling='no' 
                    style={{ border: 0 }} 
                    loading='lazy'
                    title='Prossima Partita'
                    className='w-full max-w-[500px]'
                  />
                </div>
              </div>
            </article>

            {/* Risultati */}
            <article className="group">
              <div className="flex items-center gap-4 mb-6">
                <Trophy className="w-12 h-12 text-white" strokeWidth={2.5} aria-hidden="true" />
                <h3 className="text-4xl font-black text-white">RISULTATI</h3>
              </div>
              <div className="relative bg-[#001f54] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 hover:border-white/30 transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-white to-blue-600" aria-hidden="true"></div>
                <div className="flex items-center justify-center p-8 min-h-[400px]">
                  <iframe 
                    src='https://www.tuttocampo.it/WidgetV2/Risultati/d0fdc489-6b94-4f54-a038-dab4b788589c' 
                    width='500' 
                    height='600' 
                    scrolling='no' 
                    style={{ border: 0 }} 
                    loading='lazy'
                    title='Risultati'
                    className='w-full max-w-[500px]'
                  />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Classifica */}
      <section id="classifica" className="py-24 px-4 bg-[#001f54] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-8 py-4 rounded-full border-2 border-white/30">
                <Trophy className="w-10 h-10 text-white" strokeWidth={3} aria-hidden="true" />
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight">
                  CLASSIFICA
                </h2>
                <Trophy className="w-10 h-10 text-white" strokeWidth={3} aria-hidden="true" />
              </div>
            </div>
            <p className="text-xl text-blue-200 font-semibold">Girone C • Veneto • Calcio a 5</p>
          </div>

          <div className="relative bg-[#0a1128] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 hover:border-white/40 transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-600 via-white to-blue-600" aria-hidden="true"></div>
            <div className="flex items-center justify-center p-8">
              <iframe 
                src='https://www.tuttocampo.it/WidgetV2/Classifica/d0fdc489-6b94-4f54-a038-dab4b788589c' 
                width='600' 
                height='800' 
                scrolling='no' 
                style={{ border: 0 }} 
                loading='lazy'
                title='Classifica'
                className='w-full max-w-[600px]'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contatti */}
      <section id="contatti" className="py-32 px-4 bg-gradient-to-br from-[#003d82] via-[#0051a5] to-[#003d82] relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="mb-8">
              <div className="inline-block text-8xl mb-6 animate-bounce">⚽</div>
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-tight">
              UNISCITI ALLA
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">
                FAMIGLIA
              </span>
            </h2>
            <p className="text-2xl md:text-3xl text-blue-100 mb-12 font-semibold max-w-3xl mx-auto leading-relaxed">
              Cerchiamo Collaboratori con fame. Hai quello che serve?
            </p>
          </div>

          {/* Info Contatti */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a
              href="mailto:asdpatavinaehirundines@gmail.com"
              className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20 hover:border-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <Mail className="w-12 h-12 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-white font-bold text-lg">Email</p>
              <p className="text-blue-200 text-sm mt-2">asdpatavinaehirundines@gmail.com</p>
            </a>

            <a
              href="tel:+393331234567"
              className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20 hover:border-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="w-12 h-12 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-white font-bold text-lg">Telefono</p>
              <p className="text-blue-200 text-sm mt-2">+39 389 257 4273</p>
            </a>

            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20 hover:border-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <MapPin className="w-12 h-12 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-white font-bold text-lg">Sede</p>
              <p className="text-blue-200 text-sm mt-2">Cadoneghe PD, Veneto</p>
            </div>
          </div>

          <div className="text-center">
            <a
              href="mailto:info@patavinae-hirundines.it"
              className="group relative inline-block bg-white text-[#003d82] px-16 py-8 rounded-2xl font-black text-2xl hover:scale-110 transform transition-all duration-300 shadow-2xl overflow-hidden focus:outline-none focus:ring-4 focus:ring-white/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" aria-hidden="true"></div>
              <span className="relative z-10 flex items-center justify-center gap-4">
                CONTATTACI ORA
                <ChevronRight className="group-hover:translate-x-2 transition-transform" size={28} aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1128] py-12 px-4 border-t-2 border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="mb-6 inline-block">
              <div className="w-20 h-20 bg-gradient-to-br from-white to-blue-100 rounded-full flex items-center justify-center shadow-lg border-4 border-[#003d82] overflow-hidden">
                <img
                  src="/images/logo.png"
                  alt="Logo Patavinae Hirundines"
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
            <h3 className="text-3xl font-black text-white mb-2">PATAVINAE HIRUNDINES</h3>
            <p className="text-blue-200 mb-6">Calcio a 5 • Girone C • Veneto</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 text-blue-300 text-sm mb-6">
            <span>© 2024 Patavinae Hirundines</span>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>

          {/* Credits */}
          <div className="text-center pt-6 border-t border-white/10">
            <p className="text-blue-300 text-sm">
              Creato da{' '}
              <a 
                href="https://greg4web.it" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white font-bold hover:text-blue-200 transition-colors underline decoration-2 underline-offset-4"
              >
                greg4web.it
              </a>
              {' '}• Web Developer
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}