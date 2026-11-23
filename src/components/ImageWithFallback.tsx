import React, { useState } from 'react';
import { Dumbbell } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackLabel,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#18181C] via-[#121215] to-[#0A0A0C] text-[#A1A1AA] border border-[#26262C] ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="h-12 w-12 rounded-xl bg-[#C6FF00]/10 border border-[#C6FF00]/25 flex items-center justify-center text-[#C6FF00] mb-3">
          <Dumbbell className="h-6 w-6" />
        </div>
        <span className="text-xs font-medium tracking-wide text-[#A1A1AA] px-4 text-center">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
