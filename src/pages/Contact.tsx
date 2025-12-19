import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store/useStore';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  AlertTriangle,
  Ambulance,
  Shield,
  Flame,
  Send,
  Building2,
  User,
  MessageSquare,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const { language, selectedVillage } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const translations = {
    en: {
      title: 'Contact Us',
      subtitle: 'Get in touch with Village Panchayat Office',
      officeTitle: 'Village Panchayat Office',
      address: 'Gram Panchayat Bhawan, Main Road',
      workingHours: 'Working Hours',
      monFri: 'Monday - Friday',
      timing: '10:00 AM - 5:00 PM',
      saturday: 'Saturday',
      satTiming: '10:00 AM - 2:00 PM',
      sunday: 'Sunday',
      closed: 'Closed',
      emergency: 'Emergency Contacts',
      emergencyNote: 'For emergencies, please call these numbers 24/7',
      police: 'Police Station',
      medical: 'Medical Emergency',
      fire: 'Fire Brigade',
      contactForm: 'Send us a Message',
      formNote: 'Have a question or suggestion? Fill out the form below',
      name: 'Your Name',
      email: 'Email Address',
      message: 'Your Message',
      send: 'Send Message',
      sending: 'Sending...',
      successTitle: 'Message Sent!',
      successMessage: 'We will get back to you within 24-48 hours.',
      location: 'Our Location'
    },
    hi: {
      title: 'संपर्क करें',
      subtitle: 'ग्राम पंचायत कार्यालय से संपर्क करें',
      officeTitle: 'ग्राम पंचायत कार्यालय',
      address: 'ग्राम पंचायत भवन, मुख्य मार्ग',
      workingHours: 'कार्य समय',
      monFri: 'सोमवार - शुक्रवार',
      timing: 'सुबह 10:00 - शाम 5:00',
      saturday: 'शनिवार',
      satTiming: 'सुबह 10:00 - दोपहर 2:00',
      sunday: 'रविवार',
      closed: 'बंद',
      emergency: 'आपातकालीन संपर्क',
      emergencyNote: 'आपातकाल के लिए, कृपया इन नंबरों पर 24/7 कॉल करें',
      police: 'पुलिस स्टेशन',
      medical: 'चिकित्सा आपातकाल',
      fire: 'अग्निशमन दल',
      contactForm: 'हमें संदेश भेजें',
      formNote: 'कोई प्रश्न या सुझाव है? नीचे फॉर्म भरें',
      name: 'आपका नाम',
      email: 'ईमेल पता',
      message: 'आपका संदेश',
      send: 'संदेश भेजें',
      sending: 'भेज रहे हैं...',
      successTitle: 'संदेश भेजा गया!',
      successMessage: 'हम 24-48 घंटों के भीतर आपसे संपर्क करेंगे।',
      location: 'हमारा स्थान'
    },
    gu: {
      title: 'અમારો સંપર્ક કરો',
      subtitle: 'ગ્રામ પંચાયત કાર્યાલય સાથે સંપર્ક કરો',
      officeTitle: 'ગ્રામ પંચાયત કાર્યાલય',
      address: 'ગ્રામ પંચાયત ભવન, મુખ્ય માર્ગ',
      workingHours: 'કાર્ય સમય',
      monFri: 'સોમવાર - શુક્રવાર',
      timing: 'સવારે 10:00 - સાંજે 5:00',
      saturday: 'શનિવાર',
      satTiming: 'સવારે 10:00 - બપોરે 2:00',
      sunday: 'રવિવાર',
      closed: 'બંધ',
      emergency: 'કટોકટી સંપર્કો',
      emergencyNote: 'કટોકટી માટે, કૃપા કરીને આ નંબરો પર 24/7 કૉલ કરો',
      police: 'પોલીસ સ્ટેશન',
      medical: 'તબીબી કટોકટી',
      fire: 'ફાયર બ્રિગેડ',
      contactForm: 'અમને સંદેશ મોકલો',
      formNote: 'કોઈ પ્રશ્ન કે સૂચન છે? નીચેનું ફોર્મ ભરો',
      name: 'તમારું નામ',
      email: 'ઈમેલ સરનામું',
      message: 'તમારો સંદેશ',
      send: 'સંદેશ મોકલો',
      sending: 'મોકલી રહ્યા છે...',
      successTitle: 'સંદેશ મોકલ્યો!',
      successMessage: 'અમે 24-48 કલાકમાં તમારો સંપર્ક કરીશું.',
      location: 'અમારું સ્થાન'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const emergencyContacts = [
    {
      icon: Shield,
      title: t.police,
      number: '100',
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
    },
    {
      icon: Ambulance,
      title: t.medical,
      number: '108',
      color: 'bg-red-500/10 text-red-600 dark:text-red-400'
    },
    {
      icon: Flame,
      title: t.fire,
      number: '101',
      color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    toast.success(t.successTitle, {
      description: t.successMessage
    });

    // Reset success state after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  // Village coordinates (Dungarpur, Gujarat as example)
  const villageCoords = {
    lat: 23.8444,
    lng: 73.7143
  };

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t.title}
          </h1>
          <p className="text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Office Info & Emergency */}
          <div className="lg:col-span-1 space-y-6">
            {/* Office Details Card */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 border-b border-border">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building2 className="h-5 w-5 text-primary" />
                  {t.officeTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">{t.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedVillage?.name || 'Dungarpur'}, Gujarat, India
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <a href="tel:+917878123456" className="text-foreground hover:text-primary transition-colors">
                    +91 7878 123456
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:contact@village.gov.in" className="text-foreground hover:text-primary transition-colors">
                    contact@village.gov.in
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Working Hours Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  {t.workingHours}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">{t.monFri}</span>
                  <Badge variant="outline" className="font-mono">
                    {t.timing}
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">{t.saturday}</span>
                  <Badge variant="outline" className="font-mono">
                    {t.satTiming}
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">{t.sunday}</span>
                  <Badge variant="destructive">
                    {t.closed}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts Card */}
            <Card className="border-destructive/30 bg-destructive/5">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  {t.emergency}
                </CardTitle>
                <CardDescription>
                  {t.emergencyNote}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {emergencyContacts.map((contact) => (
                  <a
                    key={contact.number}
                    href={`tel:${contact.number}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-background hover:bg-muted transition-colors"
                  >
                    <div className={`p-2 rounded-full ${contact.color}`}>
                      <contact.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{contact.title}</p>
                    </div>
                    <span className="text-2xl font-bold text-primary font-mono">
                      {contact.number}
                    </span>
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Map & Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Section */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                  {t.location}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative w-full h-[300px] md:h-[350px]">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58500!2d${villageCoords.lng}!3d${villageCoords.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3960c0a9b6d8b0e3%3A0x8d6e3b6a0e0e0e0e!2sDungarpur%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                    title="Village Location Map"
                  />
                  {/* Map overlay with pin indicator */}
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-foreground">
                        {selectedVillage?.name || 'Dungarpur'} Panchayat
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  {t.contactForm}
                </CardTitle>
                <CardDescription>
                  {t.formNote}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {t.successTitle}
                    </h3>
                    <p className="text-muted-foreground">
                      {t.successMessage}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {t.name}
                        </label>
                        <Input
                          id="name"
                          type="text"
                          placeholder={t.name}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="bg-muted/50"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {t.email}
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={t.email}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-muted/50"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        {t.message}
                      </label>
                      <Textarea
                        id="message"
                        placeholder={t.message}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-muted/50 min-h-[120px]"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full sm:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                          {t.sending}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          {t.send}
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
