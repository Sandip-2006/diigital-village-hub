import { MainLayout } from '@/components/layout/MainLayout';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Building, Car, Wrench, MapPin, Package, Search, Calendar, IndianRupee } from 'lucide-react';
import { useState } from 'react';

interface Asset {
  id: string;
  name: string;
  nameHi: string;
  nameGu: string;
  type: 'building' | 'vehicle' | 'equipment' | 'land' | 'furniture';
  condition: 'good' | 'fair' | 'poor' | 'critical';
  value: number;
  location: string;
  purchaseDate: string;
  lastMaintenanceDate: string;
}

const assetsData: Asset[] = [
  { id: '1', name: 'Panchayat Bhawan', nameHi: 'पंचायत भवन', nameGu: 'પંચાયત ભવન', type: 'building', condition: 'good', value: 2500000, location: 'Village Center', purchaseDate: '2018-04-15', lastMaintenanceDate: '2024-06-20' },
  { id: '2', name: 'Community Hall', nameHi: 'सामुदायिक भवन', nameGu: 'સામુદાયિક હોલ', type: 'building', condition: 'good', value: 1800000, location: 'Main Road', purchaseDate: '2015-08-10', lastMaintenanceDate: '2024-03-15' },
  { id: '3', name: 'Tractor (JCB)', nameHi: 'ट्रैक्टर (जेसीबी)', nameGu: 'ટ્રેક્ટર (JCB)', type: 'vehicle', condition: 'fair', value: 1200000, location: 'Panchayat Garage', purchaseDate: '2020-02-28', lastMaintenanceDate: '2024-09-10' },
  { id: '4', name: 'Water Tanker', nameHi: 'पानी की टंकी', nameGu: 'પાણીની ટેન્કર', type: 'vehicle', condition: 'good', value: 800000, location: 'Panchayat Garage', purchaseDate: '2021-07-12', lastMaintenanceDate: '2024-08-05' },
  { id: '5', name: 'Solar Pumps (10 units)', nameHi: 'सोलर पंप (10 इकाई)', nameGu: 'સોલાર પંપ (10 યુનિટ)', type: 'equipment', condition: 'good', value: 500000, location: 'Various Farms', purchaseDate: '2022-11-20', lastMaintenanceDate: '2024-10-15' },
  { id: '6', name: 'Computer Lab Equipment', nameHi: 'कंप्यूटर लैब उपकरण', nameGu: 'કમ્પ્યુટર લેબ સાધનો', type: 'equipment', condition: 'fair', value: 350000, location: 'Digital Center', purchaseDate: '2019-06-05', lastMaintenanceDate: '2024-04-22' },
  { id: '7', name: 'Village Playground', nameHi: 'गाँव का खेल मैदान', nameGu: 'ગામનું રમતનું મેદાન', type: 'land', condition: 'good', value: 1500000, location: 'East Side', purchaseDate: '2010-01-01', lastMaintenanceDate: '2024-07-30' },
  { id: '8', name: 'Cremation Ground', nameHi: 'श्मशान भूमि', nameGu: 'સ્મશાન ભૂમિ', type: 'land', condition: 'fair', value: 800000, location: 'South End', purchaseDate: '2005-03-20', lastMaintenanceDate: '2024-05-12' },
  { id: '9', name: 'Office Furniture Set', nameHi: 'कार्यालय फर्नीचर सेट', nameGu: 'ઓફિસ ફર્નિચર સેટ', type: 'furniture', condition: 'good', value: 150000, location: 'Panchayat Bhawan', purchaseDate: '2022-03-15', lastMaintenanceDate: '2024-01-10' },
  { id: '10', name: 'Street Light Poles (50)', nameHi: 'स्ट्रीट लाइट पोल (50)', nameGu: 'સ્ટ્રીટ લાઇટ પોલ (50)', type: 'equipment', condition: 'poor', value: 400000, location: 'Village Roads', purchaseDate: '2016-09-08', lastMaintenanceDate: '2023-12-05' },
];

const typeConfig = {
  building: { icon: Building, color: 'bg-blue-500' },
  vehicle: { icon: Car, color: 'bg-green-500' },
  equipment: { icon: Wrench, color: 'bg-orange-500' },
  land: { icon: MapPin, color: 'bg-purple-500' },
  furniture: { icon: Package, color: 'bg-cyan-500' },
};

const conditionConfig = {
  good: { label: 'Good', labelHi: 'अच्छा', labelGu: 'સારું', color: 'bg-success text-white', score: 100 },
  fair: { label: 'Fair', labelHi: 'ठीक', labelGu: 'ઠીક', color: 'bg-amber-500 text-white', score: 70 },
  poor: { label: 'Poor', labelHi: 'खराब', labelGu: 'ખરાબ', color: 'bg-orange-500 text-white', score: 40 },
  critical: { label: 'Critical', labelHi: 'गंभीर', labelGu: 'ગંભીર', color: 'bg-destructive text-white', score: 15 },
};

