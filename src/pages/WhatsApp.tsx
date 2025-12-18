import { MainLayout } from '@/components/layout/MainLayout';
import { useStore } from '@/store/useStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  MessageCircle,
  Users,
  Send,
  FileText,
  Eye,
  Phone,
  Calendar,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { useState } from 'react';

interface Subscriber {
  id: string;
  name: string;
  phone: string;
  village: string;
  subscribedAt: string;
  isActive: boolean;
  categories: string[];
}

const mockSubscribers: Subscriber[] = [
  { id: '1', name: 'Ramesh Patel', phone: '+91 98765 43210', village: 'Dungarpur', subscribedAt: '2024-11-15', isActive: true, categories: ['schemes', 'events'] },
  { id: '2', name: 'Sunita Devi', phone: '+91 98765 43211', village: 'Dungarpur', subscribedAt: '2024-11-18', isActive: true, categories: ['announcements', 'weather'] },
  { id: '3', name: 'Mohan Singh', phone: '+91 98765 43212', village: 'Sarvapur', subscribedAt: '2024-11-20', isActive: false, categories: ['schemes'] },
  { id: '4', name: 'Geeta Ben', phone: '+91 98765 43213', village: 'Dungarpur', subscribedAt: '2024-11-22', isActive: true, categories: ['events', 'gram-sabha'] },
  { id: '5', name: 'Vijay Kumar', phone: '+91 98765 43214', village: 'Rajpur', subscribedAt: '2024-11-25', isActive: true, categories: ['all'] },
];

const templates = [
  {
    id: '1',
    name: 'Scheme Announcement',
    nameHi: 'योजना घोषणा',
    nameGu: 'યોજના જાહેરાત',
    content: 'नई योजना: {{scheme_name}}\n\nलाभ: {{benefits}}\n\nआवेदन करने के लिए पंचायत कार्यालय संपर्क करें।',
    contentEn: 'New Scheme: {{scheme_name}}\n\nBenefits: {{benefits}}\n\nContact Panchayat office to apply.',
  },
  {
    id: '2',
    name: 'Event Reminder',
    nameHi: 'कार्यक्रम अनुस्मारक',
    nameGu: 'કાર્યક્રમ રીમાઇન્ડર',
    content: '📅 कार्यक्रम: {{event_name}}\n\n🗓️ तिथि: {{date}}\n⏰ समय: {{time}}\n📍 स्थान: {{venue}}\n\nकृपया समय पर पहुंचें।',
    contentEn: '📅 Event: {{event_name}}\n\n🗓️ Date: {{date}}\n⏰ Time: {{time}}\n📍 Venue: {{venue}}\n\nPlease arrive on time.',
  },
  {
    id: '3',
    name: 'Weather Alert',
    nameHi: 'मौसम चेतावनी',
    nameGu: 'હવામાન ચેતવણી',
    content: '⚠️ मौसम चेतावनी\n\n{{alert_type}}\n\nसावधानी: {{precautions}}\n\nसुरक्षित रहें!',
    contentEn: '⚠️ Weather Alert\n\n{{alert_type}}\n\nPrecautions: {{precautions}}\n\nStay safe!',
  },
  {
    id: '4',
    name: 'Gram Sabha Notice',
    nameHi: 'ग्राम सभा सूचना',
    nameGu: 'ગ્રામ સભા સૂચના',
    content: '🔔 ग्राम सभा बैठक\n\n📅 तिथि: {{date}}\n⏰ समय: {{time}}\n📍 स्थान: {{venue}}\n\nएजेंडा:\n{{agenda}}\n\nआपकी उपस्थिति अनिवार्य है।',
    contentEn: '🔔 Gram Sabha Meeting\n\n📅 Date: {{date}}\n⏰ Time: {{time}}\n📍 Venue: {{venue}}\n\nAgenda:\n{{agenda}}\n\nYour presence is mandatory.',
  },
];

