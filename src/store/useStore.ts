import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from '@/lib/i18n';
import { ThemeId, getCurrentFestivalTheme } from '@/lib/themes';
import { Village, villages } from '@/lib/villages';

interface PortalState {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // Theme
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;

  // Village
  selectedVillage: Village | null;
  setSelectedVillage: (village: Village | null) => void;

  // Live Visitors Counter (simulated)
  liveVisitors: number;
  incrementVisitors: () => void;

  // UI State
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  
  isLocationDetecting: boolean;
  setLocationDetecting: (detecting: boolean) => void;
}

export const useStore = create<PortalState>()(
  persist(
    (set, get) => ({
      // Language - default to English
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),

      // Theme - check for active festival
      theme: getCurrentFestivalTheme().id,
      setTheme: (theme) => set({ theme }),

      // Village - default to first village
      selectedVillage: villages[0],
      setSelectedVillage: (village) => set({ selectedVillage: village }),

      // Live Visitors
      liveVisitors: Math.floor(Math.random() * 50) + 100,
      incrementVisitors: () => set((state) => ({ 
        liveVisitors: state.liveVisitors + Math.floor(Math.random() * 3) - 1 
      })),

      // UI State
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
      
      isLocationDetecting: false,
      setLocationDetecting: (detecting) => set({ isLocationDetecting: detecting }),
    }),
    {
      name: 'village-portal-storage',
      partialize: (state) => ({
        language: state.language,
        theme: state.theme,
        selectedVillage: state.selectedVillage,
      }),
    }
  )
);
