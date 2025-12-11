// Festival Theme Configuration for Digital Village Portal

export type ThemeId = 'default' | 'diwali' | 'holi' | 'navratri' | 'independence';

export interface FestivalTheme {
  id: ThemeId;
  name: string;
  nameHi: string;
  nameGu: string;
  description: string;
  className: string;
  emoji: string;
  startDate?: string; // MM-DD format
  endDate?: string;   // MM-DD format
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const festivalThemes: FestivalTheme[] = [
  {
    id: 'default',
    name: 'Default',
    nameHi: 'डिफ़ॉल्ट',
    nameGu: 'ડિફૉલ્ટ',
    description: 'Classic village portal theme with warm earth tones',
    className: '',
    emoji: '🏡',
    colors: {
      primary: '#e67525',
      secondary: '#3d7a5a',
      accent: '#f5a623',
    },
  },
  {
    id: 'diwali',
    name: 'Diwali',
    nameHi: 'दीवाली',
    nameGu: 'દિવાળી',
    description: 'Festival of Lights - Golden & Purple theme',
    className: 'theme-diwali',
    emoji: '🪔',
    startDate: '10-20',
    endDate: '11-15',
    colors: {
      primary: '#e6a525',
      secondary: '#7c3aed',
      accent: '#fbbf24',
    },
  },
  {
    id: 'holi',
    name: 'Holi',
    nameHi: 'होली',
    nameGu: 'હોળી',
    description: 'Festival of Colors - Vibrant rainbow theme',
    className: 'theme-holi',
    emoji: '🎨',
    startDate: '03-01',
    endDate: '03-31',
    colors: {
      primary: '#ec4899',
      secondary: '#06b6d4',
      accent: '#eab308',
    },
  },
  {
    id: 'navratri',
    name: 'Navratri',
    nameHi: 'नवरात्रि',
    nameGu: 'નવરાત્રી',
    description: 'Nine Nights Festival - Red, Yellow & Green',
    className: 'theme-navratri',
    emoji: '🔱',
    startDate: '09-15',
    endDate: '10-15',
    colors: {
      primary: '#dc2626',
      secondary: '#16a34a',
      accent: '#facc15',
    },
  },
  {
    id: 'independence',
    name: 'Independence Day',
    nameHi: 'स्वतंत्रता दिवस',
    nameGu: 'સ્વાતંત્ર્ય દિવસ',
    description: 'Tricolor theme for National celebrations',
    className: 'theme-independence',
    emoji: '🇮🇳',
    startDate: '08-01',
    endDate: '08-20',
    colors: {
      primary: '#ff9933',
      secondary: '#138808',
      accent: '#ffffff',
    },
  },
];

// Check if current date falls within a festival period
export const getCurrentFestivalTheme = (): FestivalTheme => {
  const now = new Date();
  const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
  const currentDay = String(now.getDate()).padStart(2, '0');
  const currentDate = `${currentMonth}-${currentDay}`;

  for (const theme of festivalThemes) {
    if (theme.startDate && theme.endDate) {
      if (currentDate >= theme.startDate && currentDate <= theme.endDate) {
        return theme;
      }
    }
  }

  return festivalThemes[0]; // Return default theme
};

export const getThemeById = (id: ThemeId): FestivalTheme => {
  return festivalThemes.find(t => t.id === id) || festivalThemes[0];
};
