import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { mockEvents } from '@/lib/mockData';
import { Calendar, Clock, MapPin, User, CalendarPlus } from 'lucide-react';

const Events = () => {
  const { language, selectedVillage } = useStore();

  const events = mockEvents.filter(e => !selectedVillage || e.villageId === selectedVillage.id);

  const getTitle = (event: typeof events[0]) =>
    language === 'hi' ? event.titleHi : language === 'gu' ? event.titleGu : event.title;

  const categoryLabels = {
    cultural: { en: 'Cultural', hi: 'सांस्कृतिक', gu: 'સાંસ્કૃતિક', color: 'bg-purple-500/20 text-purple-700' },
    religious: { en: 'Religious', hi: 'धार्मिक', gu: 'ધાર્મિક', color: 'bg-orange-500/20 text-orange-700' },
    sports: { en: 'Sports', hi: 'खेल', gu: 'રમત', color: 'bg-green-500/20 text-green-700' },
    government: { en: 'Government', hi: 'सरकारी', gu: 'સરકારી', color: 'bg-blue-500/20 text-blue-700' },
    educational: { en: 'Educational', hi: 'शैक्षणिक', gu: 'શૈક્ષણિક', color: 'bg-cyan-500/20 text-cyan-700' },
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate(),
      month: date.toLocaleString(language === 'hi' ? 'hi-IN' : language === 'gu' ? 'gu-IN' : 'en-IN', { month: 'short' }),
      year: date.getFullYear(),
    };
  };

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {language === 'hi' ? 'आयोजन' : language === 'gu' ? 'કાર્યક્રમો' : 'Events'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'hi' ? 'गाँव के आयोजन और उत्सव' : 
               language === 'gu' ? 'ગામના કાર્યક્રમો અને ઉત્સવો' : 'Village events and celebrations'}
            </p>
          </div>
          <Button className="gap-2">
            <CalendarPlus className="h-4 w-4" />
            {language === 'hi' ? 'आयोजन सुझाएं' : language === 'gu' ? 'કાર્યક્રમ સૂચવો' : 'Suggest Event'}
          </Button>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

          <div className="space-y-8">
            {events.map((event, index) => {
              const date = formatDate(event.date);
              const category = categoryLabels[event.category as keyof typeof categoryLabels];
              const isLeft = index % 2 === 0;

              return (
                <div 
                  key={event.id} 
                  className={`relative flex flex-col md:flex-row items-start gap-4 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Date Badge */}
                  <div className={`
                    flex-shrink-0 z-10 
                    md:absolute md:left-1/2 md:-translate-x-1/2
                    flex items-center justify-center
                  `}>
                    <div className="w-14 h-14 rounded-full bg-primary flex flex-col items-center justify-center text-primary-foreground shadow-lg">
                      <span className="text-lg font-bold leading-none">{date.day}</span>
                      <span className="text-[10px] uppercase">{date.month}</span>
                    </div>
                  </div>

                  {/* Event Card */}
                  <Card 
                    variant="interactive" 
                    className={`
                      flex-1 ml-10 md:ml-0 hover-lift
                      ${isLeft ? 'md:mr-[calc(50%+2rem)]' : 'md:ml-[calc(50%+2rem)]'}
                    `}
                  >
                    <CardContent className="p-0">
                      {event.image && (
                        <div className="relative h-40 overflow-hidden rounded-t-xl">
                          <img 
                            src={event.image} 
                            alt={getTitle(event)}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                          <Badge className={`absolute bottom-3 left-3 ${category.color}`}>
                            {category[language as keyof typeof category] || category.en}
                          </Badge>
                        </div>
                      )}
                      <div className="p-4">
                        {!event.image && (
                          <Badge className={`mb-2 ${category.color}`}>
                            {category[language as keyof typeof category] || category.en}
                          </Badge>
                        )}
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {getTitle(event)}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.venue}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {event.organizer}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {events.length === 0 && (
            <Card className="ml-10 md:ml-0">
              <CardContent className="p-8 text-center text-muted-foreground">
                {language === 'hi' ? 'कोई आयोजन नहीं' : 
                 language === 'gu' ? 'કોઈ કાર્યક્રમ નથી' : 'No events found'}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Events;
