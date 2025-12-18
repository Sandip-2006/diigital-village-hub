import { MainLayout } from '@/components/layout/MainLayout';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Navigation, Camera, Landmark, Trees, History } from 'lucide-react';
import { useState } from 'react';

interface Attraction {
  id: string;
  name: string;
  nameHi: string;
  nameGu: string;
  description: string;
  descriptionHi: string;
  descriptionGu: string;
  image: string;
  category: 'temple' | 'historical' | 'natural' | 'cultural';
  distance: string;
}

const attractionsData: Attraction[] = [
  {
    id: '1',
    name: 'Shri Hanuman Temple',
    nameHi: 'श्री हनुमान मंदिर',
    nameGu: 'શ્રી હનુમાન મંદિર',
    description: 'Ancient temple dedicated to Lord Hanuman, known for its beautiful architecture and peaceful surroundings.',
    descriptionHi: 'भगवान हनुमान को समर्पित प्राचीन मंदिर, अपनी सुंदर वास्तुकला और शांत वातावरण के लिए प्रसिद्ध।',
    descriptionGu: 'ભગવાન હનુમાનને સમર્પિત પ્રાચીન મંદિર, તેની સુંદર સ્થાપત્ય અને શાંત વાતાવરણ માટે પ્રખ્યાત.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop',
    category: 'temple',
    distance: '0.5 km',
  },
  {
    id: '2',
    name: 'Village Heritage Well',
    nameHi: 'ग्राम विरासत कुआं',
    nameGu: 'ગામ વારસો કૂવો',
    description: 'A 300-year-old stepwell showcasing traditional water conservation architecture.',
    descriptionHi: '300 साल पुराना बावड़ी जो पारंपरिक जल संरक्षण वास्तुकला को प्रदर्शित करता है।',
    descriptionGu: '300 વર્ષ જૂનો વાવ જે પરંપરાગત જળ સંરક્ષણ સ્થાપત્યને દર્શાવે છે.',
    image: 'https://images.unsplash.com/photo-1592639296346-560c37a0f711?w=600&h=400&fit=crop',
    category: 'historical',
    distance: '1 km',
  },
  {
    id: '3',
    name: 'Sunset Point Lake',
    nameHi: 'सनसेट पॉइंट झील',
    nameGu: 'સનસેટ પોઈન્ટ તળાવ',
    description: 'Beautiful natural lake perfect for evening walks and watching stunning sunsets.',
    descriptionHi: 'शाम की सैर और मनमोहक सूर्यास्त देखने के लिए एकदम सही सुंदर प्राकृतिक झील।',
    descriptionGu: 'સાંજની ચાલ અને અદભુત સૂર્યાસ્ત જોવા માટે સંપૂર્ણ સુંદર કુદરતી તળાવ.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    category: 'natural',
    distance: '2 km',
  },
  {
    id: '4',
    name: 'Folk Art Museum',
    nameHi: 'लोक कला संग्रहालय',
    nameGu: 'લોક કલા સંગ્રહાલય',
    description: 'Museum showcasing traditional crafts, textiles, and cultural artifacts of the region.',
    descriptionHi: 'क्षेत्र की पारंपरिक शिल्प, वस्त्र और सांस्कृतिक कलाकृतियों को प्रदर्शित करने वाला संग्रहालय।',
    descriptionGu: 'પ્રદેશની પરંપરાગત હસ્તકલા, કાપડ અને સાંસ્કૃતિક કલાકૃતિઓ દર્શાવતું સંગ્રહાલય.',
    image: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=600&h=400&fit=crop',
    category: 'cultural',
    distance: '0.8 km',
  },
  {
    id: '5',
    name: 'Mata Ji Temple',
    nameHi: 'माता जी मंदिर',
    nameGu: 'માતાજી મંદિર',
    description: 'Sacred hilltop temple offering panoramic views of the village and surrounding countryside.',
    descriptionHi: 'पवित्र पहाड़ी मंदिर जो गाँव और आसपास के ग्रामीण इलाकों का मनोरम दृश्य प्रदान करता है।',
    descriptionGu: 'ગામ અને આસપાસના ગ્રામીણ વિસ્તારોનું વિહંગાવલોકન આપતું પવિત્ર ટેકરી મંદિર.',
    image: 'https://images.unsplash.com/photo-1545126178-862cdb469409?w=600&h=400&fit=crop',
    category: 'temple',
    distance: '3 km',
  },
  {
    id: '6',
    name: 'Ancient Banyan Tree',
    nameHi: 'प्राचीन बरगद का पेड़',
    nameGu: 'પ્રાચીન વડલો',
    description: 'A 500-year-old banyan tree that serves as a community gathering spot.',
    descriptionHi: '500 साल पुराना बरगद का पेड़ जो सामुदायिक सभा स्थल के रूप में कार्य करता है।',
    descriptionGu: '500 વર્ષ જૂનો વડલો જે સમુદાય મેળાવડાના સ્થળ તરીકે કામ કરે છે.',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&h=400&fit=crop',
    category: 'natural',
    distance: '0.3 km',
  },
];

