import { MainLayout } from '@/components/layout/MainLayout';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TrendingUp, TrendingDown, Minus, Search, Wheat, Package, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';

interface MarketPrice {
  id: string;
  commodity: string;
  commodityHi: string;
  commodityGu: string;
  unit: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  marketName: string;
  date: string;
  trend: 'up' | 'down' | 'stable';
  category: 'grains' | 'vegetables' | 'fruits' | 'pulses' | 'oilseeds';
}

const marketData: MarketPrice[] = [
  { id: '1', commodity: 'Wheat', commodityHi: 'गेहूं', commodityGu: 'ઘઉં', unit: 'Quintal', minPrice: 2200, maxPrice: 2500, modalPrice: 2350, marketName: 'Rajkot APMC', date: '2024-12-18', trend: 'up', category: 'grains' },
  { id: '2', commodity: 'Rice (Basmati)', commodityHi: 'चावल (बासमती)', commodityGu: 'ચોખા (બાસમતી)', unit: 'Quintal', minPrice: 4500, maxPrice: 5200, modalPrice: 4800, marketName: 'Ahmedabad APMC', date: '2024-12-18', trend: 'stable', category: 'grains' },
  { id: '3', commodity: 'Cotton', commodityHi: 'कपास', commodityGu: 'કપાસ', unit: 'Quintal', minPrice: 6800, maxPrice: 7200, modalPrice: 7000, marketName: 'Rajkot APMC', date: '2024-12-18', trend: 'down', category: 'oilseeds' },
  { id: '4', commodity: 'Groundnut', commodityHi: 'मूंगफली', commodityGu: 'સીંગદાણા', unit: 'Quintal', minPrice: 5500, maxPrice: 6000, modalPrice: 5750, marketName: 'Junagadh APMC', date: '2024-12-18', trend: 'up', category: 'oilseeds' },
  { id: '5', commodity: 'Onion', commodityHi: 'प्याज', commodityGu: 'ડુંગળી', unit: 'Quintal', minPrice: 1200, maxPrice: 1800, modalPrice: 1500, marketName: 'Rajkot APMC', date: '2024-12-18', trend: 'down', category: 'vegetables' },
  { id: '6', commodity: 'Potato', commodityHi: 'आलू', commodityGu: 'બટાકા', unit: 'Quintal', minPrice: 800, maxPrice: 1200, modalPrice: 1000, marketName: 'Ahmedabad APMC', date: '2024-12-18', trend: 'stable', category: 'vegetables' },
  { id: '7', commodity: 'Tomato', commodityHi: 'टमाटर', commodityGu: 'ટામેટાં', unit: 'Quintal', minPrice: 1500, maxPrice: 2200, modalPrice: 1850, marketName: 'Rajkot APMC', date: '2024-12-18', trend: 'up', category: 'vegetables' },
  { id: '8', commodity: 'Chana (Chickpeas)', commodityHi: 'चना', commodityGu: 'ચણા', unit: 'Quintal', minPrice: 4800, maxPrice: 5200, modalPrice: 5000, marketName: 'Junagadh APMC', date: '2024-12-18', trend: 'stable', category: 'pulses' },
  { id: '9', commodity: 'Moong Dal', commodityHi: 'मूंग दाल', commodityGu: 'મગ દાળ', unit: 'Quintal', minPrice: 7500, maxPrice: 8200, modalPrice: 7800, marketName: 'Ahmedabad APMC', date: '2024-12-18', trend: 'up', category: 'pulses' },
  { id: '10', commodity: 'Banana', commodityHi: 'केला', commodityGu: 'કેળા', unit: 'Quintal', minPrice: 1000, maxPrice: 1500, modalPrice: 1250, marketName: 'Rajkot APMC', date: '2024-12-18', trend: 'down', category: 'fruits' },
  { id: '11', commodity: 'Mango (Kesar)', commodityHi: 'आम (केसर)', commodityGu: 'કેરી (કેસર)', unit: 'Quintal', minPrice: 8000, maxPrice: 12000, modalPrice: 10000, marketName: 'Junagadh APMC', date: '2024-12-18', trend: 'stable', category: 'fruits' },
  { id: '12', commodity: 'Cumin', commodityHi: 'जीरा', commodityGu: 'જીરું', unit: 'Quintal', minPrice: 35000, maxPrice: 42000, modalPrice: 38500, marketName: 'Rajkot APMC', date: '2024-12-18', trend: 'up', category: 'oilseeds' },
];

const nearbyMarkets = [
  { name: 'Rajkot APMC', distance: '15 km', timing: '6:00 AM - 2:00 PM' },
  { name: 'Junagadh APMC', distance: '45 km', timing: '7:00 AM - 3:00 PM' },
  { name: 'Ahmedabad APMC', distance: '200 km', timing: '6:00 AM - 4:00 PM' },
];

