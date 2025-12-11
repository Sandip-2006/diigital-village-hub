import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { Badge } from '@/components/ui/badge';
import { Megaphone, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Announcement {
  id: string;
  title: string;
  titleHi: string;
  titleGu: string;
  category: 'urgent' | 'info' | 'event' | 'scheme';
  date: string;
}

const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Water supply will be disrupted on Dec 15 for maintenance work',
    titleHi: '15 दिसंबर को रखरखाव कार्य के लिए पानी की आपूर्ति बाधित रहेगी',
    titleGu: '15 ડિસેમ્બરે જાળવણી કાર્ય માટે પાણી પુરવઠો ખોરવાશે',
    category: 'urgent',
    date: '2024-12-10',
  },
  {
    id: '2',
    title: 'PM Kisan Yojana installment released - Check your account',
    titleHi: 'पीएम किसान योजना की किस्त जारी - अपना खाता जांचें',
    titleGu: 'પીએમ કિસાન યોજનાનો હપ્તો જારી - તમારું ખાતું તપાસો',
    category: 'scheme',
    date: '2024-12-09',
  },
  {
    id: '3',
    title: 'Gram Sabha meeting scheduled for December 20, 2024 at 10 AM',
    titleHi: 'ग्राम सभा की बैठक 20 दिसंबर 2024 को सुबह 10 बजे निर्धारित',
    titleGu: 'ગ્રામ સભા બેઠક 20 ડિસેમ્બર 2024ના રોજ સવારે 10 વાગ્યે નિર્ધારિત',
    category: 'event',
    date: '2024-12-08',
  },
  {
    id: '4',
    title: 'New road construction work starts from next week',
    titleHi: 'अगले सप्ताह से नई सड़क निर्माण कार्य शुरू',
    titleGu: 'આવતા અઠવાડિયેથી નવા રોડ નિર્માણ કાર્ય શરૂ',
    category: 'info',
    date: '2024-12-07',
  },
];

const categoryColors = {
  urgent: 'destructive',
  info: 'info',
  event: 'secondary',
  scheme: 'success',
} as const;

export function AnnouncementTicker() {
  const { language } = useStore();
  const t = getTranslation(language);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getTitle = (a: Announcement) => {
    switch (language) {
      case 'hi': return a.titleHi;
      case 'gu': return a.titleGu;
      default: return a.title;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = announcements[currentIndex];

  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-y border-border/50">
      <div className="container py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Megaphone className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold text-sm text-foreground hidden sm:inline">
              {t.home.latestAnnouncements}
            </span>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <div 
              className="flex items-center gap-3 animate-fade-in"
              key={current.id}
            >
              <Badge variant={categoryColors[current.category]} className="flex-shrink-0 capitalize">
                {current.category}
              </Badge>
              <p className="text-sm text-foreground truncate">
                {getTitle(current)}
              </p>
            </div>
          </div>

          <button className="flex items-center gap-1 text-sm text-primary hover:underline flex-shrink-0">
            {t.common.viewAll}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mt-2">
          {announcements.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-6 bg-primary' : 'w-1.5 bg-primary/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
