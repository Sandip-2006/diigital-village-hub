import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/store/useStore';
import { mockDevelopmentWorks } from '@/lib/mockData';
import { Calendar, IndianRupee, Building, Droplets, Trash2, GraduationCap, Heart, Zap, Layers } from 'lucide-react';

const Development = () => {
  const { language, selectedVillage } = useStore();

  const works = mockDevelopmentWorks.filter(w => !selectedVillage || w.villageId === selectedVillage.id);
  const planned = works.filter(w => w.status === 'planned');
  const ongoing = works.filter(w => w.status === 'ongoing');
  const completed = works.filter(w => w.status === 'completed');

  const getTitle = (work: typeof works[0]) =>
    language === 'hi' ? work.titleHi : language === 'gu' ? work.titleGu : work.title;

  const statusConfig = {
    planned: { 
      label: { en: 'Planned', hi: 'नियोजित', gu: 'આયોજિત' },
      variant: 'planned' as const
    },
    ongoing: { 
      label: { en: 'Ongoing', hi: 'जारी', gu: 'ચાલુ' },
      variant: 'ongoing' as const
    },
    completed: { 
      label: { en: 'Completed', hi: 'पूर्ण', gu: 'પૂર્ણ' },
      variant: 'completed' as const
    },
  };

  const categoryIcons = {
    roads: Building,
    water: Droplets,
    sanitation: Trash2,
    education: GraduationCap,
    health: Heart,
    electricity: Zap,
    other: Layers,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalBudget = works.reduce((sum, w) => sum + w.budget, 0);
  const completedBudget = completed.reduce((sum, w) => sum + w.budget, 0);

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {language === 'hi' ? 'विकास कार्य' : language === 'gu' ? 'વિકાસ કાર્ય' : 'Development Work'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'hi' ? 'गाँव में चल रहे विकास कार्यों की स्थिति' : 
             language === 'gu' ? 'ગામમાં ચાલી રહેલા વિકાસ કાર્યોની સ્થિતિ' : 
             'Status of development projects in the village'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-primary">{works.length}</p>
              <p className="text-sm text-muted-foreground">
                {language === 'hi' ? 'कुल परियोजनाएं' : language === 'gu' ? 'કુલ પ્રોજેક્ટ્સ' : 'Total Projects'}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-info/5 border-info/20">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-info">{ongoing.length}</p>
              <p className="text-sm text-muted-foreground">
                {language === 'hi' ? 'जारी' : language === 'gu' ? 'ચાલુ' : 'Ongoing'}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-success/5 border-success/20">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-success">{completed.length}</p>
              <p className="text-sm text-muted-foreground">
                {language === 'hi' ? 'पूर्ण' : language === 'gu' ? 'પૂર્ણ' : 'Completed'}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-accent/10 border-accent/20">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-accent-foreground">{formatCurrency(totalBudget)}</p>
              <p className="text-sm text-muted-foreground">
                {language === 'hi' ? 'कुल बजट' : language === 'gu' ? 'કુલ બજેટ' : 'Total Budget'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">
              {language === 'hi' ? 'सभी' : language === 'gu' ? 'બધા' : 'All'}
            </TabsTrigger>
            <TabsTrigger value="ongoing">
              {language === 'hi' ? 'जारी' : language === 'gu' ? 'ચાલુ' : 'Ongoing'}
            </TabsTrigger>
            <TabsTrigger value="planned">
              {language === 'hi' ? 'नियोजित' : language === 'gu' ? 'આયોજિત' : 'Planned'}
            </TabsTrigger>
            <TabsTrigger value="completed">
              {language === 'hi' ? 'पूर्ण' : language === 'gu' ? 'પૂર્ણ' : 'Completed'}
            </TabsTrigger>
          </TabsList>

          {[
            { key: 'all', data: works },
            { key: 'ongoing', data: ongoing },
            { key: 'planned', data: planned },
            { key: 'completed', data: completed },
          ].map(({ key, data }) => (
            <TabsContent key={key} value={key}>
              <div className="grid md:grid-cols-2 gap-4">
                {data.map((work) => {
                  const Icon = categoryIcons[work.category as keyof typeof categoryIcons] || Layers;
                  const config = statusConfig[work.status];
                  return (
                    <Card key={work.id} variant="interactive" className="hover-lift">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{getTitle(work)}</CardTitle>
                              <Badge variant={config.variant} className="mt-1">
                                {config.label[language as keyof typeof config.label]}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{work.description}</p>

                        {/* Progress */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {language === 'hi' ? 'प्रगति' : language === 'gu' ? 'પ્રગતિ' : 'Progress'}
                            </span>
                            <span className="font-medium text-foreground">{work.progress}%</span>
                          </div>
                          <Progress value={work.progress} className="h-2" />
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <IndianRupee className="h-4 w-4" />
                            <span>{formatCurrency(work.budget)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{work.expectedEndDate}</span>
                          </div>
                        </div>

                        {work.contractor && (
                          <p className="text-xs text-muted-foreground pt-2 border-t border-border">
                            <span className="font-medium">
                              {language === 'hi' ? 'ठेकेदार' : language === 'gu' ? 'કોન્ટ્રાક્ટર' : 'Contractor'}:
                            </span>{' '}
                            {work.contractor}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
                {data.length === 0 && (
                  <Card className="col-span-full">
                    <CardContent className="p-8 text-center text-muted-foreground">
                      {language === 'hi' ? 'कोई परियोजना नहीं' : 
                       language === 'gu' ? 'કોઈ પ્રોજેક્ટ નથી' : 'No projects found'}
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Development;
