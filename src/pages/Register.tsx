import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { Phone, Lock, User, Loader2, UserPlus, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

const Register = () => {
  const { language, setAuthenticated, setUserName } = useStore();
  const navigate = useNavigate();
  const t = getTranslation(language);
  
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const translations = {
    en: {
      title: 'Create Account',
      subtitle: 'Register for Digital Village Portal',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'Enter your full name',
      mobileLabel: 'Mobile Number',
      mobilePlaceholder: 'Enter your 10-digit mobile number',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Create a password (min 6 characters)',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: 'Re-enter your password',
      sendOtp: 'Verify Mobile',
      otpLabel: 'Enter OTP',
      otpPlaceholder: 'Enter 6-digit OTP',
      verifyOtp: 'Verify OTP',
      verified: 'Mobile Verified',
      agreeTerms: 'I agree to the Terms of Service and Privacy Policy',
      register: 'Create Account',
      haveAccount: 'Already have an account?',
      login: 'Sign In',
    },
    hi: {
      title: 'खाता बनाएं',
      subtitle: 'डिजिटल ग्राम पोर्टल के लिए पंजीकरण करें',
      fullNameLabel: 'पूरा नाम',
      fullNamePlaceholder: 'अपना पूरा नाम दर्ज करें',
      mobileLabel: 'मोबाइल नंबर',
      mobilePlaceholder: 'अपना 10 अंकों का मोबाइल नंबर दर्ज करें',
      passwordLabel: 'पासवर्ड',
      passwordPlaceholder: 'पासवर्ड बनाएं (न्यूनतम 6 अक्षर)',
      confirmPasswordLabel: 'पासवर्ड की पुष्टि करें',
      confirmPasswordPlaceholder: 'अपना पासवर्ड पुनः दर्ज करें',
      sendOtp: 'मोबाइल सत्यापित करें',
      otpLabel: 'ओटीपी दर्ज करें',
      otpPlaceholder: '6 अंकों का ओटीपी दर्ज करें',
      verifyOtp: 'ओटीपी सत्यापित करें',
      verified: 'मोबाइल सत्यापित',
      agreeTerms: 'मैं सेवा की शर्तों और गोपनीयता नीति से सहमत हूं',
      register: 'खाता बनाएं',
      haveAccount: 'पहले से खाता है?',
      login: 'साइन इन करें',
    },
    gu: {
      title: 'એકાઉન્ટ બનાવો',
      subtitle: 'ડિજિટલ ગામ પોર્ટલ માટે નોંધણી કરો',
      fullNameLabel: 'પૂરું નામ',
      fullNamePlaceholder: 'તમારું પૂરું નામ દાખલ કરો',
      mobileLabel: 'મોબાઇલ નંબર',
      mobilePlaceholder: 'તમારો 10-અંકનો મોબાઇલ નંબર દાખલ કરો',
      passwordLabel: 'પાસવર્ડ',
      passwordPlaceholder: 'પાસવર્ડ બનાવો (ન્યૂનતમ 6 અક્ષરો)',
      confirmPasswordLabel: 'પાસવર્ડની પુષ્ટિ કરો',
      confirmPasswordPlaceholder: 'તમારો પાસવર્ડ ફરીથી દાખલ કરો',
      sendOtp: 'મોબાઇલ ચકાસો',
      otpLabel: 'ઓટીપી દાખલ કરો',
      otpPlaceholder: '6-અંકનો ઓટીપી દાખલ કરો',
      verifyOtp: 'ઓટીપી ચકાસો',
      verified: 'મોબાઇલ ચકાસાયેલ',
      agreeTerms: 'હું સેવાની શરતો અને ગોપનીયતા નીતિ સાથે સંમત છું',
      register: 'એકાઉન્ટ બનાવો',
      haveAccount: 'પહેલેથી એકાઉન્ટ છે?',
      login: 'સાઇન ઇન કરો',
    },
  };

  const text = translations[language as keyof typeof translations] || translations.en;

  const validateMobile = (num: string) => /^[6-9]\d{9}$/.test(num);

  const handleSendOtp = async () => {
    if (!validateMobile(formData.mobile)) {
      toast.error('Invalid mobile number', {
        description: 'Please enter a valid 10-digit mobile number',
      });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setOtpSent(true);
    setIsLoading(false);
    toast.success('OTP Sent!', {
      description: `A 6-digit OTP has been sent to +91 ${formData.mobile}`,
    });
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setOtpVerified(true);
    setIsLoading(false);
    toast.success('Mobile verified successfully!');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }

    if (!otpVerified) {
      toast.error('Please verify your mobile number first');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setAuthenticated(true);
    setUserName(formData.fullName);
    setIsLoading(false);
    
    toast.success('Registration successful!');
    navigate('/dashboard');
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <Card className="border-border/50 shadow-xl">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <UserPlus className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">{text.title}</CardTitle>
              <CardDescription>{text.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">{text.fullNameLabel}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder={text.fullNamePlaceholder}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                  <Label htmlFor="mobile">{text.mobileLabel}</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder={text.mobilePlaceholder}
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                        className="pl-10"
                        maxLength={10}
                        disabled={otpVerified}
                        required
                      />
                    </div>
                    {!otpVerified && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleSendOtp}
                        disabled={isLoading || !validateMobile(formData.mobile)}
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Smartphone className="h-4 w-4" />}
                      </Button>
                    )}
                  </div>
                </div>

                {/* OTP Verification */}
                {otpSent && !otpVerified && (
                  <div className="space-y-2">
                    <Label htmlFor="otp">{text.otpLabel}</Label>
                    <div className="flex gap-2">
                      <Input
                        id="otp"
                        type="text"
                        placeholder={text.otpPlaceholder}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="text-center text-xl tracking-widest"
                        maxLength={6}
                      />
                      <Button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={isLoading || otp.length !== 6}
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : text.verifyOtp}
                      </Button>
                    </div>
                  </div>
                )}

                {otpVerified && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-600 text-sm">
                    <Smartphone className="h-4 w-4" />
                    {text.verified} ✓
                  </div>
                )}

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">{text.passwordLabel}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder={text.passwordPlaceholder}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{text.confirmPasswordLabel}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder={text.confirmPasswordPlaceholder}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                    {text.agreeTerms}
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={isLoading || !otpVerified || !agreedToTerms}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  {text.register}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                {text.haveAccount}{' '}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  {text.login}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
