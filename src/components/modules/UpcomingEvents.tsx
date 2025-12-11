import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, ArrowRight, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  titleHi: string;
  titleGu: string;
  date: string;
  time: string;
  location: string;
  type: 'meeting' | 'festival' | 'camp' | 'workshop';
  isLive?: boolean;
}

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Gram Sabha Meeting',
    titleHi: 'ग्राम सभा बैठक',
    titleGu: 'ગ્રામ સભા બેઠક',
    date: 'Dec 20, 2024',
    time: '10:00 AM',
    location: 'Panchayat Bhavan',
    type: 'meeting',
    isLive: false,
  },
  {
    id: '2',
    title: 'Health Checkup Camp',
    titleHi: 'स्वास्थ्य जांच शिविर',
    titleGu: 'આરોગ્ય તપાસ કેમ્પ',
    date: 'Dec 22, 2024',
    time: '9:00 AM',
    location: 'Primary Health Center',
    type: 'camp',
  },
  {
    id: '3',
    title: 'Digital Literacy Workshop',
    titleHi: 'डिजिटल साक्षरता कार्यशाला',
    titleGu: 'ડિજિટલ સાક્ષરતા વર્કશોપ',
    date: 'Dec 25, 2024',
    time: '2:00 PM',
    location: 'Community Hall',
    type: 'workshop',
  },
];

const typeColors = {
  meeting: 'default',
  festival: 'festival',
  camp: 'success',
  workshop: 'info',
} as const;

export function UpcomingEvents() {
  const { language } = useStore();
  const t = getTranslation(language);

  const getTitle = (e: Event) => {
    switch (language) {
      case 'hi': return e.titleHi;
      case 'gu': return e.titleGu;
      default: return e.title;
    }
  };

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{t.home.upcomingEvents}</h2>
            <p className="text-muted-foreground mt-1">Don't miss important village gatherings</p>
          </div>
          <Link to="/events">
            <Button variant="outline" className="gap-2">
              {t.common.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <Card 
              key={event.id}
              variant="interactive"
              className="group animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant={typeColors[event.type]} className="capitalize">
                    {event.type}
                  </Badge>
                  {event.isLive && (
                    <Badge variant="destructive" className="gap-1 animate-pulse">
                      <Video className="h-3 w-3" />
                      LIVE
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg mt-3 group-hover:text-primary transition-colors">
                  {getTitle(event)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{event.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
