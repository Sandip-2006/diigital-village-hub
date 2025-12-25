import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store/useStore';
import { mockEvents, mockGallery } from '@/lib/mockData';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  ArrowLeft, 
  Share2, 
  Phone,
  Navigation
} from 'lucide-react';
import { toast } from 'sonner';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language, selectedVillage } = useStore();

  const event = mockEvents.find((e) => e.id === id);
  
  // Get related gallery images
  const relatedImages = mockGallery.filter(
    (g) => g.category === 'events' && (!selectedVillage || g.villageId === selectedVillage.id)
  ).slice(0, 4);

  const translations = {
    en: {
      backToEvents: 'Back to Events',
      eventDetails: 'Event Details',
      dateTime: 'Date & Time',
      venue: 'Venue',
      organizer: 'Organizer',
      description: 'Description',
      getDirections: 'Get Directions',
      shareEvent: 'Share Event',
      contact: 'Contact',
      relatedPhotos: 'Related Photos',
      notFound: 'Event not found',
      notFoundDesc: 'The event you are looking for does not exist.',
    },
    hi: {
      backToEvents: 'आयोजनों पर वापस',
      eventDetails: 'आयोजन विवरण',
      dateTime: 'तारीख और समय',
      venue: 'स्थान',
      organizer: 'आयोजक',
      description: 'विवरण',
      getDirections: 'दिशा-निर्देश प्राप्त करें',
      shareEvent: 'आयोजन साझा करें',
      contact: 'संपर्क',
      relatedPhotos: 'संबंधित तस्वीरें',
      notFound: 'आयोजन नहीं मिला',
      notFoundDesc: 'जो आयोजन आप खोज रहे हैं वह मौजूद नहीं है।',
    },
    gu: {
      backToEvents: 'ઇવેન્ટ્સ પર પાછા',
      eventDetails: 'ઇવેન્ટ વિગતો',
      dateTime: 'તારીખ અને સમય',
      venue: 'સ્થળ',
      organizer: 'આયોજક',
      description: 'વર્ણન',
      getDirections: 'દિશાઓ મેળવો',
      shareEvent: 'ઇવેન્ટ શેર કરો',
      contact: 'સંપર્ક',
      relatedPhotos: 'સંબંધિત ફોટા',
      notFound: 'ઇવેન્ટ મળી નથી',
      notFoundDesc: 'તમે જે ઇવેન્ટ શોધી રહ્યા છો તે અસ્તિત્વમાં નથી.',
    },
  };

  const text = translations[language as keyof typeof translations] || translations.en;

  const getTitle = () => {
    if (!event) return '';
    return language === 'hi' ? event.titleHi : language === 'gu' ? event.titleGu : event.title;
  };

  const categoryLabels: Record<string, { en: string; hi: string; gu: string; color: string }> = {
    cultural: { en: 'Cultural', hi: 'सांस्कृतिक', gu: 'સાંસ્કૃતિક', color: 'bg-purple-500/10 text-purple-600' },
    religious: { en: 'Religious', hi: 'धार्मिक', gu: 'ધાર્મિક', color: 'bg-orange-500/10 text-orange-600' },
    sports: { en: 'Sports', hi: 'खेल', gu: 'રમતગમત', color: 'bg-green-500/10 text-green-600' },
    government: { en: 'Government', hi: 'सरकारी', gu: 'સરકારી', color: 'bg-blue-500/10 text-blue-600' },
    educational: { en: 'Educational', hi: 'शैक्षिक', gu: 'શૈક્ષણિક', color: 'bg-teal-500/10 text-teal-600' },
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : language === 'gu' ? 'gu-IN' : 'en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: getTitle(),
        text: event?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (!event) {
    return (
      <MainLayout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">{text.notFound}</h1>
          <p className="text-muted-foreground mb-8">{text.notFoundDesc}</p>
          <Link to="/events">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {text.backToEvents}
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const category = categoryLabels[event.category] || categoryLabels.cultural;

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Back Button */}
        <Link to="/events" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          {text.backToEvents}
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            {event.image && (
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <img 
                  src={event.image} 
                  alt={getTitle()}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={category.color}>
                    {category[language as keyof typeof category] || category.en}
                  </Badge>
                </div>
              </div>
            )}

            {/* Title */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {getTitle()}
              </h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(event.date)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {event.time}
                </span>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>{text.description}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Join us for this wonderful event that brings our community together. 
                  Experience the rich cultural heritage and traditions of our village. 
                  All villagers are welcome to participate and celebrate with us.
                </p>
              </CardContent>
            </Card>

            {/* Related Photos */}
            {relatedImages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>{text.relatedPhotos}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedImages.map((img) => (
                      <div key={img.id} className="aspect-square rounded-lg overflow-hidden">
                        <img 
                          src={img.image} 
                          alt={img.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>{text.eventDetails}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date & Time */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{text.dateTime}</p>
                    <p className="font-medium">{formatDate(event.date)}</p>
                    <p className="text-sm">{event.time}</p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{text.venue}</p>
                    <p className="font-medium">{event.venue}</p>
                  </div>
                </div>

                {/* Organizer */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{text.organizer}</p>
                    <p className="font-medium">{event.organizer}</p>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Button className="w-full gap-2" asChild>
                    <a 
                      href={`https://www.google.com/maps/search/${encodeURIComponent(event.venue)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation className="h-4 w-4" />
                      {text.getDirections}
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full gap-2" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                    {text.shareEvent}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>{text.contact}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Panchayat Office</p>
                    <a href="tel:+917878123456" className="font-medium text-primary hover:underline">
                      +91 7878 123456
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="overflow-hidden">
              <div className="aspect-square">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58500!2d72.4323!3d24.1725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(event.venue)}!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Event Location"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventDetail;
