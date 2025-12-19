import { ReactNode, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { getThemeById } from '@/lib/themes';
import { Header } from './Header';
import { Footer } from './Footer';
import { VillageSelectionModal } from '@/components/modules/VillageSelectionModal';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { theme } = useStore();
  const currentTheme = getThemeById(theme);

  // Apply theme class to body
  useEffect(() => {
    // Remove all theme classes first
    document.body.classList.remove('theme-diwali', 'theme-holi', 'theme-navratri', 'theme-independence');
    
    // Add current theme class if not default
    if (currentTheme.className) {
      document.body.classList.add(currentTheme.className);
    }
  }, [currentTheme]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      <VillageSelectionModal />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
