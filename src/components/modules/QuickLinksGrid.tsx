import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Briefcase, 
  AlertCircle, 
  Camera, 
  Calendar, 
  MapPin, 
  Building2, 
  Cloud,
  ShoppingBasket,
  Users,
  Landmark,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickLinkItem {
  icon: React.ReactNode;
  titleKey: keyof typeof import('@/lib/i18n').translations.en.nav;
  description: string;
  href: string;
  color: string;
  gradient: string;
}

const quickLinks: QuickLinkItem[] = [
  {
    icon: <FileText className="h-6 w-6" />,
    titleKey: 'schemes',
    description: 'Government schemes & benefits',
    href: '/schemes',
    color: 'text-primary',
    gradient: 'from-primary/20 to-primary/5',
  },
  {
    icon: <AlertCircle className="h-6 w-6" />,
    titleKey: 'complaints',
    description: 'File & track complaints',
    href: '/complaints',
    color: 'text-destructive',
    gradient: 'from-destructive/20 to-destructive/5',
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    titleKey: 'events',
    description: 'Village events & gatherings',
    href: '/events',
    color: 'text-secondary',
    gradient: 'from-secondary/20 to-secondary/5',
  },
  {
    icon: <Camera className="h-6 w-6" />,
    titleKey: 'gallery',
    description: 'Photos & memories',
    href: '/gallery',
    color: 'text-accent',
    gradient: 'from-accent/20 to-accent/5',
  },
  {
    icon: <Users className="h-6 w-6" />,
    titleKey: 'members',
    description: 'Panchayat members',
    href: '/members',
    color: 'text-info',
    gradient: 'from-info/20 to-info/5',
  },
  {
    icon: <Landmark className="h-6 w-6" />,
    titleKey: 'gramSabha',
    description: 'Meetings & decisions',
    href: '/gram-sabha',
    color: 'text-success',
    gradient: 'from-success/20 to-success/5',
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    titleKey: 'attractions',
    description: 'Local attractions',
    href: '/attractions',
    color: 'text-warning',
    gradient: 'from-warning/20 to-warning/5',
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    titleKey: 'amenities',
    description: 'Banks, shops & services',
    href: '/amenities',
    color: 'text-muted-foreground',
    gradient: 'from-muted/40 to-muted/10',
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    titleKey: 'weather',
    description: 'Weather updates',
    href: '/weather',
    color: 'text-info',
    gradient: 'from-info/20 to-info/5',
  },
  {
    icon: <ShoppingBasket className="h-6 w-6" />,
    titleKey: 'market',
    description: 'Mandi prices & market',
    href: '/market',
    color: 'text-success',
    gradient: 'from-success/20 to-success/5',
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    titleKey: 'development',
    description: 'Development projects',
    href: '/development',
    color: 'text-primary',
    gradient: 'from-primary/20 to-primary/5',
  },
  {
    icon: <Phone className="h-6 w-6" />,
    titleKey: 'contact',
    description: 'Emergency contacts',
    href: '/contact',
    color: 'text-destructive',
    gradient: 'from-destructive/20 to-destructive/5',
  },
];

export function QuickLinksGrid() {
  const { language } = useStore();
  const t = getTranslation(language);

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{t.home.quickLinks}</h2>
            <p className="text-muted-foreground mt-1">Access all services in one place</p>
          </div>
          <Badge variant="glass" className="animate-pulse">
            {quickLinks.length} Services
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {quickLinks.map((link, index) => (
            <Link to={link.href} key={link.titleKey}>
              <Card 
                variant="interactive"
                className={`p-4 h-full bg-gradient-to-br ${link.gradient} group animate-fade-up`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className={`p-3 rounded-xl bg-card shadow-sm ${link.color} group-hover:scale-110 transition-transform duration-300`}>
                    {link.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">
                      {t.nav[link.titleKey]}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {link.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
