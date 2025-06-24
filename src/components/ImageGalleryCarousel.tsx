import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface Image {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryCarouselProps {
  images: Image[];
  sectionTitle: string;
  sectionDescription: string;
  autoScrollSpeed?: number; // milliseconds between moves
  className?: string;
}

const ImageGalleryCarousel: React.FC<ImageGalleryCarouselProps> = ({
  images,
  sectionTitle,
  sectionDescription,
  autoScrollSpeed = 3000,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic with back-and-forth movement
  useEffect(() => {
    if (!isPlaying || images.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        let nextIndex = prevIndex + direction;
        
        // Change direction when reaching boundaries
        if (nextIndex >= images.length - 1) {
          setDirection(-1);
          return images.length - 1;
        } else if (nextIndex <= 0) {
          setDirection(1);
          return 0;
        }
        
        return nextIndex;
      });
    }, autoScrollSpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, direction, images.length, autoScrollSpeed]);

  // Smooth scroll to current image
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const imageWidth = container.scrollWidth / images.length;
      const scrollPosition = currentIndex * imageWidth;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMouseEnter = () => {
    setIsPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsPlaying(true);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className={`py-24 bg-gradient-to-b from-white to-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">
            {sectionTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {sectionDescription}
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative reveal"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white border border-gray-100">
            <div
              ref={containerRef}
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 relative group"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Caption */}
                  {image.caption && (
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <p className="text-gray-800 font-medium">{image.caption}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-teal-600 hover:bg-white hover:scale-110 transition-all duration-300 group z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-teal-600 hover:bg-white hover:scale-110 transition-all duration-300 group z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-teal-600 hover:bg-white hover:scale-110 transition-all duration-300 z-10"
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  currentIndex === index 
                    ? 'bg-teal-600 scale-125 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-1000 ease-in-out"
              style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Image Counter */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-500 font-medium">
            {currentIndex + 1} of {images.length}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ImageGalleryCarousel;