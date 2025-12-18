import { MainLayout } from '@/components/layout/MainLayout';
import { useStore } from '@/store/useStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  FileText,
  Image,
  Calendar,
  AlertCircle,
  BarChart3,
  Settings,
  Bell,
  MessageCircle,
  Building,
  TrendingUp,
  ClipboardList,
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { language, userRole, userName, setUserRole } = useStore();

  const titles = {
    en: 'Dashboard',
    hi: 'डैशबोर्ड',
    gu: 'ડેશબોર્ડ',
  };

  const roleLabels = {
    villager: { en: 'Villager', hi: 'ग्रामवासी', gu: 'ગામવાસી' },
    business_owner: { en: 'Business Owner', hi: 'व्यवसाय मालिक', gu: 'વ્યવસાય માલિક' },
    operator: { en: 'Operator', hi: 'ऑपरेटर', gu: 'ઓપરેટર' },
    govt_officer: { en: 'Govt. Officer', hi: 'सरकारी अधिकारी', gu: 'સરકારી અધિકારી' },
    admin: { en: 'Administrator', hi: 'व्यवस्थापक', gu: 'એડમિનિસ્ટ્રેટર' },
  };

  // Demo: Role switcher for testing
  const roles = ['villager', 'business_owner', 'operator', 'govt_officer', 'admin'] as const;

  const stats = {
    admin: [
      { label: 'Total Users', value: '1,245', icon: Users, color: 'text-blue-500' },
      { label: 'Active Complaints', value: '23', icon: AlertCircle, color: 'text-amber-500' },
      { label: 'Events', value: '8', icon: Calendar, color: 'text-green-500' },
      { label: 'Schemes', value: '42', icon: FileText, color: 'text-purple-500' },
    ],
    operator: [
      { label: 'Pending Approvals', value: '12', icon: Clock, color: 'text-amber-500' },
      { label: 'Published Content', value: '156', icon: CheckCircle, color: 'text-green-500' },
      { label: 'Gallery Items', value: '89', icon: Image, color: 'text-blue-500' },
      { label: 'Announcements', value: '34', icon: Bell, color: 'text-purple-500' },
    ],
    govt_officer: [
      { label: 'Total Schemes', value: '42', icon: FileText, color: 'text-blue-500' },
      { label: 'Beneficiaries', value: '3,456', icon: Users, color: 'text-green-500' },
      { label: 'Budget Utilization', value: '64%', icon: TrendingUp, color: 'text-amber-500' },
      { label: 'Audits Pending', value: '5', icon: ClipboardList, color: 'text-red-500' },
    ],
    business_owner: [
      { label: 'My Ads', value: '3', icon: Image, color: 'text-blue-500' },
      { label: 'Job Listings', value: '2', icon: FileText, color: 'text-green-500' },
      { label: 'Views', value: '1.2K', icon: Eye, color: 'text-purple-500' },
      { label: 'Inquiries', value: '15', icon: MessageCircle, color: 'text-amber-500' },
    ],
  };

  const quickActions = {
    admin: [
      { label: 'Manage Users', icon: Users, href: '/directory' },
      { label: 'View Complaints', icon: AlertCircle, href: '/complaints' },
      { label: 'WhatsApp Broadcast', icon: MessageCircle, href: '/whatsapp' },
      { label: 'Settings', icon: Settings, href: '/profile' },
    ],
    operator: [
      { label: 'Add Event', icon: PlusCircle, href: '/events' },
      { label: 'Upload Gallery', icon: Image, href: '/gallery' },
      { label: 'Announcements', icon: Bell, href: '/' },
      { label: 'Edit Content', icon: Edit, href: '/schemes' },
    ],
    govt_officer: [
      { label: 'View Reports', icon: BarChart3, href: '/priasoft' },
      { label: 'Scheme Status', icon: FileText, href: '/schemes' },
      { label: 'Development', icon: Building, href: '/development' },
      { label: 'Gram Sabha', icon: Users, href: '/gram-sabha' },
    ],
    business_owner: [
      { label: 'Create Ad', icon: PlusCircle, href: '/' },
      { label: 'Post Job', icon: FileText, href: '/' },
      { label: 'View Analytics', icon: BarChart3, href: '/' },
      { label: 'Edit Profile', icon: Edit, href: '/profile' },
    ],
  };

  const recentActivity = [
    { action: 'New complaint filed', user: 'Ramesh Patel', time: '2 hours ago', status: 'pending' },
    { action: 'Event published', user: 'System', time: '5 hours ago', status: 'completed' },
    { action: 'Scheme updated', user: 'Admin', time: '1 day ago', status: 'completed' },
    { action: 'Gallery image added', user: 'Operator', time: '2 days ago', status: 'completed' },
  ];

  const currentStats = stats[userRole as keyof typeof stats] || stats.admin;
  const currentActions = quickActions[userRole as keyof typeof quickActions] || quickActions.admin;

  // Villager view
  if (userRole === 'villager') {
    return (
      <MainLayout>
        <section className="py-12">
          <div className="container">
            <Card className="max-w-2xl mx-auto text-center">
              <CardContent className="pt-8">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-2xl font-bold mb-2">
                  {language === 'hi' ? `नमस्ते, ${userName}!` : language === 'gu' ? `નમસ્તે, ${userName}!` : `Hello, ${userName}!`}
                </h1>
                <p className="text-muted-foreground mb-6">
                  {language === 'hi' 
                    ? 'डैशबोर्ड केवल अधिकृत कर्मचारियों के लिए उपलब्ध है।'
                    : language === 'gu'
                    ? 'ડેશબોર્ડ માત્ર અધિકૃત સ્ટાફ માટે ઉપલબ્ધ છે.'
                    : 'Dashboard is only available for authorized staff.'}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Link to="/schemes">
                    <Button variant="outline" className="gap-2">
                      <FileText className="h-4 w-4" />
                      {language === 'hi' ? 'योजनाएं देखें' : language === 'gu' ? 'યોજનાઓ જુઓ' : 'View Schemes'}
                    </Button>
                  </Link>
                  <Link to="/complaints">
                    <Button variant="outline" className="gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {language === 'hi' ? 'शिकायत दर्ज करें' : language === 'gu' ? 'ફરિયાદ કરો' : 'File Complaint'}
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button variant="outline" className="gap-2">
                      <Settings className="h-4 w-4" />
                      {language === 'hi' ? 'प्रोफ़ाइल' : language === 'gu' ? 'પ્રોફાઇલ' : 'Profile'}
                    </Button>
                  </Link>
                </div>

                {/* Demo Role Switcher */}
                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">Demo: Switch role to view different dashboards</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {roles.map((role) => (
                      <Button
                        key={role}
                        variant={userRole === role ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setUserRole(role)}
                      >
                        {roleLabels[role][language]}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Header */}
      <section className="py-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{titles[language]}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{roleLabels[userRole][language]}</Badge>
                <span className="text-sm text-muted-foreground">{userName}</span>
              </div>
            </div>
            {/* Demo Role Switcher */}
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <Button
                  key={role}
                  variant={userRole === role ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setUserRole(role)}
                >
                  {roleLabels[role][language]}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentStats.map((stat, index) => (
              <Card key={index} variant="interactive">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions & Activity */}
      <section className="py-8">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>
                  {language === 'hi' ? 'त्वरित कार्य' : language === 'gu' ? 'ઝડપી ક્રિયાઓ' : 'Quick Actions'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {currentActions.map((action, index) => (
                  <Link key={index} to={action.href}>
                    <Button variant="ghost" className="w-full justify-start gap-3">
                      <action.icon className="h-5 w-5 text-primary" />
                      {action.label}
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  {language === 'hi' ? 'हाल की गतिविधि' : language === 'gu' ? 'તાજેતરની પ્રવૃત્તિ' : 'Recent Activity'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        {activity.status === 'pending' ? (
                          <Clock className="h-5 w-5 text-amber-500" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-success" />
                        )}
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.user}</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Role-specific Content */}
      {(userRole === 'admin' || userRole === 'operator') && (
        <section className="py-8">
          <div className="container">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'hi' ? 'सामग्री प्रबंधन' : language === 'gu' ? 'સામગ્રી વ્યવસ્થાપન' : 'Content Management'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="banners">
                  <TabsList>
                    <TabsTrigger value="banners">Banners</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                    <TabsTrigger value="schemes">Schemes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="banners" className="pt-4">
                    <div className="space-y-3">
                      {[
                        { title: 'Digital Village Initiative', status: 'active' },
                        { title: 'PM Kisan Samman Nidhi', status: 'active' },
                        { title: 'Holiday Banner', status: 'inactive' },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                          <div className="flex items-center gap-3">
                            <Image className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">{item.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={item.status === 'active' ? 'default' : 'outline'}>
                              {item.status}
                            </Badge>
                            <Button size="icon" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4 gap-2">
                      <PlusCircle className="h-4 w-4" />
                      Add New Banner
                    </Button>
                  </TabsContent>
                  <TabsContent value="events" className="pt-4">
                    <p className="text-muted-foreground text-center py-8">Events management coming soon</p>
                  </TabsContent>
                  <TabsContent value="schemes" className="pt-4">
                    <p className="text-muted-foreground text-center py-8">Schemes management coming soon</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default Dashboard;
