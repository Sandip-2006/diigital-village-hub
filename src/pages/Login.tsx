import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { Phone, Lock, Shield, Loader2, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const { language, setAuthenticated, setUserName } = useStore();
  const navigate = useNavigate();
  const t = getTranslation(language);
  
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const translations = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your Digital Village Portal account',
      mobileLabel: 'Mobile Number',
      mobilePlaceholder: 'Enter your 10-digit mobile number',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      otpLabel: 'OTP',
      otpPlaceholder: 'Enter 6-digit OTP',
      sendOtp: 'Send OTP',
      resendOtp: 'Resend OTP',
      loginWithPassword: 'Password Login',
      loginWithOtp: 'OTP Login',
      login: 'Sign In',
      noAccount: "Don't have an account?",
      register: 'Register',
      forgotPassword: 'Forgot Password?',
    },
    hi: {
      title: 'वापसी पर स्वागत है',
      subtitle: 'अपने डिजिटल ग्राम पोर्टल खाते में साइन इन करें',
      mobileLabel: 'मोबाइल नंबर',
      mobilePlaceholder: 'अपना 10 अंकों का मोबाइल नंबर दर्ज करें',
      passwordLabel: 'पासवर्ड',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      otpLabel: 'ओटीपी',
      otpPlaceholder: '6 अंकों का ओटीपी दर्ज करें',
      sendOtp: 'ओटीपी भेजें',
      resendOtp: 'ओटीपी पुनः भेजें',
      loginWithPassword: 'पासवर्ड लॉगिन',
      loginWithOtp: 'ओटीपी लॉगिन',
      login: 'साइन इन करें',
      noAccount: 'खाता नहीं है?',
      register: 'पंजीकरण करें',
      forgotPassword: 'पासवर्ड भूल गए?',
    },
    gu: {
      title: 'પાછા આવકાર છે',
      subtitle: 'તમારા ડિજિટલ ગામ પોર્ટલ એકાઉન્ટમાં સાઇન ઇન કરો',
      mobileLabel: 'મોબાઇલ નંબર',
      mobilePlaceholder: 'તમારો 10-અંકનો મોબાઇલ નંબર દાખલ કરો',
      passwordLabel: 'પાસવર્ડ',
      passwordPlaceholder: 'તમારો પાસવર્ડ દાખલ કરો',
      otpLabel: 'ઓટીપી',
      otpPlaceholder: '6-અંકનો ઓટીપી દાખલ કરો',
      sendOtp: 'ઓટીપી મોકલો',
      resendOtp: 'ઓટીપી ફરીથી મોકલો',
      loginWithPassword: 'પાસવર્ડ લૉગિન',
      loginWithOtp: 'ઓટીપી લૉગિન',
      login: 'સાઇન ઇન કરો',
      noAccount: 'એકાઉન્ટ નથી?',
      register: 'નોંધણી કરો',
      forgotPassword: 'પાસવર્ડ ભૂલી ગયા?',
    },
  };

  const text = translations[language as keyof typeof translations] || translations.en;

  const validateMobile = (num: string) => /^[6-9]\d{9}$/.test(num);

  const handleSendOtp = async () => {
    if (!validateMobile(mobile)) {
      toast.error('Invalid mobile number', {
        description: 'Please enter a valid 10-digit mobile number',
      });
      return;
    }

    setIsLoading(true);
    // Simulate OTP sending
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setOtpSent(true);
    setIsLoading(false);
    toast.success('OTP Sent!', {
      description: `A 6-digit OTP has been sent to +91 ${mobile}`,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateMobile(mobile)) {
      toast.error('Invalid mobile number');
      return;
    }

    if (loginMethod === 'password' && !password) {
      toast.error('Please enter your password');
      return;
    }

    if (loginMethod === 'otp' && otp.length !== 6) {
      toast.error('Please enter valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setAuthenticated(true);
    setUserName('Village User');
    setIsLoading(false);
    
    toast.success('Login successful!');
    navigate('/dashboard');
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <Card className="border-border/50 shadow-xl">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">{text.title}</CardTitle>
              <CardDescription>{text.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={loginMethod} onValueChange={(v) => setLoginMethod(v as 'password' | 'otp')}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="password" className="gap-2">
                    <Lock className="h-4 w-4" />
                    {text.loginWithPassword}
                  </TabsTrigger>
                  <TabsTrigger value="otp" className="gap-2">
                    <Smartphone className="h-4 w-4" />
                    {text.loginWithOtp}
                  </TabsTrigger>
                </TabsList>

                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Mobile Number */}
                  <div className="space-y-2">
                    <Label htmlFor="mobile">{text.mobileLabel}</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder={text.mobilePlaceholder}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="pl-10"
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>

                  <TabsContent value="password" className="mt-0 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">{text.passwordLabel}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder={text.passwordPlaceholder}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                        {text.forgotPassword}
                      </Link>
                    </div>
                  </TabsContent>

                  <TabsContent value="otp" className="mt-0 space-y-4">
                    {!otpSent ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleSendOtp}
                        disabled={isLoading || !validateMobile(mobile)}
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Smartphone className="h-4 w-4 mr-2" />
                        )}
                        {text.sendOtp}
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="otp">{text.otpLabel}</Label>
                          <Input
                            id="otp"
                            type="text"
                            placeholder={text.otpPlaceholder}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            className="text-center text-2xl tracking-widest"
                            maxLength={6}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="link"
                          className="w-full"
                          onClick={handleSendOtp}
                        >
                          {text.resendOtp}
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <Button
                    type="submit"
                    className="w-full h-12"
                    disabled={isLoading || (loginMethod === 'otp' && !otpSent)}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : null}
                    {text.login}
                  </Button>
                </form>
              </Tabs>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                {text.noAccount}{' '}
                <Link to="/register" className="text-primary font-medium hover:underline">
                  {text.register}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
