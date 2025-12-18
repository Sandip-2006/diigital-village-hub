import { MainLayout } from '@/components/layout/MainLayout';
import { useStore } from '@/store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Building2, 
  Users, 
  Target, 
  Eye, 
  Phone, 
  Mail,
  MapPin,
  Calendar,
  Award
} from 'lucide-react';

interface Officer {
  id: string;
  name: string;
  nameHi: string;
  nameGu: string;
  designation: string;
  designationHi: string;
  designationGu: string;
  photo: string;
  phone: string;
  email: string;
}

const officers: Officer[] = [
  {
    id: '1',
    name: 'Shri Rajesh Kumar',
    nameHi: 'श्री राजेश कुमार',
    nameGu: 'શ્રી રાજેશ કુમાર',
    designation: 'Taluka Development Officer (TDO)',
    designationHi: 'तालुका विकास अधिकारी (TDO)',
    designationGu: 'તાલુકા વિકાસ અધિકારી (TDO)',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    phone: '+91 98765 00001',
    email: 'tdo@taluka.gov.in',
  },
  {
    id: '2',
    name: 'Shri Mahesh Patel',
    nameHi: 'श्री महेश पटेल',
    nameGu: 'શ્રી મહેશ પટેલ',
    designation: 'Block Development Officer (BDO)',
    designationHi: 'खंड विकास अधिकारी (BDO)',
    designationGu: 'બ્લોક વિકાસ અધિકારી (BDO)',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    phone: '+91 98765 00002',
    email: 'bdo@taluka.gov.in',
  },
  {
    id: '3',
    name: 'Smt. Priya Sharma',
    nameHi: 'श्रीमती प्रिया शर्मा',
    nameGu: 'શ્રીમતી પ્રિયા શર્મા',
    designation: 'Assistant Development Officer',
    designationHi: 'सहायक विकास अधिकारी',
    designationGu: 'મદદનીશ વિકાસ અધિકારી',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    phone: '+91 98765 00003',
    email: 'ado@taluka.gov.in',
  },
  {
    id: '4',
    name: 'Shri Vikram Singh',
    nameHi: 'श्री विक्रम सिंह',
    nameGu: 'શ્રી વિક્રમ સિંહ',
    designation: 'Extension Officer (Agriculture)',
    designationHi: 'विस्तार अधिकारी (कृषि)',
    designationGu: 'એક્સટેન્શન ઓફિસર (કૃષિ)',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    phone: '+91 98765 00004',
    email: 'eo.agri@taluka.gov.in',
  },
];

const stats = [
  { label: 'Villages', labelHi: 'गाँव', labelGu: 'ગામો', value: '42' },
  { label: 'Population', labelHi: 'जनसंख्या', labelGu: 'વસ્તી', value: '1,25,000' },
  { label: 'Area (sq km)', labelHi: 'क्षेत्रफल (वर्ग किमी)', labelGu: 'વિસ્તાર (ચો.કિ.મી.)', value: '856' },
  { label: 'Gram Panchayats', labelHi: 'ग्राम पंचायतें', labelGu: 'ગ્રામ પંચાયતો', value: '35' },
];