const WhatsApp = () => {
  const { language, userRole } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);
  const [messageContent, setMessageContent] = useState('');
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);

  const isAdmin = userRole === 'admin' || userRole === 'operator';

  const titles = {
    en: 'WhatsApp Broadcast',
    hi: 'व्हाट्सएप प्रसारण',
    gu: 'વોટ્સએપ બ્રોડકાસ્ટ',
  };

  const subtitles = {
    en: 'Manage subscribers and send broadcasts to village residents',
    hi: 'ग्रामीणों को संदेश भेजें और सब्सक्राइबर्स प्रबंधित करें',
    gu: 'ગ્રામજનોને સંદેશા મોકલો અને સબ્સ્ક્રાઇબર્સ મેનેજ કરો',
  };

  const filteredSubscribers = mockSubscribers.filter(sub =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.phone.includes(searchQuery)
  );

  const handleSelectAll = () => {
    if (selectedSubscribers.length === filteredSubscribers.length) {
      setSelectedSubscribers([]);
    } else {
      setSelectedSubscribers(filteredSubscribers.map(s => s.id));
    }
  };

  const handleSelectSubscriber = (id: string) => {
    if (selectedSubscribers.includes(id)) {
      setSelectedSubscribers(selectedSubscribers.filter(s => s !== id));
    } else {
      setSelectedSubscribers([...selectedSubscribers, id]);
    }
  };

  const handleTemplateSelect = (template: typeof templates[0]) => {
    setSelectedTemplate(template);
    setMessageContent(language === 'en' ? template.contentEn : template.content);
  };

  if (!isAdmin) {
    return (
      <MainLayout>
        <section className="py-20">
          <div className="container">
            <Card className="max-w-md mx-auto text-center">
              <CardContent className="pt-6">
                <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">
                  {language === 'hi' ? 'पहुंच अस्वीकृत' : language === 'gu' ? 'ઍક્સેસ નકારી' : 'Access Denied'}
                </h2>
                <p className="text-muted-foreground">
                  {language === 'hi' 
                    ? 'इस पेज को देखने के लिए आपके पास अनुमति नहीं है'
                    : language === 'gu'
                    ? 'આ પૃષ્ઠ જોવા માટે તમારી પાસે પરવાનગી નથી'
                    : 'You do not have permission to view this page'}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-success/10 via-background to-primary/10">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-success/20 text-success border-0">
              <MessageCircle className="h-4 w-4 mr-1" />
              Admin Panel
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">{titles[language]}</h1>
            <p className="text-lg text-muted-foreground">{subtitles[language]}</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-b border-border">
        <div className="container">
          <div className="grid sm:grid-cols-3 gap-4">
            <Card variant="glass">
              <CardContent className="pt-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold">{mockSubscribers.length}</div>
                <p className="text-sm text-muted-foreground">
                  {language === 'hi' ? 'कुल सब्सक्राइबर्स' : language === 'gu' ? 'કુલ સબ્સ્ક્રાઇબર્સ' : 'Total Subscribers'}
                </p>
              </CardContent>
            </Card>
            <Card variant="glass">
              <CardContent className="pt-6 text-center">
                <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
                <div className="text-3xl font-bold">{mockSubscribers.filter(s => s.isActive).length}</div>
                <p className="text-sm text-muted-foreground">
                  {language === 'hi' ? 'सक्रिय' : language === 'gu' ? 'સક્રિય' : 'Active'}
                </p>
              </CardContent>
            </Card>
            <Card variant="glass">
              <CardContent className="pt-6 text-center">
                <Send className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-3xl font-bold">156</div>
                <p className="text-sm text-muted-foreground">
                  {language === 'hi' ? 'भेजे गए संदेश' : language === 'gu' ? 'મોકલેલા સંદેશા' : 'Messages Sent'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <Tabs defaultValue="broadcast" className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="broadcast">
                <Send className="h-4 w-4 mr-2" />
                {language === 'hi' ? 'प्रसारण' : language === 'gu' ? 'બ્રોડકાસ્ટ' : 'Broadcast'}
              </TabsTrigger>
              <TabsTrigger value="subscribers">
                <Users className="h-4 w-4 mr-2" />
                {language === 'hi' ? 'सब्सक्राइबर्स' : language === 'gu' ? 'સબ્સ્ક્રાઇબર્સ' : 'Subscribers'}
              </TabsTrigger>
              <TabsTrigger value="templates">
                <FileText className="h-4 w-4 mr-2" />
                {language === 'hi' ? 'टेम्पलेट्स' : language === 'gu' ? 'ટેમ્પલેટ્સ' : 'Templates'}
              </TabsTrigger>
            </TabsList>

            {/* Broadcast Tab */}
            <TabsContent value="broadcast">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Compose */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'hi' ? 'संदेश लिखें' : language === 'gu' ? 'સંદેશ લખો' : 'Compose Message'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>
                        {language === 'hi' ? 'टेम्पलेट चुनें (वैकल्पिक)' : language === 'gu' ? 'ટેમ્પલેટ પસંદ કરો (વૈકલ્પિક)' : 'Select Template (optional)'}
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {templates.map((template) => (
                          <Button
                            key={template.id}
                            variant={selectedTemplate?.id === template.id ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleTemplateSelect(template)}
                          >
                            {language === 'hi' ? template.nameHi : language === 'gu' ? template.nameGu : template.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>
                        {language === 'hi' ? 'संदेश' : language === 'gu' ? 'સંદેશ' : 'Message'}
                      </Label>
                      <Textarea
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        rows={8}
                        placeholder={language === 'hi' ? 'अपना संदेश यहाँ लिखें...' : language === 'gu' ? 'તમારો સંદેશ અહીં લખો...' : 'Type your message here...'}
                      />
                    </div>
                    <Button className="w-full gap-2" disabled={!messageContent || selectedSubscribers.length === 0}>
                      <Send className="h-4 w-4" />
                      {language === 'hi' 
                        ? `${selectedSubscribers.length} लोगों को भेजें` 
                        : language === 'gu' 
                        ? `${selectedSubscribers.length} લોકોને મોકલો`
                        : `Send to ${selectedSubscribers.length} subscribers`}
                    </Button>
                  </CardContent>
                </Card>

                {/* Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      {language === 'hi' ? 'पूर्वावलोकन' : language === 'gu' ? 'પ્રીવ્યૂ' : 'Preview'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-[#0B141A] rounded-2xl p-4 max-w-sm mx-auto">
                      {/* WhatsApp Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center">
                          <MessageCircle className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Digital Village Portal</p>
                          <p className="text-xs text-gray-400">Official</p>
                        </div>
                      </div>
                      {/* Message Bubble */}
                      <div className="bg-[#005C4B] text-white p-3 rounded-lg rounded-tl-none max-w-[85%]">
                        <pre className="whitespace-pre-wrap text-sm font-sans">
                          {messageContent || (language === 'hi' ? 'आपका संदेश यहाँ दिखाई देगा...' : language === 'gu' ? 'તમારો સંદેશ અહીં દેખાશે...' : 'Your message will appear here...')}
                        </pre>
                        <p className="text-right text-xs text-gray-300 mt-2">
                          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Subscribers Tab */}
            <TabsContent value="subscribers">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div>
                      <CardTitle>
                        {language === 'hi' ? 'सब्सक्राइबर सूची' : language === 'gu' ? 'સબ્સ્ક્રાઇબર યાદી' : 'Subscriber List'}
                      </CardTitle>
                      <CardDescription>
                        {selectedSubscribers.length > 0 && `${selectedSubscribers.length} selected`}
                      </CardDescription>
                    </div>
                    <div className="relative max-w-xs">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={language === 'hi' ? 'खोजें...' : language === 'gu' ? 'શોધો...' : 'Search...'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <Checkbox
                              checked={selectedSubscribers.length === filteredSubscribers.length}
                              onCheckedChange={handleSelectAll}
                            />
                          </TableHead>
                          <TableHead>{language === 'hi' ? 'नाम' : language === 'gu' ? 'નામ' : 'Name'}</TableHead>
                          <TableHead>{language === 'hi' ? 'फ़ोन' : language === 'gu' ? 'ફોન' : 'Phone'}</TableHead>
                          <TableHead>{language === 'hi' ? 'गाँव' : language === 'gu' ? 'ગામ' : 'Village'}</TableHead>
                          <TableHead>{language === 'hi' ? 'स्थिति' : language === 'gu' ? 'સ્થિતિ' : 'Status'}</TableHead>
                          <TableHead>{language === 'hi' ? 'तिथि' : language === 'gu' ? 'તારીખ' : 'Date'}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSubscribers.map((subscriber) => (
                          <TableRow key={subscriber.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedSubscribers.includes(subscriber.id)}
                                onCheckedChange={() => handleSelectSubscriber(subscriber.id)}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{subscriber.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                {subscriber.phone}
                              </div>
                            </TableCell>
                            <TableCell>{subscriber.village}</TableCell>
                            <TableCell>
                              {subscriber.isActive ? (
                                <Badge variant="outline" className="gap-1 text-success border-success">
                                  <CheckCircle className="h-3 w-3" />
                                  {language === 'hi' ? 'सक्रिय' : language === 'gu' ? 'સક્રિય' : 'Active'}
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="gap-1 text-muted-foreground">
                                  <XCircle className="h-3 w-3" />
                                  {language === 'hi' ? 'निष्क्रिय' : language === 'gu' ? 'નિષ્ક્રિય' : 'Inactive'}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                {new Date(subscriber.subscribedAt).toLocaleDateString()}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="templates">
              <div className="grid md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <Card key={template.id} variant="interactive">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {language === 'hi' ? template.nameHi : language === 'gu' ? template.nameGu : template.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted p-4 rounded-lg mb-4">
                        <pre className="whitespace-pre-wrap text-sm font-sans text-muted-foreground">
                          {language === 'en' ? template.contentEn : template.content}
                        </pre>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleTemplateSelect(template)}
                      >
                        {language === 'hi' ? 'इस टेम्पलेट का उपयोग करें' : language === 'gu' ? 'આ ટેમ્પલેટ વાપરો' : 'Use This Template'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>
  );
};

export default WhatsApp;