const Assets = () => {
  const { language } = useStore();
  const t = getTranslation(language);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const titles = {
    en: 'Asset Directory (NAD)',
    hi: 'संपत्ति निर्देशिका (NAD)',
    gu: 'એસેટ ડિરેક્ટરી (NAD)',
  };

  const subtitles = {
    en: 'National Asset Directory - Complete inventory of village infrastructure and assets',
    hi: 'राष्ट्रीय संपत्ति निर्देशिका - गाँव के बुनियादी ढांचे और संपत्तियों की पूरी सूची',
    gu: 'રાષ્ટ્રીય એસેટ ડિરેક્ટરી - ગામના ઈન્ફ્રાસ્ટ્રક્ચર અને એસેટ્સની સંપૂર્ણ ઈન્વેન્ટરી',
  };

  const getName = (asset: Asset) => {
    if (language === 'hi') return asset.nameHi;
    if (language === 'gu') return asset.nameGu;
    return asset.name;
  };

  const getConditionLabel = (condition: Asset['condition']) => {
    const config = conditionConfig[condition];
    if (language === 'hi') return config.labelHi;
    if (language === 'gu') return config.labelGu;
    return config.label;
  };

  const filteredAssets = assetsData.filter(asset => {
    const matchesSearch = getName(asset).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || asset.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalValue = assetsData.reduce((sum, asset) => sum + asset.value, 0);
  const typeBreakdown = Object.keys(typeConfig).map(type => ({
    type,
    count: assetsData.filter(a => a.type === type).length,
    value: assetsData.filter(a => a.type === type).reduce((sum, a) => sum + a.value, 0),
  }));

  const types = [
    { value: 'all', label: language === 'hi' ? 'सभी' : language === 'gu' ? 'બધા' : 'All' },
    { value: 'building', label: language === 'hi' ? 'भवन' : language === 'gu' ? 'બિલ્ડિંગ' : 'Buildings' },
    { value: 'vehicle', label: language === 'hi' ? 'वाहन' : language === 'gu' ? 'વાહન' : 'Vehicles' },
    { value: 'equipment', label: language === 'hi' ? 'उपकरण' : language === 'gu' ? 'સાધનો' : 'Equipment' },
    { value: 'land', label: language === 'hi' ? 'भूमि' : language === 'gu' ? 'જમીન' : 'Land' },
    { value: 'furniture', label: language === 'hi' ? 'फर्नीचर' : language === 'gu' ? 'ફર્નિચર' : 'Furniture' },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/20 text-primary border-0">NAD</Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">{titles[language]}</h1>
            <p className="text-lg text-muted-foreground">{subtitles[language]}</p>
          </div>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="py-8 border-b border-border">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="glass">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{assetsData.length}</div>
                <p className="text-sm text-muted-foreground">
                  {language === 'hi' ? 'कुल संपत्तियां' : language === 'gu' ? 'કુલ એસેટ્સ' : 'Total Assets'}
                </p>
              </CardContent>
            </Card>
            <Card variant="glass">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-success flex items-center justify-center gap-1">
                  <IndianRupee className="h-6 w-6" />
                  {(totalValue / 100000).toFixed(1)}L
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === 'hi' ? 'कुल मूल्य' : language === 'gu' ? 'કુલ મૂલ્ય' : 'Total Value'}
                </p>
              </CardContent>
            </Card>
            <Card variant="glass">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-amber-500">
                  {assetsData.filter(a => a.condition === 'good').length}
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === 'hi' ? 'अच्छी स्थिति में' : language === 'gu' ? 'સારી સ્થિતિમાં' : 'In Good Condition'}
                </p>
              </CardContent>
            </Card>
            <Card variant="glass">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-destructive">
                  {assetsData.filter(a => a.condition === 'poor' || a.condition === 'critical').length}
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === 'hi' ? 'रखरखाव जरूरी' : language === 'gu' ? 'જાળવણી જરૂરી' : 'Need Maintenance'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Assets Table */}
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
              {types.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setTypeFilter(type.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    typeFilter === type.value 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                {language === 'hi' ? 'संपत्ति सूची' : language === 'gu' ? 'એસેટ યાદી' : 'Asset List'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{language === 'hi' ? 'संपत्ति' : language === 'gu' ? 'એસેટ' : 'Asset'}</TableHead>
                      <TableHead>{language === 'hi' ? 'प्रकार' : language === 'gu' ? 'પ્રકાર' : 'Type'}</TableHead>
                      <TableHead>{language === 'hi' ? 'स्थान' : language === 'gu' ? 'સ્થાન' : 'Location'}</TableHead>
                      <TableHead className="text-right">{language === 'hi' ? 'मूल्य' : language === 'gu' ? 'મૂલ્ય' : 'Value'}</TableHead>
                      <TableHead>{language === 'hi' ? 'स्थिति' : language === 'gu' ? 'સ્થિતિ' : 'Condition'}</TableHead>
                      <TableHead>{language === 'hi' ? 'अंतिम रखरखाव' : language === 'gu' ? 'છેલ્લી જાળવણી' : 'Last Maintenance'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssets.map((asset) => {
                      const typeConf = typeConfig[asset.type];
                      const condConf = conditionConfig[asset.condition];
                      const Icon = typeConf.icon;

                      return (
                        <TableRow key={asset.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${typeConf.color} text-white`}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <span className="font-medium">{getName(asset)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="capitalize">{asset.type}</TableCell>
                          <TableCell>{asset.location}</TableCell>
                          <TableCell className="text-right font-medium">
                            ₹{asset.value.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge className={condConf.color}>
                              {getConditionLabel(asset.condition)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              {new Date(asset.lastMaintenanceDate).toLocaleDateString()}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {filteredAssets.length === 0 && (
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

export default Assets;
