import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/store/useStore';
import { mockGramSabhas } from '@/lib/mockData';
import { Calendar, Clock, MapPin, Users, Video, FileText, ChevronRight, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const GramSabha = () => {
  const { language, selectedVillage } = useStore();

  const gramSabhas = mockGramSabhas.filter(gs => !selectedVillage || gs.villageId === selectedVillage.id);
  const upcoming = gramSabhas.filter(gs => gs.status === 'upcoming' || gs.status === 'ongoing');
  const past = gramSabhas.filter(gs => gs.status === 'completed');

  const getTitle = (gs: typeof gramSabhas[0]) =>
    language === 'hi' ? gs.titleHi : language === 'gu' ? gs.titleGu : gs.title;

  const statusColors = {
    upcoming: 'bg-info/20 text-info',
    ongoing: 'bg-success/20 text-success animate-pulse',
    completed: 'bg-muted text-muted-foreground',
  };

  const statusLabels = {
    upcoming: { en: 'Upcoming', hi: 'आगामी', gu: 'આગામી' },
    ongoing: { en: 'Live Now', hi: 'अभी लाइव', gu: 'હમણાં લાઇવ' },
    completed: { en: 'Completed', hi: 'पूर्ण', gu: 'પૂર્ણ' },
  };

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {language === 'hi' ? 'ग्राम सभा' : language === 'gu' ? 'ગ્રામ સભા' : 'Gram Sabha'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'hi' ? 'गाँव की बैठकें और निर्णय' : 
             language === 'gu' ? 'ગામની બેઠકો અને નિર્ણયો' : 'Village meetings and decisions'}
          </p>
        </div>

        {/* Live Banner */}
        {upcoming.some(gs => gs.status === 'ongoing') && (
          <Card variant="festival" className="mb-6 border-success/50 animate-pulse-glow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                    <Video className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <Badge className="bg-success/20 text-success mb-1">
                      {statusLabels.ongoing[language as keyof typeof statusLabels.ongoing]}
                    </Badge>
                    <h3 className="text-lg font-semibold text-foreground">
                      {language === 'hi' ? 'ग्राम सभा अभी लाइव है!' : 
                       language === 'gu' ? 'ગ્રામ સભા હમણાં લાઇવ છે!' : 'Gram Sabha is Live Now!'}
                    </h3>
                  </div>
                </div>
                <Button className="gap-2">
                  <Video className="h-4 w-4" />
                  {language === 'hi' ? 'लाइव देखें' : language === 'gu' ? 'લાઇવ જુઓ' : 'Watch Live'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notification Banner */}
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex items-center gap-4">
            <Bell className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground flex-1">
              {language === 'hi' ? 'अगली ग्राम सभा की सूचना प्राप्त करने के लिए WhatsApp पर सदस्यता लें' : 
               language === 'gu' ? 'આગલી ગ્રામ સભાની સૂચના મેળવવા WhatsApp પર સબ્સ્ક્રાઇબ કરો' : 
               'Subscribe on WhatsApp to get notifications for the next Gram Sabha'}
            </p>
            <Link to="/whatsapp">
              <Button variant="outline" size="sm">
                {language === 'hi' ? 'सदस्यता लें' : language === 'gu' ? 'સબ્સ્ક્રાઇબ કરો' : 'Subscribe'}
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">
              {language === 'hi' ? 'आगामी' : language === 'gu' ? 'આગામી' : 'Upcoming'}
              {upcoming.length > 0 && (
                <Badge variant="secondary" className="ml-2">{upcoming.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="past">
              {language === 'hi' ? 'पिछली' : language === 'gu' ? 'પાછલી' : 'Past'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="space-y-4">
              {upcoming.map((gs) => (
                <Card key={gs.id} variant="interactive" className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={statusColors[gs.status]}>
                            {statusLabels[gs.status][language as keyof typeof statusLabels.upcoming]}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {getTitle(gs)}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {gs.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {gs.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {gs.venue}
                          </span>
                        </div>

                        {/* Agenda */}
                        <div className="mt-4">
                          <p className="text-sm font-medium text-foreground mb-2">
                            {language === 'hi' ? 'एजेंडा' : language === 'gu' ? 'એજન્ડા' : 'Agenda'}:
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {gs.agenda.map((item, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <ChevronRight className="h-3 w-3 text-primary" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {gs.livestreamUrl && (
                          <Button className="gap-2">
                            <Video className="h-4 w-4" />
                            {gs.status === 'ongoing' 
                              ? (language === 'hi' ? 'लाइव देखें' : language === 'gu' ? 'લાઇવ જુઓ' : 'Watch Live')
                              : (language === 'hi' ? 'याद दिलाएं' : language === 'gu' ? 'યાદ કરાવો' : 'Set Reminder')}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {upcoming.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    {language === 'hi' ? 'कोई आगामी बैठक नहीं' : 
                     language === 'gu' ? 'કોઈ આગામી બેઠક નથી' : 'No upcoming meetings'}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="space-y-4">
              {past.map((gs) => (
                <Card key={gs.id} className="border-muted">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <Badge className={statusColors[gs.status]} variant="outline">
                          {statusLabels[gs.status][language as keyof typeof statusLabels.completed]}
                        </Badge>
                        <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">
                          {getTitle(gs)}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {gs.date}
                          </span>
                          {gs.attendees && (
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {gs.attendees} {language === 'hi' ? 'उपस्थित' : language === 'gu' ? 'હાજર' : 'attended'}
                            </span>
                          )}
                        </div>
                      </div>
                      {gs.minutes && (
                        <Button variant="outline" className="gap-2">
                          <FileText className="h-4 w-4" />
                          {language === 'hi' ? 'कार्यवृत्त डाउनलोड' : 
                           language === 'gu' ? 'મિનિટ્સ ડાઉનલોડ' : 'Download Minutes'}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {past.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    {language === 'hi' ? 'कोई पिछली बैठक नहीं' : 
                     language === 'gu' ? 'કોઈ પાછલી બેઠક નથી' : 'No past meetings'}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default GramSabha;
