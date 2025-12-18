import { MainLayout } from '@/components/layout/MainLayout';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Hospital, 
  GraduationCap, 
  ShoppingBag, 
  Fuel, 
  CreditCard,
  Mail,
  Shield,
  Phone,
  Clock,
  MapPin,
  Search
} from 'lucide-react';
import { useState } from 'react';

interface Amenity {
  id: string;
  name: string;
  nameHi: string;
  nameGu: string;
  type: 'bank' | 'hospital' | 'school' | 'shop' | 'petrol_pump' | 'atm' | 'post_office' | 'police';
  address: string;
  phone?: string;
  timing?: string;
}

const amenitiesData: Amenity[] = [
  {
    id: '1',
    name: 'State Bank of India',
    nameHi: 'भारतीय स्टेट बैंक',
    nameGu: 'સ્ટેટ બેંક ઓફ ઈન્ડિયા',
    type: 'bank',
    address: 'Main Market Road, Village Center',
    phone: '+91 98765 43210',
    timing: '10:00 AM - 4:00 PM',
  },
  {
    id: '2',
    name: 'Primary Health Center',
    nameHi: 'प्राथमिक स्वास्थ्य केंद्र',
    nameGu: 'પ્રાથમિક આરોગ્ય કેન્દ્ર',
    type: 'hospital',
    address: 'Near Bus Stand',
    phone: '+91 98765 43211',
    timing: '24 Hours',
  },
  {
    id: '3',
    name: 'Government Primary School',
    nameHi: 'सरकारी प्राथमिक विद्यालय',
    nameGu: 'સરકારી પ્રાથમિક શાળા',
    type: 'school',
    address: 'School Road, West Side',
    phone: '+91 98765 43212',
    timing: '8:00 AM - 2:00 PM',
  },
  {
    id: '4',
    name: 'Kisan Seva Kendra',
    nameHi: 'किसान सेवा केंद्र',
    nameGu: 'કિસાન સેવા કેન્દ્ર',
    type: 'shop',
    address: 'Agricultural Market',
    phone: '+91 98765 43213',
    timing: '7:00 AM - 8:00 PM',
  },
  {
    id: '5',
    name: 'Indian Oil Petrol Pump',
    nameHi: 'इंडियन ऑयल पेट्रोल पंप',
    nameGu: 'ઈન્ડિયન ઓઈલ પેટ્રોલ પંપ',
    type: 'petrol_pump',
    address: 'Highway Road, Village Entrance',
    phone: '+91 98765 43214',
    timing: '6:00 AM - 10:00 PM',
  },
  {
    id: '6',
    name: 'SBI ATM',
    nameHi: 'एसबीआई एटीएम',
    nameGu: 'એસબીઆઈ એટીએમ',
    type: 'atm',
    address: 'Near Bank Building',
    timing: '24 Hours',
  },
  {
    id: '7',
    name: 'Post Office',
    nameHi: 'डाकघर',
    nameGu: 'પોસ્ટ ઓફિસ',
    type: 'post_office',
    address: 'Main Road, Village Center',
    phone: '+91 98765 43215',
    timing: '9:00 AM - 5:00 PM',
  },
  {
    id: '8',
    name: 'Police Chowki',
    nameHi: 'पुलिस चौकी',
    nameGu: 'પોલીસ ચોકી',
    type: 'police',
    address: 'Panchayat Bhawan Complex',
    phone: '100 / +91 98765 43216',
    timing: '24 Hours',
  },
  {
    id: '9',
    name: 'Higher Secondary School',
    nameHi: 'उच्च माध्यमिक विद्यालय',
    nameGu: 'ઉચ્ચ માધ્યમિક શાળા',
    type: 'school',
    address: 'Education Complex, East',
    phone: '+91 98765 43217',
    timing: '7:30 AM - 1:30 PM',
  },
  {
    id: '10',
    name: 'Shree Ram General Store',
    nameHi: 'श्री राम जनरल स्टोर',
    nameGu: 'શ્રી રામ જનરલ સ્ટોર',
    type: 'shop',
    address: 'Market Area',
    phone: '+91 98765 43218',
    timing: '8:00 AM - 9:00 PM',
  },
];

