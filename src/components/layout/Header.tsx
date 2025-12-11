import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { getThemeById } from '@/lib/themes';
import { VillagePicker } from '@/components/modules/VillagePicker';
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/theme/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  Users,
  Phone,
  Home,
  FileText,
  Camera,
  Calendar,
  AlertCircle,
  MapPin
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const navItems = [
  { key: 'home', href: '/', icon: Home },
  { key: 'schemes', href: '/schemes', icon: FileText },
  { key: 'complaints', href: '/complaints', icon: AlertCircle },
  { key: 'events', href: '/events', icon: Calendar },
  { key: 'gallery', href: '/gallery', icon: Camera },
  { key: 'attractions', href: '/attractions', icon: MapPin },
  { key: 'contact', href: '/contact', icon: Phone },
] as const;

export function Header() {
  const { language, liveVisitors, incrementVisitors, theme, isMobileMenuOpen, setMobileMenuOpen } = useStore();
  const t = getTranslation(language);
  const currentTheme = getThemeById(theme);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Update live visitors count
  useEffect(() => {
    const interval = setInterval(incrementVisitors, 5000);
    return () => clearInterval(interval);
  }, [incrementVisitors]);

  // Track scroll for header style
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-card/80 backdrop-blur-xl shadow-md border-b border-border/50' 
          : 'bg-transparent'
      }`}
    >
      {/* Top Bar */}
      <div className="bg-primary/5 border-b border-border/30">
        <div className="container flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-4">
            <Badge variant="glass" className="gap-1.5 animate-pulse">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <Users className="h-3 w-3" />
              <span>{liveVisitors} {t.common.liveVisitors}</span>
            </Badge>
            {currentTheme.id !== 'default' && (
              <Badge variant="festival" className="gap-1">
                <span>{currentTheme.emoji}</span>
                <span className="hidden sm:inline">
                  {language === 'hi' ? currentTheme.nameHi : 
                   language === 'gu' ? currentTheme.nameGu : currentTheme.name}
                </span>
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-glow transition-shadow">
              <span className="text-2xl">🏡</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground leading-tight">
                {t.common.digitalVillagePortal}
              </h1>
              <p className="text-xs text-muted-foreground">
                {t.footer.governmentOf}
              </p>
            </div>
          </Link>

          {/* Village Picker - Desktop */}
          <div className="hidden md:block flex-1 max-w-xs mx-4">
            <VillagePicker />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.key} to={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    className={`gap-1.5 ${isActive ? '' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{t.nav[item.key as keyof typeof t.nav]}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Village Picker - Mobile */}
        <div className="md:hidden mt-4">
          <VillagePicker />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden bg-card border-t border-border animate-fade-in">
          <div className="container py-4 grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link 
                  key={item.key} 
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant={isActive ? 'default' : 'outline'}
                    className="w-full justify-start gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{t.nav[item.key as keyof typeof t.nav]}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
