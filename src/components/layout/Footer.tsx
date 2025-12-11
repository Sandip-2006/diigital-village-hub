import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Youtube, 
  ExternalLink,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  services: [
    { key: 'schemes', href: '/schemes' },
    { key: 'complaints', href: '/complaints' },
    { key: 'gramSabha', href: '/gram-sabha' },
    { key: 'development', href: '/development' },
  ],
  information: [
    { key: 'about', href: '/about' },
    { key: 'members', href: '/members' },
    { key: 'events', href: '/events' },
    { key: 'announcements', href: '/announcements' },
  ],
  explore: [
    { key: 'gallery', href: '/gallery' },
    { key: 'attractions', href: '/attractions' },
    { key: 'amenities', href: '/amenities' },
    { key: 'market', href: '/market' },
  ],
};

export function Footer() {
  const { language, selectedVillage } = useStore();
  const t = getTranslation(language);

  return (
    <footer className="bg-card border-t border-border mt-auto">
      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Village Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg">
                <span className="text-2xl">🏡</span>
              </div>
              <div>
                <h3 className="font-bold text-foreground">{t.common.digitalVillagePortal}</h3>
                <p className="text-xs text-muted-foreground">{t.footer.governmentOf}</p>
              </div>
            </div>
            {selectedVillage && (
              <div className="space-y-2 text-sm text-muted-foreground mt-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                  <span>
                    {selectedVillage.name}, {selectedVillage.taluka}<br />
                    {selectedVillage.district}, {selectedVillage.state} - {selectedVillage.pincode}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{selectedVillage.sarpanch.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>gram.{selectedVillage.id}@gujarat.gov.in</span>
                </div>
              </div>
            )}
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.key}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t.nav[link.key as keyof typeof t.nav]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Information</h4>
            <ul className="space-y-2">
              {footerLinks.information.map((link) => (
                <li key={link.key}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t.nav[link.key as keyof typeof t.nav]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Explore</h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.key}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t.nav[link.key as keyof typeof t.nav]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              India.gov.in
            </a>
            <a href="#" className="hover:text-primary flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              Gujarat.gov.in
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-primary/5 border-t border-border">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-success" />
            <span>© 2024 {t.footer.governmentOf}. {t.footer.allRightsReserved}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary">{t.footer.privacyPolicy}</a>
            <a href="#" className="hover:text-primary">{t.footer.termsOfService}</a>
            <a href="#" className="hover:text-primary">{t.footer.accessibility}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