const typeConfig = {
  bank: { icon: Building2, label: 'Banks', labelHi: 'बैंक', labelGu: 'બેંકો', color: 'bg-blue-500' },
  hospital: { icon: Hospital, label: 'Healthcare', labelHi: 'स्वास्थ्य', labelGu: 'આરોગ્ય', color: 'bg-red-500' },
  school: { icon: GraduationCap, label: 'Education', labelHi: 'शिक्षा', labelGu: 'શિક્ષણ', color: 'bg-amber-500' },
  shop: { icon: ShoppingBag, label: 'Shops', labelHi: 'दुकानें', labelGu: 'દુકાનો', color: 'bg-green-500' },
  petrol_pump: { icon: Fuel, label: 'Fuel', labelHi: 'ईंधन', labelGu: 'ઈંધણ', color: 'bg-orange-500' },
  atm: { icon: CreditCard, label: 'ATMs', labelHi: 'एटीएम', labelGu: 'એટીએમ', color: 'bg-purple-500' },
  post_office: { icon: Mail, label: 'Post', labelHi: 'डाक', labelGu: 'પોસ્ટ', color: 'bg-cyan-500' },
  police: { icon: Shield, label: 'Police', labelHi: 'पुलिस', labelGu: 'પોલીસ', color: 'bg-slate-500' },
};

const Amenities = () => {
  const { language } = useStore();
  const t = getTranslation(language);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const titles = {
    en: 'Local Amenities',
    hi: 'स्थानीय सुविधाएं',
    gu: 'સ્થાનિક સુવિધાઓ',
  };

  const subtitles = {
    en: 'Find banks, hospitals, schools, and essential services near you',
    hi: 'अपने पास बैंक, अस्पताल, स्कूल और आवश्यक सेवाएं खोजें',
    gu: 'તમારી નજીક બેંકો, હોસ્પિટલો, શાળાઓ અને આવશ્યક સેવાઓ શોધો',
  };

  const filteredAmenities = amenitiesData.filter(amenity => {
    const matchesSearch = amenity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      amenity.nameHi.includes(searchQuery) ||
      amenity.nameGu.includes(searchQuery);
    const matchesTab = activeTab === 'all' || amenity.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const getName = (amenity: Amenity) => {
    if (language === 'hi') return amenity.nameHi;
    if (language === 'gu') return amenity.nameGu;
    return amenity.name;
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">{titles[language]}</h1>
            <p className="text-lg text-muted-foreground mb-8">{subtitles[language]}</p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={t.common.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-12">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {language === 'hi' ? 'सभी' : language === 'gu' ? 'બધા' : 'All'}
              </TabsTrigger>
              {Object.entries(typeConfig).map(([key, config]) => (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <config.icon className="h-4 w-4 mr-1" />
                  {language === 'hi' ? config.labelHi : language === 'gu' ? config.labelGu : config.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAmenities.map((amenity) => {
                  const config = typeConfig[amenity.type];
                  const Icon = config.icon;

                  return (
                    <Card key={amenity.id} variant="interactive" className="group">
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-xl ${config.color} text-white`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-1">{getName(amenity)}</CardTitle>
                            <Badge variant="outline" className="text-xs">
                              {language === 'hi' ? config.labelHi : language === 'gu' ? config.labelGu : config.label}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{amenity.address}</span>
                        </div>
                        {amenity.phone && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4 flex-shrink-0" />
                            <a href={`tel:${amenity.phone}`} className="hover:text-primary transition-colors">
                              {amenity.phone}
                            </a>
                          </div>
                        )}
                        {amenity.timing && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>{amenity.timing}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {filteredAmenities.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{t.common.noResults}</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>
  );
};

export default Amenities;
