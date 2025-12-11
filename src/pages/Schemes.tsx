import { MainLayout } from '@/components/layout/MainLayout';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, CheckCircle, Users, IndianRupee } from 'lucide-react';
import { useState } from 'react';

const schemes = [
  { id: '1', name: 'PM Kisan Samman Nidhi', nameHi: 'पीएम किसान सम्मान निधि', type: 'central', beneficiaries: '11 Cr+', amount: '₹6,000/year', description: 'Financial support to farmer families' },
  { id: '2', name: 'Ayushman Bharat', nameHi: 'आयुष्मान भारत', type: 'central', beneficiaries: '50 Cr+', amount: '₹5 Lakh', description: 'Health insurance coverage' },
  { id: '3', name: 'PM Awas Yojana', nameHi: 'पीएम आवास योजना', type: 'central', beneficiaries: '2 Cr+', amount: '₹1.2 Lakh', description: 'Housing assistance for rural poor' },
  { id: '4', name: 'Mukhyamantri Kisan Sahay', nameHi: 'मुख्यमंत्री किसान सहाय', type: 'state', beneficiaries: '56 Lakh+', amount: '₹25,000', description: 'Crop insurance for Gujarat farmers' },
];

const Schemes = () => {
  const { language } = useStore();
  const t = getTranslation(language);
  const [search, setSearch] = useState('');

  return (
    <MainLayout>
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{t.schemes.title}</h1>
          <p className="text-muted-foreground mt-2">Apply for government benefits and schemes</p>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t.common.search} className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" />Filter</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme, i) => (
            <Card key={scheme.id} variant="interactive" className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <CardHeader>
                <Badge variant={scheme.type === 'central' ? 'default' : 'secondary'}>{scheme.type === 'central' ? t.schemes.central : t.schemes.state}</Badge>
                <CardTitle className="text-lg mt-2">{language === 'hi' ? scheme.nameHi : scheme.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{scheme.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground"><Users className="h-4 w-4" />{scheme.beneficiaries}</span>
                  <span className="flex items-center gap-1 text-success font-semibold"><IndianRupee className="h-4 w-4" />{scheme.amount.replace('₹','')}</span>
                </div>
                <Button className="w-full gap-2"><CheckCircle className="h-4 w-4" />{t.schemes.applyNow}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Schemes;
