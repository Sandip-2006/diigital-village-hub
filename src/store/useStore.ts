import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from '@/lib/i18n';
import { ThemeId, getCurrentFestivalTheme } from '@/lib/themes';
import { Village, villages } from '@/lib/villages';
import { UserRole } from '@/lib/mockData';

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

  // User Role (UI-level only)
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;

  // User Auth State (mock)
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;

  // User Profile
  userName: string;
  setUserName: (name: string) => void;
  linkedAccounts: {
    google: boolean;
    phone: boolean;
  };
  setLinkedAccounts: (accounts: { google: boolean; phone: boolean }) => void;

  // UI State
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  
  isLocationDetecting: boolean;
  setLocationDetecting: (detecting: boolean) => void;

  // WhatsApp Opt-in
  whatsappOptedIn: boolean;
  setWhatsappOptedIn: (opted: boolean) => void;
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

      // User Role - default to villager
      userRole: 'villager',
      setUserRole: (role) => set({ userRole: role }),

      // Auth State
      isAuthenticated: false,
      setAuthenticated: (auth) => set({ isAuthenticated: auth }),

      // User Profile
      userName: 'Guest User',
      setUserName: (name) => set({ userName: name }),
      linkedAccounts: {
        google: false,
        phone: false,
      },
      setLinkedAccounts: (accounts) => set({ linkedAccounts: accounts }),

      // UI State
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
      
      isLocationDetecting: false,
      setLocationDetecting: (detecting) => set({ isLocationDetecting: detecting }),

      // WhatsApp
      whatsappOptedIn: false,
      setWhatsappOptedIn: (opted) => set({ whatsappOptedIn: opted }),
    }),
    {
      name: 'village-portal-storage',
      partialize: (state) => ({
        language: state.language,
        theme: state.theme,
        selectedVillage: state.selectedVillage,
        userRole: state.userRole,
        isAuthenticated: state.isAuthenticated,
        userName: state.userName,
        linkedAccounts: state.linkedAccounts,
        whatsappOptedIn: state.whatsappOptedIn,
      }),
    }
  )
);
