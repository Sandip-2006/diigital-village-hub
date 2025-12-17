import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { Banner, mockBanners } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface HeroSliderProps {
  banners?: Banner[];
  autoPlayInterval?: number;
}

export function HeroSlider({ banners, autoPlayInterval = 5000 }: HeroSliderProps) {
  const { language, selectedVillage } = useStore();
  const t = getTranslation(language);
  
  const heroBanners = (banners || mockBanners).filter(
    b => b.type === 'hero' && b.isActive && 
    (!b.villageId || b.villageId === selectedVillage?.id)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroBanners.length);
  }, [heroBanners.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroBanners.length) % heroBanners.length);
  }, [heroBanners.length]);

  useEffect(() => {
    if (!isAutoPlaying || heroBanners.length <= 1) return;
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, autoPlayInterval, heroBanners.length]);

  if (heroBanners.length === 0) return null;

  const currentBanner = heroBanners[currentIndex];
  const title = language === 'hi' ? currentBanner.titleHi : 
                language === 'gu' ? currentBanner.titleGu : currentBanner.title;

  return (
    <section 
      className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {heroBanners.map((banner, index) => (
          <div
            key={banner.id}
            className={cn(
              "absolute inset-0 transition-all duration-700 ease-in-out",
              index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
            )}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full container flex items-end pb-12 md:pb-16">
              <div className="max-w-2xl animate-fade-up">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-3 drop-shadow-lg">
                  {language === 'hi' ? banner.titleHi : 
                   language === 'gu' ? banner.titleGu : banner.title}
                </h2>
                {banner.subtitle && (
                  <p className="text-lg md:text-xl text-muted-foreground mb-6">
                    {banner.subtitle}
                  </p>
                )}
                {banner.link && (
                  <Button 
                    variant="hero" 
                    size="lg"
                    onClick={() => window.location.href = banner.link!}
                  >
                    {t.common.learnMore}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {heroBanners.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm hover:bg-card/90 h-12 w-12 rounded-full shadow-lg"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm hover:bg-card/90 h-12 w-12 rounded-full shadow-lg"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Dots */}
      {heroBanners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroBanners.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentIndex 
                  ? "bg-primary w-8" 
                  : "bg-muted-foreground/50 hover:bg-muted-foreground"
              )}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
