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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate how many images to show (3 for desktop, 1 for mobile)
  const imagesPerView = 3;
  const totalSlides = Math.ceil(images.length / imagesPerView);

  // Auto-scroll logic
  useEffect(() => {
    if (!isPlaying || images.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, autoScrollSpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, totalSlides, autoScrollSpeed]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => 
      prev === totalSlides - 1 ? 0 : prev + 1
    );
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
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / imagesPerView)}%)` }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 relative group"
                  style={{ width: `${100 / imagesPerView}%` }}
                >
                  <div className="overflow-hidden flex items-center justify-center bg-white mx-2 md:h-[420px] lg:h-[520px]" style={{height: '100%'}}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 rounded-xl"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Caption */}
                  {image.caption && (
                    <div className="absolute bottom-6 left-8 right-8">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
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
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-base-blue hover:bg-white hover:scale-110 transition-all duration-300 group z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-base-blue hover:bg-white hover:scale-110 transition-all duration-300 group z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  currentIndex === index 
                    ? 'bg-base-blue scale-125 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-base-blue to-analogous-teal rounded-full transition-all duration-1000 ease-in-out"
              style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
            />
          </div>
        </div>

        {/* Image Counter */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-500 font-medium">
            {currentIndex + 1} of {totalSlides}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ImageGalleryCarousel;