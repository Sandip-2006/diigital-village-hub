import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Play,
  Users,
  MapPin,
  Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroSection() {
  const { language, selectedVillage } = useStore();
  const t = getTranslation(language);

  const getVillageName = () => {
    if (!selectedVillage) return '';
    switch (language) {
      case 'hi': return selectedVillage.nameHi;
      case 'gu': return selectedVillage.nameGu;
      default: return selectedVillage.name;
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent opacity-50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="container relative py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Welcome Badge */}
          <Badge variant="glass" className="mb-6 px-4 py-2 animate-fade-up">
            <span className="text-lg mr-2">🙏</span>
            {t.common.welcomeTo} {getVillageName()}
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
            {t.home.heroTitle.split(' ').map((word, i) => (
              <span 
                key={i} 
                className={i === 1 ? 'gradient-text' : ''}
              >
                {word}{' '}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '200ms' }}>
            {t.home.heroSubtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
            <Link to="/schemes">
              <Button variant="hero" size="lg" className="gap-2 min-w-[200px]">
                {t.nav.schemes}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/complaints">
              <Button variant="outline" size="lg" className="gap-2 min-w-[200px]">
                {t.nav.complaints}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Village Stats */}
          {selectedVillage && (
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-12 animate-fade-up" style={{ animationDelay: '400ms' }}>
              <div className="text-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="flex justify-center mb-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{selectedVillage.population.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Population</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="flex justify-center mb-2">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{selectedVillage.area}</p>
                <p className="text-xs text-muted-foreground">Sq. Km Area</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="flex justify-center mb-2">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{selectedVillage.pincode}</p>
                <p className="text-xs text-muted-foreground">Pincode</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
