import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Users, 
  ArrowRight,
  CheckCircle,
  IndianRupee
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Scheme {
  id: string;
  name: string;
  nameHi: string;
  nameGu: string;
  description: string;
  type: 'central' | 'state';
  beneficiaries: string;
  amount: string;
  deadline?: string;
}

const popularSchemes: Scheme[] = [
  {
    id: '1',
    name: 'PM Kisan Samman Nidhi',
    nameHi: 'पीएम किसान सम्मान निधि',
    nameGu: 'પીએમ કિસાન સન્માન નિધિ',
    description: 'Financial support of ₹6,000 per year to farmer families',
    type: 'central',
    beneficiaries: '11 Cr+',
    amount: '₹6,000/year',
  },
  {
    id: '2',
    name: 'Ayushman Bharat',
    nameHi: 'आयुष्मान भारत',
    nameGu: 'આયુષ્માન ભારત',
    description: 'Health insurance cover of ₹5 Lakh per family per year',
    type: 'central',
    beneficiaries: '50 Cr+',
    amount: '₹5 Lakh',
  },
  {
    id: '3',
    name: 'Kisan Credit Card',
    nameHi: 'किसान क्रेडिट कार्ड',
    nameGu: 'કિસાન ક્રેડિટ કાર્ડ',
    description: 'Low-interest credit for agricultural needs',
    type: 'central',
    beneficiaries: '2.5 Cr+',
    amount: '4% Interest',
    deadline: 'Dec 31, 2024',
  },
  {
    id: '4',
    name: 'Mukhyamantri Kisan Sahay',
    nameHi: 'मुख्यमंत्री किसान सहाय',
    nameGu: 'મુખ્યમંત્રી કિસાન સહાય',
    description: 'Crop insurance and disaster relief for Gujarat farmers',
    type: 'state',
    beneficiaries: '56 Lakh+',
    amount: '₹25,000',
  },
];

export function SchemeCards() {
  const { language } = useStore();
  const t = getTranslation(language);

  const getSchemeName = (s: Scheme) => {
    switch (language) {
      case 'hi': return s.nameHi;
      case 'gu': return s.nameGu;
      default: return s.name;
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-transparent to-muted/30">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{t.home.popularSchemes}</h2>
            <p className="text-muted-foreground mt-1">Apply for government benefits</p>
          </div>
          <Link to="/schemes">
            <Button variant="outline" className="gap-2">
              {t.common.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularSchemes.map((scheme, index) => (
            <Card 
              key={scheme.id} 
              variant="interactive"
              className="group animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant={scheme.type === 'central' ? 'default' : 'secondary'} className="capitalize">
                    {scheme.type === 'central' ? t.schemes.central : t.schemes.state}
                  </Badge>
                  {scheme.deadline && (
                    <Badge variant="warning" className="text-xs">
                      Till {scheme.deadline}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-base mt-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {getSchemeName(scheme)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {scheme.description}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{scheme.beneficiaries}</span>
                  </div>
                  <div className="flex items-center gap-1 text-success font-semibold">
                    <IndianRupee className="h-4 w-4" />
                    <span>{scheme.amount.replace('₹', '')}</span>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <CheckCircle className="h-4 w-4" />
                  {t.schemes.applyNow}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
