import { MainLayout } from '@/components/layout/MainLayout';
import { useStore } from '@/store/useStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Calculator,
  FileText,
  PieChart,
  BarChart3,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  ExternalLink,
  Building,
  Users,
  Wallet,
  Receipt,
} from 'lucide-react';

const PRIASoft = () => {
  const { language } = useStore();

  const titles = {
    en: 'PRIASoft - Panchayat Accounting',
    hi: 'PRIASoft - पंचायत लेखांकन',
    gu: 'PRIASoft - પંચાયત એકાઉન્ટિંગ',
  };

  const subtitles = {
    en: 'Panchayati Raj Institutions Accounting Software - Transparent Financial Management',
    hi: 'पंचायती राज संस्थान लेखा सॉफ्टवेयर - पारदर्शी वित्तीय प्रबंधन',
    gu: 'પંચાયતી રાજ સંસ્થાઓ એકાઉન્ટિંગ સોફ્ટવેર - પારદર્શક નાણાકીય વ્યવસ્થાપન',
  };

  const budgetData = {
    allocated: 5000000,
    spent: 3200000,
    remaining: 1800000,
    utilization: 64,
  };

  const revenueData = [
    { source: 'Property Tax', sourceHi: 'संपत्ति कर', sourceGu: 'મિલકત કર', amount: 1200000, trend: 'up' },
    { source: 'Water Tax', sourceHi: 'जल कर', sourceGu: 'પાણી કર', amount: 450000, trend: 'stable' },
    { source: 'License Fees', sourceHi: 'लाइसेंस शुल्क', sourceGu: 'લાઇસન્સ ફી', amount: 180000, trend: 'up' },
    { source: 'Rent Income', sourceHi: 'किराया आय', sourceGu: 'ભાડાની આવક', amount: 320000, trend: 'down' },
    { source: 'Grants', sourceHi: 'अनुदान', sourceGu: 'અનુદાન', amount: 2500000, trend: 'up' },
  ];

  const expenditureData = [
    { category: 'Salaries', categoryHi: 'वेतन', categoryGu: 'પગાર', amount: 800000, percentage: 25 },
    { category: 'Infrastructure', categoryHi: 'बुनियादी ढांचा', categoryGu: 'ઈન્ફ્રાસ્ટ્રક્ચર', amount: 1200000, percentage: 37.5 },
    { category: 'Welfare Schemes', categoryHi: 'कल्याण योजनाएं', categoryGu: 'કલ્યાણ યોજનાઓ', amount: 650000, percentage: 20.3 },
    { category: 'Maintenance', categoryHi: 'रखरखाव', categoryGu: 'જાળવણી', amount: 350000, percentage: 10.9 },
    { category: 'Others', categoryHi: 'अन्य', categoryGu: 'અન્ય', amount: 200000, percentage: 6.3 },
  ];

  const reports = [
    { name: 'Monthly Statement', nameHi: 'मासिक विवरण', nameGu: 'માસિક સ્ટેટમેન્ટ', icon: Calendar },
    { name: 'Balance Sheet', nameHi: 'बैलेंस शीट', nameGu: 'બેલેન્સ શીટ', icon: FileText },
    { name: 'Income & Expenditure', nameHi: 'आय और व्यय', nameGu: 'આવક અને ખર્ચ', icon: Receipt },
    { name: 'Budget Variance', nameHi: 'बजट विचलन', nameGu: 'બજેટ વેરિએન્સ', icon: BarChart3 },
  ];

  const getName = (item: { source?: string; sourceHi?: string; sourceGu?: string; category?: string; categoryHi?: string; categoryGu?: string }) => {
    const base = item.source || item.category || '';
    const hi = item.sourceHi || item.categoryHi || '';
    const gu = item.sourceGu || item.categoryGu || '';
    if (language === 'hi') return hi;
    if (language === 'gu') return gu;
    return base;
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-500/10 via-background to-primary/10">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-blue-500/20 text-blue-600 border-0">
              <Calculator className="h-4 w-4 mr-1" />
              PRIASoft
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">{titles[language]}</h1>
            <p className="text-lg text-muted-foreground mb-6">{subtitles[language]}</p>
            <Button variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              {language === 'hi' ? 'PRIASoft पोर्टल पर जाएं' : language === 'gu' ? 'PRIASoft પોર્ટલ પર જાઓ' : 'Go to PRIASoft Portal'}
            </Button>
          </div>
        </div>
      </section>

      {/* Budget Overview */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Wallet className="h-6 w-6 text-primary" />
            {language === 'hi' ? 'बजट अवलोकन (2024-25)' : language === 'gu' ? 'બજેટ ઓવરવ્યૂ (2024-25)' : 'Budget Overview (2024-25)'}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card variant="glass">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <IndianRupee className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {language === 'hi' ? 'आवंटित बजट' : language === 'gu' ? 'ફાળવેલ બજેટ' : 'Allocated Budget'}
                  </span>
                </div>
                <div className="text-2xl font-bold">₹{(budgetData.allocated / 100000).toFixed(1)}L</div>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-amber-500/20">
                    <TrendingDown className="h-5 w-5 text-amber-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {language === 'hi' ? 'खर्च' : language === 'gu' ? 'ખર્ચ' : 'Spent'}
                  </span>
                </div>
                <div className="text-2xl font-bold">₹{(budgetData.spent / 100000).toFixed(1)}L</div>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-success/20">
                    <Wallet className="h-5 w-5 text-success" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {language === 'hi' ? 'शेष' : language === 'gu' ? 'બાકી' : 'Remaining'}
                  </span>
                </div>
                <div className="text-2xl font-bold">₹{(budgetData.remaining / 100000).toFixed(1)}L</div>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <PieChart className="h-5 w-5 text-blue-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {language === 'hi' ? 'उपयोग' : language === 'gu' ? 'ઉપયોગ' : 'Utilization'}
                  </span>
                </div>
                <div className="text-2xl font-bold">{budgetData.utilization}%</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {language === 'hi' ? 'बजट उपयोग' : language === 'gu' ? 'બજેટ ઉપયોગ' : 'Budget Utilization'}
                </span>
                <span className="text-sm text-muted-foreground">{budgetData.utilization}%</span>
              </div>
              <Progress value={budgetData.utilization} className="h-3" />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Revenue & Expenditure */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Revenue */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <TrendingUp className="h-5 w-5" />
                  {language === 'hi' ? 'राजस्व स्रोत' : language === 'gu' ? 'આવકના સ્ત્રોતો' : 'Revenue Sources'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">{getName(item)}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">₹{(item.amount / 100000).toFixed(2)}L</span>
                        {item.trend === 'up' && <TrendingUp className="h-4 w-4 text-success" />}
                        {item.trend === 'down' && <TrendingDown className="h-4 w-4 text-destructive" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Expenditure */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-500">
                  <BarChart3 className="h-5 w-5" />
                  {language === 'hi' ? 'व्यय विवरण' : language === 'gu' ? 'ખર્ચ વિગતો' : 'Expenditure Breakdown'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenditureData.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{getName(item)}</span>
                        <span className="text-sm text-muted-foreground">
                          ₹{(item.amount / 100000).toFixed(2)}L ({item.percentage}%)
                        </span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reports */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            {language === 'hi' ? 'वित्तीय रिपोर्ट' : language === 'gu' ? 'નાણાકીય અહેવાલો' : 'Financial Reports'}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reports.map((report, index) => (
              <Card key={index} variant="interactive" className="cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-xl bg-primary/10 mb-4">
                      <report.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">
                      {language === 'hi' ? report.nameHi : language === 'gu' ? report.nameGu : report.name}
                    </h3>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      {language === 'hi' ? 'डाउनलोड' : language === 'gu' ? 'ડાઉનલોડ' : 'Download'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>
                {language === 'hi' ? 'PRIASoft के बारे में' : language === 'gu' ? 'PRIASoft વિશે' : 'About PRIASoft'}
              </CardTitle>
              <CardDescription>
                {language === 'hi' 
                  ? 'पंचायती राज संस्थानों में पारदर्शी वित्तीय प्रबंधन'
                  : language === 'gu'
                  ? 'પંચાયતી રાજ સંસ્થાઓમાં પારદર્શક નાણાકીય વ્યવસ્થાપન'
                  : 'Transparent financial management in Panchayati Raj Institutions'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {language === 'hi'
                  ? 'PRIASoft (पंचायती राज संस्थान लेखा सॉफ्टवेयर) भारत सरकार के पंचायती राज मंत्रालय द्वारा विकसित एक वेब-आधारित अनुप्रयोग है। यह पंचायतों में वित्तीय प्रबंधन, बजट ट्रैकिंग और लेखा कार्यों को सुव्यवस्थित करता है।'
                  : language === 'gu'
                  ? 'PRIASoft (પંચાયતી રાજ સંસ્થાઓ એકાઉન્ટિંગ સોફ્ટવેર) ભારત સરકારના પંચાયતી રાજ મંત્રાલય દ્વારા વિકસિત વેબ-આધારિત એપ્લિકેશન છે. તે પંચાયતોમાં નાણાકીય વ્યવસ્થાપન, બજેટ ટ્રેકિંગ અને એકાઉન્ટિંગ કાર્યોને સુવ્યવસ્થિત કરે છે.'
                  : 'PRIASoft (Panchayati Raj Institutions Accounting Software) is a web-based application developed by the Ministry of Panchayati Raj, Government of India. It streamlines financial management, budget tracking, and accounting functions in Panchayats.'}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Double Entry System</Badge>
                <Badge variant="outline">Real-time Tracking</Badge>
                <Badge variant="outline">Audit Trail</Badge>
                <Badge variant="outline">MIS Reports</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </MainLayout>
  );
};

export default PRIASoft;
