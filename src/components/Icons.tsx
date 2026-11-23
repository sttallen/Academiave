import React from 'react';

interface LogoProps {
  className?: string;
}

export function FitZoneLogo({ className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 select-none whitespace-nowrap shrink-0 ${className}`}>
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#C6FF00]/12 border border-[#C6FF00]/30 text-[#C6FF00]">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6.5 6.5V17.5M17.5 6.5V17.5M3.5 9V15M20.5 9V15M6.5 12H17.5"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="5" y="7" width="3" height="10" rx="1" fill="currentColor" />
          <rect x="16" y="7" width="3" height="10" rx="1" fill="currentColor" />
        </svg>
      </span>
      <span className="text-xl font-extrabold tracking-tight text-white">
        Fit<span className="text-[#C6FF00]">Zone</span>
      </span>
    </span>
  );
}

/**
 * High-precision decorative dumbbell rack illustration for the CTA banner corner,
 * ensuring sharp contrast and zero broken image dependency.
 */
export function DumbbellCornerArtwork() {
  return (
    <svg
      viewBox="0 0 260 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="metalBar" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3F3F46" />
          <stop offset="50%" stopColor="#27272A" />
          <stop offset="100%" stopColor="#121215" />
        </linearGradient>
        <linearGradient id="plateFace" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2A2A32" />
          <stop offset="60%" stopColor="#141418" />
          <stop offset="100%" stopColor="#0A0A0C" />
        </linearGradient>
        <linearGradient id="limeRim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C6FF00" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#C6FF00" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Primary foreground heavy hex dumbbell */}
      <g transform="translate(55, 45) rotate(-26 95 65)">
        {/* Shaft */}
        <rect x="54" y="57" width="84" height="16" rx="4" fill="url(#metalBar)" stroke="#3F3F46" strokeWidth="1" />
        {/* Knurling lines */}
        <path d="M74 58V72M80 58V72M86 58V72M106 58V72M112 58V72M118 58V72" stroke="#52525B" strokeWidth="1.2" />
        {/* Left Plates */}
        <rect x="14" y="22" width="22" height="86" rx="6" fill="url(#plateFace)" stroke="#3F3F46" strokeWidth="1.5" />
        <rect x="36" y="30" width="20" height="70" rx="5" fill="url(#plateFace)" stroke="url(#limeRim)" strokeWidth="1.5" />
        {/* Right Plates */}
        <rect x="136" y="30" width="20" height="70" rx="5" fill="url(#plateFace)" stroke="url(#limeRim)" strokeWidth="1.5" />
        <rect x="156" y="22" width="22" height="86" rx="6" fill="url(#plateFace)" stroke="#3F3F46" strokeWidth="1.5" />
        {/* Center cap accents */}
        <circle cx="25" cy="65" r="5" fill="#C6FF00" fillOpacity="0.85" />
        <circle cx="167" cy="65" r="5" fill="#C6FF00" fillOpacity="0.85" />
      </g>

      {/* Secondary background dumbbell */}
      <g transform="translate(115, 130) rotate(-14 65 35)" opacity="0.65">
        <rect x="34" y="29" width="60" height="12" rx="3" fill="#1F1F25" stroke="#32323B" strokeWidth="1" />
        <rect x="10" y="10" width="24" height="50" rx="5" fill="#18181C" stroke="#2D2D35" strokeWidth="1.2" />
        <rect x="94" y="10" width="24" height="50" rx="5" fill="#18181C" stroke="#2D2D35" strokeWidth="1.2" />
      </g>
    </svg>
  );
}