const Taluka = () => {
  const { language } = useStore();

  const titles = {
    en: 'Taluka Panchayat',
    hi: 'तालुका पंचायत',
    gu: 'તાલુકા પંચાયત',
  };

  const vision = {
    en: {
      title: 'Our Vision',
      content: 'To transform our taluka into a model of sustainable rural development through digital innovation, transparent governance, and community participation.',
    },
    hi: {
      title: 'हमारी दृष्टि',
      content: 'डिजिटल नवाचार, पारदर्शी शासन और सामुदायिक भागीदारी के माध्यम से हमारे तालुके को सतत ग्रामीण विकास का एक मॉडल बनाना।',
    },
    gu: {
      title: 'અમારું વિઝન',
      content: 'ડિજિટલ ઈનોવેશન, પારદર્શક ગવર્નન્સ અને સમુદાયની ભાગીદારી દ્વારા અમારા તાલુકાને ટકાઉ ગ્રામીણ વિકાસના મોડેલમાં પરિવર્તિત કરવું.',
    },
  };

  const mission = {
    en: {
      title: 'Our Mission',
      content: 'To deliver efficient, citizen-centric services, promote inclusive growth, and ensure equitable distribution of resources for the welfare of all residents.',
    },
    hi: {
      title: 'हमारा मिशन',
      content: 'कुशल, नागरिक-केंद्रित सेवाएं प्रदान करना, समावेशी विकास को बढ़ावा देना और सभी निवासियों के कल्याण के लिए संसाधनों का समान वितरण सुनिश्चित करना।',
    },
    gu: {
      title: 'અમારું મિશન',
      content: 'કાર્યક્ષમ, નાગરિક-કેન્દ્રિત સેવાઓ પ્રદાન કરવી, સમાવેશી વિકાસને પ્રોત્સાહન આપવું અને તમામ રહેવાસીઓના કલ્યાણ માટે સંસાધનોનું સમાન વિતરણ સુનિશ્ચિત કરવું.',
    },
  };

  const officersTitle = {
    en: 'Key Officers',
    hi: 'प्रमुख अधिकारी',
    gu: 'મુખ્ય અધિકારીઓ',
  };

  const orgTitle = {
    en: 'Organization Structure',
    hi: 'संगठनात्मक संरचना',
    gu: 'સંગઠનાત્મક માળખું',
  };

  const getName = (officer: Officer) => {
    if (language === 'hi') return officer.nameHi;
    if (language === 'gu') return officer.nameGu;
    return officer.name;
  };

  const getDesignation = (officer: Officer) => {
    if (language === 'hi') return officer.designationHi;
    if (language === 'gu') return officer.designationGu;
    return officer.designation;
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/20 text-primary border-0">
              <Building2 className="h-4 w-4 mr-1" />
              {language === 'hi' ? 'तालुका पंचायत' : language === 'gu' ? 'તાલુકા પંચાયત' : 'Taluka Panchayat'}
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">{titles[language]}</h1>
            <p className="text-lg text-muted-foreground">
              {language === 'hi' 
                ? 'जनकल्याण और विकास के लिए समर्पित' 
                : language === 'gu' 
                ? 'જનકલ્યાણ અને વિકાસ માટે સમર્પિત'
                : 'Dedicated to public welfare and development'}
            </p>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {stats.map((stat, index) => (
              <Card key={index} variant="glass" className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === 'hi' ? stat.labelHi : language === 'gu' ? stat.labelGu : stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <Card variant="interactive" className="overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  {vision[language].title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {vision[language].content}
                </p>
              </CardContent>
            </Card>

            <Card variant="interactive" className="overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-secondary" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-secondary" />
                  {mission[language].title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {mission[language].content}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Officers */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            {officersTitle[language]}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {officers.map((officer) => (
              <Card key={officer.id} variant="interactive" className="text-center">
                <CardContent className="pt-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                    <AvatarImage src={officer.photo} alt={getName(officer)} />
                    <AvatarFallback>{getName(officer).charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-foreground">{getName(officer)}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{getDesignation(officer)}</p>
                  <div className="space-y-2 text-sm">
                    <a 
                      href={`tel:${officer.phone}`} 
                      className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      {officer.phone}
                    </a>
                    <a 
                      href={`mailto:${officer.email}`}
                      className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      {officer.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Structure */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            {orgTitle[language]}
          </h2>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                {/* Level 1 - TDO */}
                <div className="p-4 bg-primary text-primary-foreground rounded-lg text-center mb-4 min-w-[200px]">
                  <div className="font-semibold">TDO</div>
                  <div className="text-xs opacity-80">Taluka Development Officer</div>
                </div>

                {/* Connector */}
                <div className="w-0.5 h-8 bg-border" />

                {/* Level 2 - BDO */}
                <div className="p-4 bg-secondary text-secondary-foreground rounded-lg text-center mb-4 min-w-[200px]">
                  <div className="font-semibold">BDO</div>
                  <div className="text-xs opacity-80">Block Development Officer</div>
                </div>

                {/* Connector */}
                <div className="w-0.5 h-8 bg-border" />

                {/* Level 3 - Branch */}
                <div className="relative w-full">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-8 w-[80%] border-t-2 border-l-2 border-r-2 border-border rounded-t-lg" />
                </div>

                {/* Level 3 Items */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full">
                  {['ADO', 'Extension Officer', 'Gram Sevak', 'Account Officer'].map((role, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg text-center">
                      <div className="font-medium text-sm">{role}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">
                {language === 'hi' ? 'संपर्क करें' : language === 'gu' ? 'સંપર્ક કરો' : 'Contact Us'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Taluka Panchayat Office</p>
                  <p className="text-sm text-muted-foreground">
                    Main Road, Taluka Headquarters, District - 000000
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>+91 2XXX-XXXXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>taluka.panchayat@gujarat.gov.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <span>
                  {language === 'hi' 
                    ? 'सोमवार - शनिवार: सुबह 10:00 - शाम 5:00' 
                    : language === 'gu' 
                    ? 'સોમવાર - શનિવાર: સવારે 10:00 - સાંજે 5:00'
                    : 'Monday - Saturday: 10:00 AM - 5:00 PM'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </MainLayout>
  );
};

export default Taluka;
