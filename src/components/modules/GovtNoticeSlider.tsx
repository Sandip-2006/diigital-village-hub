import { useState, useEffect, useCallback } from 'react';
import { useStore } from '@/store/useStore';
import { mockBanners, Banner } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, FileText, AlertTriangle, Vote } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GovtNoticeSliderProps {
  banners?: Banner[];
  autoPlayInterval?: number;
}

export function GovtNoticeSlider({ banners = mockBanners, autoPlayInterval = 6000 }: GovtNoticeSliderProps) {
  const { selectedVillage, language } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter government banners
  const govtBanners = banners.filter(
    (b) =>
      b.type === 'government' &&
      b.isActive &&
      (!b.villageId || b.villageId === selectedVillage?.id)
  );

  const nextSlide = useCallback(() => {
    if (govtBanners.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % govtBanners.length);
  }, [govtBanners.length]);

  const prevSlide = useCallback(() => {
    if (govtBanners.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + govtBanners.length) % govtBanners.length);
  }, [govtBanners.length]);

  useEffect(() => {
    if (govtBanners.length <= 1) return;
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [nextSlide, autoPlayInterval, govtBanners.length]);

  if (govtBanners.length === 0) return null;

  const currentBanner = govtBanners[currentIndex];
  const title = language === 'hi' ? currentBanner.titleHi : language === 'gu' ? currentBanner.titleGu : currentBanner.title;
  
  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'election': return <Vote className="h-4 w-4" />;
      case 'notice': return <AlertTriangle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryLabel = (category?: string) => {
    const labels: Record<string, Record<string, string>> = {
      scheme: { en: 'Scheme', hi: 'योजना', gu: 'યોજના' },
      election: { en: 'Election', hi: 'चुनाव', gu: 'ચૂંટણી' },
      notice: { en: 'Notice', hi: 'सूचना', gu: 'સૂચના' },
    };
    return labels[category || 'scheme']?.[language] || 'Government';
  };

  return (
    <section className="py-6">
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-secondary" />
            {language === 'hi' ? 'सरकारी सूचनाएं' : language === 'gu' ? 'સરકારી સૂચનાઓ' : 'Government Notices'}
          </h2>
          <div className="flex gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={prevSlide}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={nextSlide}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl">
          <div 
            className="relative h-48 md:h-64 bg-cover bg-center transition-all duration-500"
            style={{ backgroundImage: `url(${currentBanner.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/60" />
            <div className="absolute inset-0 flex items-center p-6 md:p-8">
              <div className="max-w-xl text-white">
                <Badge className="mb-3 bg-white/20 text-white border-white/30">
                  {getCategoryIcon(currentBanner.category)}
                  <span className="ml-1">{getCategoryLabel(currentBanner.category)}</span>
                </Badge>
                <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>
                {currentBanner.subtitle && (
                  <p className="text-white/80 mb-4">{currentBanner.subtitle}</p>
                )}
                {currentBanner.link && (
                  <Link to={currentBanner.link}>
                    <Button variant="secondary" className="bg-white text-secondary hover:bg-white/90">
                      {language === 'hi' ? 'और जानें' : language === 'gu' ? 'વધુ જાણો' : 'Learn More'}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="absolute bottom-3 right-3 flex gap-1">
            {govtBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}