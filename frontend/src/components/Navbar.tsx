import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Menu, X } from 'lucide-react';
import { NeonButton } from './ui';
import Link from 'next/link';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Ecosystem', href: '#ecosystem' },
    { name: 'Tokenomics', href: '#tokenomics' },
    { name: 'Docs', href: '#' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-brand-bg-primary/80 backdrop-blur-md border-brand-border py-4' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 relative group cursor-pointer">
            <Terminal className="w-6 h-6 text-brand-text-1 group-hover:text-brand-accent-base transition-colors" />
            <span className="font-display font-bold text-xl tracking-widest text-brand-text-1">DYNA</span>
            <div className="absolute -inset-2 bg-brand-accent-base/0 group-hover:bg-brand-accent-base/10 blur-xl transition-all duration-300 -z-10" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="font-mono text-sm uppercase tracking-widest text-brand-text-3 hover:text-brand-accent-base transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-brand-accent-base scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
          </nav>

          {/* Action Area */}
          <div className="hidden md:flex items-center gap-4">
            <div className="w-px h-6 bg-brand-border mx-2" />
            <span className="font-mono text-[10px] text-brand-accent-base/70 tracking-widest border border-brand-accent-base/30 px-2 py-1 bg-brand-bg-primary hidden lg:block">SYS.ONLINE</span>
              <Link href="/dashboard">
              <NeonButton variant="outline" className="!py-2 !px-4 text-xs">Access Terminal</NeonButton>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-brand-text-1 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-brand-bg-primary/95 backdrop-blur-xl pt-24 px-6 md:hidden border-b border-brand-border"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="font-display text-2xl uppercase tracking-widest text-brand-text-1 border-b border-brand-border/30 pb-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <NeonButton variant="primary" className="mt-4 w-full justify-center">Access Terminal</NeonButton>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