const categoryConfig = {
  temple: { icon: Landmark, label: 'Temples', labelHi: 'मंदिर', labelGu: 'મંદિરો', color: 'bg-orange-500' },
  historical: { icon: History, label: 'Historical', labelHi: 'ऐतिहासिक', labelGu: 'ઐતિહાસિક', color: 'bg-amber-600' },
  natural: { icon: Trees, label: 'Nature', labelHi: 'प्रकृति', labelGu: 'પ્રકૃતિ', color: 'bg-green-500' },
  cultural: { icon: Camera, label: 'Cultural', labelHi: 'सांस्कृतिक', labelGu: 'સાંસ્કૃતિક', color: 'bg-purple-500' },
};

const Attractions = () => {
  const { language } = useStore();
  const t = getTranslation(language);
  const [activeTab, setActiveTab] = useState('all');

  const titles = {
    en: 'Local Attractions',
    hi: 'स्थानीय आकर्षण',
    gu: 'સ્થાનિક આકર્ષણો',
  };

  const subtitles = {
    en: 'Explore temples, heritage sites, and natural beauty around the village',
    hi: 'गाँव के आसपास मंदिरों, विरासत स्थलों और प्राकृतिक सुंदरता का अन्वेषण करें',
    gu: 'ગામની આસપાસના મંદિરો, વારસાના સ્થળો અને કુદરતી સૌંદર્યનું અન્વેષણ કરો',
  };

  const getDirections = {
    en: 'Get Directions',
    hi: 'दिशा-निर्देश प्राप्त करें',
    gu: 'દિશા મેળવો',
  };

  const filteredAttractions = attractionsData.filter(
    attraction => activeTab === 'all' || attraction.category === activeTab
  );

  const getName = (attraction: Attraction) => {
    if (language === 'hi') return attraction.nameHi;
    if (language === 'gu') return attraction.nameGu;
    return attraction.name;
  };

  const getDescription = (attraction: Attraction) => {
    if (language === 'hi') return attraction.descriptionHi;
    if (language === 'gu') return attraction.descriptionGu;
    return attraction.description;
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">{titles[language]}</h1>
            <p className="text-lg text-muted-foreground">{subtitles[language]}</p>
          </div>
        </div>
      </section>

      {/* Attractions Grid */}
      <section className="py-12">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {language === 'hi' ? 'सभी' : language === 'gu' ? 'બધા' : 'All'}
              </TabsTrigger>
              {Object.entries(categoryConfig).map(([key, config]) => (
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
                {filteredAttractions.map((attraction) => {
                  const config = categoryConfig[attraction.category];
                  const Icon = config.icon;

                  return (
                    <Card key={attraction.id} variant="interactive" className="group overflow-hidden">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={attraction.image}
                          alt={getName(attraction)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className={`${config.color} text-white border-0`}>
                            <Icon className="h-3 w-3 mr-1" />
                            {language === 'hi' ? config.labelHi : language === 'gu' ? config.labelGu : config.label}
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge variant="glass" className="gap-1">
                            <MapPin className="h-3 w-3" />
                            {attraction.distance}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{getName(attraction)}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {getDescription(attraction)}
                        </p>
                        <Button variant="outline" className="w-full gap-2">
                          <Navigation className="h-4 w-4" />
                          {getDirections[language]}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {filteredAttractions.length === 0 && (
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

export default Attractions;
