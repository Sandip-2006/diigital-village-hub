import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { mockMembers, mockSarpanch } from '@/lib/mockData';
import { Phone, Mail, User, Users, GraduationCap, Milk, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Directory = () => {
  const { language, selectedVillage } = useStore();
  const t = getTranslation(language);

  const members = mockMembers.filter(m => !selectedVillage || m.villageId === selectedVillage.id);
  const sarpanch = mockSarpanch;

  const committeeIcons = {
    village: Users,
    school: GraduationCap,
    dairy: Milk,
    panchayat: Building2,
  };

  const getLocalizedName = (member: typeof members[0]) => 
    language === 'hi' ? member.nameHi : language === 'gu' ? member.nameGu : member.name;

  const getLocalizedDesignation = (member: typeof members[0]) =>
    language === 'hi' ? member.designationHi : language === 'gu' ? member.designationGu : member.designation;

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {language === 'hi' ? 'सदस्य और स्टाफ निर्देशिका' : 
             language === 'gu' ? 'સભ્ય અને સ્ટાફ ડિરેક્ટરી' : 'Member & Staff Directory'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'hi' ? 'गाँव के जनप्रतिनिधि और अधिकारी' : 
             language === 'gu' ? 'ગામના જનપ્રતિનિધિ અને અધિકારીઓ' : 'Village representatives and officials'}
          </p>
        </div>

        {/* Sarpanch Profile Card */}
        <Link to="/sarpanch">
          <Card variant="festival" className="mb-8 hover-lift cursor-pointer">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                  <img 
                    src={sarpanch.photo} 
                    alt={sarpanch.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <Badge className="mb-2">
                    {language === 'hi' ? 'सरपंच' : language === 'gu' ? 'સરપંચ' : 'Sarpanch'}
                  </Badge>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {language === 'hi' ? sarpanch.nameHi : 
                     language === 'gu' ? sarpanch.nameGu : sarpanch.name}
                  </h2>
                  <p className="text-muted-foreground mb-4 max-w-xl">
                    {language === 'hi' ? sarpanch.bioHi : 
                     language === 'gu' ? sarpanch.bioGu : sarpanch.bio}
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Phone className="h-4 w-4" />
                      {sarpanch.phone}
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Mail className="h-4 w-4" />
                      {sarpanch.email}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Committee Tabs */}
        <Tabs defaultValue="village" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="village" className="gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">
                {language === 'hi' ? 'ग्राम समिति' : language === 'gu' ? 'ગ્રામ સમિતિ' : 'Village'}
              </span>
            </TabsTrigger>
            <TabsTrigger value="school" className="gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">
                {language === 'hi' ? 'विद्यालय' : language === 'gu' ? 'શાળા' : 'School'}
              </span>
            </TabsTrigger>
            <TabsTrigger value="dairy" className="gap-2">
              <Milk className="h-4 w-4" />
              <span className="hidden sm:inline">
                {language === 'hi' ? 'डेयरी' : language === 'gu' ? 'ડેરી' : 'Dairy'}
              </span>
            </TabsTrigger>
            <TabsTrigger value="panchayat" className="gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">
                {language === 'hi' ? 'पंचायत' : language === 'gu' ? 'પંચાયત' : 'Panchayat'}
              </span>
            </TabsTrigger>
          </TabsList>

          {['village', 'school', 'dairy', 'panchayat'].map((type) => (
            <TabsContent key={type} value={type}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {members
                  .filter(m => m.committeeType === type)
                  .map((member) => {
                    const Icon = committeeIcons[member.committeeType as keyof typeof committeeIcons];
                    return (
                      <Card key={member.id} variant="interactive" className="hover-lift">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground">
                                {getLocalizedName(member)}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {getLocalizedDesignation(member)}
                              </p>
                              <Button variant="ghost" size="sm" className="gap-2 p-0 h-auto" asChild>
                                <a href={`tel:${member.phone}`}>
                                  <Phone className="h-3 w-3" />
                                  {member.phone}
                                </a>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                {members.filter(m => m.committeeType === type).length === 0 && (
                  <Card className="col-span-full">
                    <CardContent className="p-8 text-center text-muted-foreground">
                      {language === 'hi' ? 'कोई सदस्य नहीं मिला' : 
                       language === 'gu' ? 'કોઈ સભ્ય મળ્યો નથી' : 'No members found'}
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

export default Directory;