const Market = () => {
  const { language } = useStore();
  const t = getTranslation(language);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const titles = {
    en: 'Offline Market for Farmers',
    hi: 'किसानों के लिए ऑफलाइन मंडी',
    gu: 'ખેડૂતો માટે ઓફલાઇન માર્કેટ',
  };

  const subtitles = {
    en: 'Real-time commodity prices from nearby agricultural markets (APMC)',
    hi: 'नजदीकी कृषि मंडियों (APMC) से वास्तविक समय कमोडिटी की कीमतें',
    gu: 'નજીકની કૃષિ બજારો (APMC) માંથી રીઅલ-ટાઇમ કોમોડિટી ભાવો',
  };

  const nearbyMarketsTitle = {
    en: 'Nearby Markets',
    hi: 'नजदीकी मंडियां',
    gu: 'નજીકની બજારો',
  };

  const todayPrices = {
    en: "Today's Prices",
    hi: 'आज के भाव',
    gu: 'આજના ભાવ',
  };

  const getCommodityName = (item: MarketPrice) => {
    if (language === 'hi') return item.commodityHi;
    if (language === 'gu') return item.commodityGu;
    return item.commodity;
  };

  const filteredData = marketData.filter(item => {
    const matchesSearch = getCommodityName(item).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-success" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const categories = [
    { value: 'all', label: language === 'hi' ? 'सभी' : language === 'gu' ? 'બધા' : 'All' },
    { value: 'grains', label: language === 'hi' ? 'अनाज' : language === 'gu' ? 'અનાજ' : 'Grains' },
    { value: 'vegetables', label: language === 'hi' ? 'सब्जियां' : language === 'gu' ? 'શાકભાજી' : 'Vegetables' },
    { value: 'fruits', label: language === 'hi' ? 'फल' : language === 'gu' ? 'ફળ' : 'Fruits' },
    { value: 'pulses', label: language === 'hi' ? 'दालें' : language === 'gu' ? 'કઠોળ' : 'Pulses' },
    { value: 'oilseeds', label: language === 'hi' ? 'तिलहन' : language === 'gu' ? 'તેલીબિયાં' : 'Oilseeds' },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-success/10 via-background to-primary/10">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-success/20 text-success px-4 py-2 rounded-full mb-4">
              <Wheat className="h-5 w-5" />
              <span className="font-medium">APMC Market Rates</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">{titles[language]}</h1>
            <p className="text-lg text-muted-foreground mb-8">{subtitles[language]}</p>
            
            <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date().toLocaleDateString(language === 'hi' ? 'hi-IN' : language === 'gu' ? 'gu-IN' : 'en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Markets */}
      <section className="py-8 border-b border-border">
        <div className="container">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            {nearbyMarketsTitle[language]}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {nearbyMarkets.map((market, index) => (
              <Card key={index} variant="glass">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground">{market.name}</h3>
                  <p className="text-sm text-muted-foreground">{market.distance} • {market.timing}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Price Table */}
      <section className="py-12">
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={t.common.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategoryFilter(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    categoryFilter === cat.value 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                {todayPrices[language]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{language === 'hi' ? 'कमोडिटी' : language === 'gu' ? 'કોમોડિટી' : 'Commodity'}</TableHead>
                      <TableHead>{language === 'hi' ? 'इकाई' : language === 'gu' ? 'એકમ' : 'Unit'}</TableHead>
                      <TableHead className="text-right">{language === 'hi' ? 'न्यूनतम' : language === 'gu' ? 'લઘુત્તમ' : 'Min'}</TableHead>
                      <TableHead className="text-right">{language === 'hi' ? 'अधिकतम' : language === 'gu' ? 'મહત્તમ' : 'Max'}</TableHead>
                      <TableHead className="text-right">{language === 'hi' ? 'मॉडल' : language === 'gu' ? 'મોડલ' : 'Modal'}</TableHead>
                      <TableHead>{language === 'hi' ? 'बाजार' : language === 'gu' ? 'બજાર' : 'Market'}</TableHead>
                      <TableHead>{language === 'hi' ? 'रुझान' : language === 'gu' ? 'ટ્રેન્ડ' : 'Trend'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{getCommodityName(item)}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell className="text-right">₹{item.minPrice.toLocaleString()}</TableCell>
                        <TableCell className="text-right">₹{item.maxPrice.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-semibold">₹{item.modalPrice.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{item.marketName}</Badge>
                        </TableCell>
                        <TableCell>
                          <TrendIcon trend={item.trend} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredData.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">{t.common.noResults}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </MainLayout>
  );
};

export default Market;
