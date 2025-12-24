import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  alt?: string;
}

interface StudioMediaCarouselProps {
  media: MediaItem[];
  autoPlayInterval?: number;
  className?: string;
}

const StudioMediaCarousel: React.FC<StudioMediaCarouselProps> = ({
  media,
  autoPlayInterval = 5000,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentMedia = media[currentIndex];

  // Auto-advance slideshow
  useEffect(() => {
    if (isPlaying && currentMedia.type === 'image') {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, autoPlayInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [currentIndex, isPlaying, currentMedia.type]);

  // Auto-play videos
  useEffect(() => {
    if (currentMedia.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay prevented:', err);
      });
    }
  }, [currentIndex, currentMedia.type]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (media.length === 0) {
    return (
      <div className={`flex items-center justify-center bg-slate-200 rounded-2xl ${className}`}>
        <p className="text-slate-500">No media available</p>
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      {/* Media Display */}
      <div className="relative overflow-hidden rounded-2xl bg-black">
        {currentMedia.type === 'image' ? (
          <img
            src={currentMedia.url}
            alt={currentMedia.alt || 'Studio'}
            className="w-full h-[260px] sm:h-[320px] object-cover transition-opacity duration-500"
            loading="lazy"
          />
        ) : (
          <video
            ref={videoRef}
            src={currentMedia.url}
            className="w-full h-[260px] sm:h-[320px] object-cover"
            loop
            muted
            playsInline
            onEnded={goToNext}
          />
        )}

        {/* Navigation Arrows */}
        {media.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Play/Pause for Images */}
        {currentMedia.type === 'image' && media.length > 1 && (
          <button
            onClick={togglePlayPause}
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
        )}

        {/* Media Type Indicator */}
        {currentMedia.type === 'video' && (
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1.5">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Video
          </div>
        )}
      </div>

      {/* Dots Navigation */}
      {media.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {media.map((item, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-6'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to ${item.type} ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      {media.length > 1 && (
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          {currentIndex + 1} / {media.length}
        </div>
      )}
    </div>
  );
};

export default StudioMediaCarousel;
