import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FitZoneLogo } from './Icons';
import { NAV_ITEMS, NavItem } from '../data/fitzoneData';

export type ModalType = 'enroll' | 'plans' | 'classes' | 'blog' | 'about' | 'trainer' | null;

interface NavbarProps {
  activeSection: string;
  onSelectNav: (item: NavItem) => void;
  onOpenEnroll: () => void;
}

export function Navbar({ activeSection, onSelectNav, onOpenEnroll }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileClick = (item: NavItem) => {
    setMobileMenuOpen(false);
    onSelectNav(item);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0A0C]/90 backdrop-blur-md border-b border-[#26262C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-[72px] flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark + Lime Dumbbell Icon */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            onSelectNav(NAV_ITEMS[0]);
          }}
          className="whitespace-nowrap shrink-0 focus-visible:rounded-lg"
          aria-label="FitZone Início"
        >
          <FitZoneLogo />
        </a>

        {/* Zone 2: Center Navigation Links */}
        <nav
          aria-label="Navegação principal"
          className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectNav(item);
                }}
                className={`relative py-2 transition-colors whitespace-nowrap shrink-0 ${
                  isActive ? 'text-white font-semibold' : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#C6FF00] rounded-full"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenEnroll}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#C6FF00] hover:bg-[#D2FF1E] text-[#0A0A0C] font-bold text-sm px-5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 lime-btn-glow whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Matricule-se</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#18181C] border border-[#26262C] text-white hover:border-[#C6FF00]/60 transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden border-t border-[#26262C] bg-[#121215]"
          >
            <nav
              aria-label="Menu móvel"
              className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileClick(item);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#18181C] text-[#C6FF00] border border-[#26262C]'
                        : 'text-[#A1A1AA] hover:text-white hover:bg-[#18181C]/60'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="h-1.5 w-6 rounded-full bg-[#C6FF00]" />}
                  </a>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnroll();
                }}
                className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C6FF00] hover:bg-[#D2FF1E] text-[#0A0A0C] font-bold text-sm px-5 py-3 transition-colors cursor-pointer"
              >
                <span>Matricule-se</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
