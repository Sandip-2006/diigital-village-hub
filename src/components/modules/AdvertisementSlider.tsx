import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { Banner, mockBanners } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface AdvertisementSliderProps {
  banners?: Banner[];
  autoPlayInterval?: number;
}

export function AdvertisementSlider({ banners, autoPlayInterval = 4000 }: AdvertisementSliderProps) {
  const { language, selectedVillage } = useStore();
  const t = getTranslation(language);
  
  const adBanners = (banners || mockBanners).filter(
    b => b.type === 'advertisement' && b.isActive && 
    (!b.villageId || b.villageId === selectedVillage?.id)
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    if (adBanners.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % adBanners.length);
    }
  }, [adBanners.length]);

  const prevSlide = useCallback(() => {
    if (adBanners.length > 1) {
      setCurrentIndex((prev) => (prev - 1 + adBanners.length) % adBanners.length);
    }
  }, [adBanners.length]);

  useEffect(() => {
    if (adBanners.length <= 1) return;
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [nextSlide, autoPlayInterval, adBanners.length]);

  if (adBanners.length === 0) return null;

  const currentAd = adBanners[currentIndex];
  const title = language === 'hi' ? currentAd.titleHi : 
                language === 'gu' ? currentAd.titleGu : currentAd.title;

  return (
    <section className="py-6">
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {language === 'hi' ? 'प्रायोजित' : language === 'gu' ? 'પ્રાયોજિત' : 'Sponsored'}
            </Badge>
            {language === 'hi' ? 'स्थानीय व्यवसाय' : 
             language === 'gu' ? 'સ્થાનિક વ્યવસાય' : 'Local Businesses'}
          </h3>
          {adBanners.length > 1 && (
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={prevSlide} className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={nextSlide} className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <Card 
          variant="interactive" 
          className="relative overflow-hidden h-[150px] md:h-[180px] cursor-pointer"
          onClick={() => currentAd.link && window.open(currentAd.link, '_blank')}
        >
          {adBanners.map((ad, index) => (
            <div
              key={ad.id}
              className={cn(
                "absolute inset-0 transition-all duration-500",
                index === currentIndex ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
              )}
            >
              {/* Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${ad.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-card/95 via-card/70 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center p-6">
                <div className="max-w-md">
                  <h4 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                    {language === 'hi' ? ad.titleHi : 
                     language === 'gu' ? ad.titleGu : ad.title}
                  </h4>
                  {ad.link && (
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      {t.common.contactUs}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Indicator dots */}
          {adBanners.length > 1 && (
            <div className="absolute bottom-3 right-3 flex gap-1.5">
              {adBanners.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === currentIndex ? "bg-primary" : "bg-muted-foreground/40"
                  )}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                />
              ))}
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
