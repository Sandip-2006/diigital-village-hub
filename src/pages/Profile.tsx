import { MainLayout } from '@/components/layout/MainLayout';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Link2,
  Link2Off,
  Shield,
  Bell,
  Settings,
  LogOut,
  Edit,
  Check,
} from 'lucide-react';
import { useState } from 'react';

const Profile = () => {
  const { 
    language, 
    userName, 
    setUserName,
    userRole,
    isAuthenticated,
    setAuthenticated,
    linkedAccounts,
    setLinkedAccounts,
    selectedVillage,
    whatsappOptedIn,
    setWhatsappOptedIn,
  } = useStore();
  const t = getTranslation(language);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userName);

  const titles = {
    en: 'My Profile',
    hi: 'मेरी प्रोफ़ाइल',
    gu: 'મારી પ્રોફાઇલ',
  };

  const linkedAccountsTitle = {
    en: 'Linked Accounts',
    hi: 'लिंक किए गए खाते',
    gu: 'લિંક કરેલ એકાઉન્ટ્સ',
  };

  const preferencesTitle = {
    en: 'Preferences',
    hi: 'प्राथमिकताएं',
    gu: 'પસંદગીઓ',
  };

  const roleLabels = {
    villager: { en: 'Villager', hi: 'ग्रामवासी', gu: 'ગામવાસી' },
    business_owner: { en: 'Business Owner', hi: 'व्यवसाय मालिक', gu: 'વ્યવસાય માલિક' },
    operator: { en: 'Operator', hi: 'ऑपरेटर', gu: 'ઓપરેટર' },
    govt_officer: { en: 'Govt. Officer', hi: 'सरकारी अधिकारी', gu: 'સરકારી અધિકારી' },
    admin: { en: 'Administrator', hi: 'व्यवस्थापक', gu: 'એડમિનિસ્ટ્રેટર' },
  };

  const handleSaveName = () => {
    setUserName(editName);
    setIsEditing(false);
  };

  const handleGoogleConnect = () => {
    setLinkedAccounts({ ...linkedAccounts, google: !linkedAccounts.google });
  };

  const handlePhoneConnect = () => {
    setLinkedAccounts({ ...linkedAccounts, phone: !linkedAccounts.phone });
  };

  // Mock login for demo
  const handleLogin = () => {
    setAuthenticated(true);
    setUserName('Rajesh Kumar');
    setLinkedAccounts({ google: true, phone: false });
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setUserName('Guest User');
    setLinkedAccounts({ google: false, phone: false });
  };

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <section className="py-20">
          <div className="container">
            <Card className="max-w-md mx-auto">
              <CardHeader className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>
                  {language === 'hi' ? 'लॉगिन करें' : language === 'gu' ? 'લોગિન કરો' : 'Login'}
                </CardTitle>
                <CardDescription>
                  {language === 'hi' 
                    ? 'अपनी प्रोफ़ाइल देखने के लिए लॉगिन करें'
                    : language === 'gu'
                    ? 'તમારી પ્રોફાઇલ જોવા માટે લોગિન કરો'
                    : 'Login to view your profile'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full gap-2" variant="outline" onClick={handleLogin}>
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {language === 'hi' ? 'Google से लॉगिन करें' : language === 'gu' ? 'Google સાથે લોગિન કરો' : 'Continue with Google'}
                </Button>
                <Button className="w-full gap-2" variant="outline">
                  <Phone className="h-5 w-5" />
                  {language === 'hi' ? 'OTP से लॉगिन करें' : language === 'gu' ? 'OTP સાથે લોગિન કરો' : 'Continue with Phone OTP'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Profile Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Avatar className="w-24 h-24 border-4 border-primary/20">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                    <AvatarFallback className="text-2xl">{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 text-center sm:text-left">
                    {isEditing ? (
                      <div className="flex items-center gap-2 mb-2">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="max-w-xs"
                        />
                        <Button size="icon" onClick={handleSaveName}>
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                        <h1 className="text-2xl font-bold">{userName}</h1>
                        <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      <Badge variant="outline" className="gap-1">
                        <Shield className="h-3 w-3" />
                        {roleLabels[userRole][language]}
                      </Badge>
                      {selectedVillage && (
                        <Badge variant="secondary" className="gap-1">
                          <MapPin className="h-3 w-3" />
                          {language === 'hi' ? selectedVillage.nameHi : 
                           language === 'gu' ? selectedVillage.nameGu : selectedVillage.name}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button variant="destructive" className="gap-2" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    {language === 'hi' ? 'लॉगआउट' : language === 'gu' ? 'લોગઆઉટ' : 'Logout'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Linked Accounts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link2 className="h-5 w-5" />
                  {linkedAccountsTitle[language]}
                </CardTitle>
                <CardDescription>
                  {language === 'hi'
                    ? 'अपने खातों को लिंक करके तेज़ी से लॉगिन करें'
                    : language === 'gu'
                    ? 'તમારા એકાઉન્ટ્સ લિંક કરીને ઝડપથી લોગિન કરો'
                    : 'Link your accounts for faster login'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Google Account */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-500/10">
                      <svg className="h-5 w-5 text-red-500" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Google</p>
                      <p className="text-sm text-muted-foreground">
                        {linkedAccounts.google 
                          ? (language === 'hi' ? 'कनेक्टेड' : language === 'gu' ? 'કનેક્ટેડ' : 'Connected')
                          : (language === 'hi' ? 'कनेक्ट नहीं' : language === 'gu' ? 'કનેક્ટ નથી' : 'Not connected')}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant={linkedAccounts.google ? 'destructive' : 'outline'}
                    size="sm"
                    className="gap-2"
                    onClick={handleGoogleConnect}
                  >
                    {linkedAccounts.google ? (
                      <>
                        <Link2Off className="h-4 w-4" />
                        {language === 'hi' ? 'डिस्कनेक्ट' : language === 'gu' ? 'ડિસ્કનેક્ટ' : 'Disconnect'}
                      </>
                    ) : (
                      <>
                        <Link2 className="h-4 w-4" />
                        {language === 'hi' ? 'कनेक्ट' : language === 'gu' ? 'કનેક્ટ' : 'Connect'}
                      </>
                    )}
                  </Button>
                </div>

                {/* Phone Account */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <Phone className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Phone (OTP)</p>
                      <p className="text-sm text-muted-foreground">
                        {linkedAccounts.phone 
                          ? '+91 98765 XXXXX'
                          : (language === 'hi' ? 'कनेक्ट नहीं' : language === 'gu' ? 'કનેક્ટ નથી' : 'Not connected')}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant={linkedAccounts.phone ? 'destructive' : 'outline'}
                    size="sm"
                    className="gap-2"
                    onClick={handlePhoneConnect}
                  >
                    {linkedAccounts.phone ? (
                      <>
                        <Link2Off className="h-4 w-4" />
                        {language === 'hi' ? 'डिस्कनेक्ट' : language === 'gu' ? 'ડિસ્કનેક્ટ' : 'Disconnect'}
                      </>
                    ) : (
                      <>
                        <Link2 className="h-4 w-4" />
                        {language === 'hi' ? 'कनेक्ट' : language === 'gu' ? 'કનેક્ટ' : 'Connect'}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  {preferencesTitle[language]}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {language === 'hi' ? 'WhatsApp नोटिफिकेशन' : language === 'gu' ? 'WhatsApp નોટિફિકેશન્સ' : 'WhatsApp Notifications'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {language === 'hi' ? 'योजनाओं और घोषणाओं के अपडेट प्राप्त करें' : language === 'gu' ? 'યોજનાઓ અને જાહેરાતોના અપડેટ્સ મેળવો' : 'Receive updates about schemes and announcements'}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={whatsappOptedIn}
                    onCheckedChange={setWhatsappOptedIn}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Profile;
