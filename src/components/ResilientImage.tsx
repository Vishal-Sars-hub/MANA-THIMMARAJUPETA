import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel,
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-[#FEF3C7]/70 dark:bg-[#141A14] text-[#7C2D12] dark:text-[#A8A29E] border border-[#F5D08A] dark:border-[#243024] p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="w-5 h-5 opacity-70" aria-hidden="true" />
        <span className="text-xs font-medium leading-snug max-w-[18ch] line-clamp-2">
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
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
