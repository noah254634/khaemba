import React, { useState } from 'react';

/**
 * High-performance OptimizedImage component
 * Features:
 * - Native browser lazy loading (or eager for hero/priority images)
 * - Async decoding and priority hinting
 * - Smooth skeleton shimmer placeholder while loading
 * - Fade-in animation on load completion
 * - Graceful fallback UI on image load error
 */
export default function OptimizedImage({
  src,
  alt = '',
  className = '',
  priority = false,
  aspectRatio,
  objectFit = 'object-cover',
  fallbackText,
  onClick,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`bg-neutral-800/80 border border-neutral-700/50 flex flex-col items-center justify-center p-4 text-center text-neutral-400 font-mono-code text-xs select-none ${className}`}
        style={{ aspectRatio }}
        onClick={onClick}
      >
        <svg
          className="w-6 h-6 mb-1 text-neutral-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span>{fallbackText || alt || 'Image unavailable'}</span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-neutral-900/60 ${className}`}
      style={{ aspectRatio }}
      onClick={onClick}
    >
      {/* Animated Skeleton Shimmer Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-[length:200%_100%] animate-pulse" />
      )}

      {/* Optimized Native Image */}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full ${objectFit} transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
}
