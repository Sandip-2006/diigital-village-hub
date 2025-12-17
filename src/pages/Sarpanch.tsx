import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { mockSarpanch } from '@/lib/mockData';
import { Phone, Mail, Calendar, Award, MessageCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sarpanch = () => {
  const { language } = useStore();
  const sarpanch = mockSarpanch;

  const getName = () => language === 'hi' ? sarpanch.nameHi : language === 'gu' ? sarpanch.nameGu : sarpanch.name;
  const getBio = () => language === 'hi' ? sarpanch.bioHi : language === 'gu' ? sarpanch.bioGu : sarpanch.bio;

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Back Button */}
        <Link to="/directory">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            {language === 'hi' ? 'वापस जाएं' : language === 'gu' ? 'પાછા જાઓ' : 'Back to Directory'}
          </Button>
        </Link>

        {/* Main Profile Card */}
        <Card variant="glass" className="overflow-hidden mb-8">
          <div className="h-40 bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20" />
          <CardContent className="relative px-6 pb-8">
            <div className="flex flex-col md:flex-row gap-6 -mt-20">
              {/* Photo */}
              <div className="mx-auto md:mx-0">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-card shadow-xl">
                  <img 
                    src={sarpanch.photo} 
                    alt={getName()}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left pt-4 md:pt-10">
                <Badge variant="festival" className="mb-3">
                  {language === 'hi' ? 'सरपंच' : language === 'gu' ? 'સરપંચ' : 'Sarpanch'}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {getName()}
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {language === 'hi' ? 'कार्यकाल' : language === 'gu' ? 'કાર્યકાળ' : 'Term'}: {sarpanch.termStart} - {sarpanch.termEnd}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Button className="gap-2" asChild>
                    <a href={`tel:${sarpanch.phone}`}>
                      <Phone className="h-4 w-4" />
                      {language === 'hi' ? 'कॉल करें' : language === 'gu' ? 'કૉલ કરો' : 'Call Now'}
                    </a>
                  </Button>
                  <Button variant="outline" className="gap-2" asChild>
                    <a href={`mailto:${sarpanch.email}`}>
                      <Mail className="h-4 w-4" />
                      {language === 'hi' ? 'ईमेल' : language === 'gu' ? 'ઇમેઇલ' : 'Email'}
                    </a>
                  </Button>
                  <Button variant="secondary" className="gap-2" asChild>
                    <a href={`https://wa.me/${sarpanch.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* About Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                {language === 'hi' ? 'परिचय' : language === 'gu' ? 'પરિચય' : 'About'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {getBio()}
              </p>
            </CardContent>
          </Card>

          {/* Achievements Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                {language === 'hi' ? 'उपलब्धियाँ' : language === 'gu' ? 'સિદ્ધિઓ' : 'Achievements'}
              </h2>
              <ul className="space-y-3">
                {sarpanch.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <span className="text-muted-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                {language === 'hi' ? 'संपर्क विवरण' : language === 'gu' ? 'સંપર્ક વિગતો' : 'Contact Details'}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'hi' ? 'फोन' : language === 'gu' ? 'ફોન' : 'Phone'}
                    </p>
                    <p className="font-medium text-foreground">{sarpanch.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'hi' ? 'ईमेल' : language === 'gu' ? 'ઇમેઇલ' : 'Email'}
                    </p>
                    <p className="font-medium text-foreground">{sarpanch.email}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Sarpanch;
