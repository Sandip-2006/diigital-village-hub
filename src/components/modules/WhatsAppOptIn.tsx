import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Bell } from 'lucide-react';
import { useState } from 'react';

export function WhatsAppOptIn() {
  const { language, whatsappOptedIn, setWhatsappOptedIn } = useStore();
  const t = getTranslation(language);
  const [dismissed, setDismissed] = useState(false);

  if (whatsappOptedIn || dismissed) return null;

  const titles = {
    en: 'Get Updates on WhatsApp',
    hi: 'व्हाट्सएप पर अपडेट प्राप्त करें',
    gu: 'વોટ્સએપ પર અપડેટ્સ મેળવો',
  };

  const descriptions = {
    en: 'Receive instant notifications about schemes, events, and village announcements directly on WhatsApp.',
    hi: 'योजनाओं, कार्यक्रमों और ग्राम घोषणाओं के बारे में सीधे व्हाट्सएप पर तुरंत सूचनाएं प्राप्त करें।',
    gu: 'યોજનાઓ, કાર્યક્રમો અને ગામની જાહેરાતો વિશે સીધા વોટ્સએપ પર ત્વરિત સૂચનાઓ મેળવો.',
  };

  const subscribeText = {
    en: 'Subscribe Now',
    hi: 'अभी सब्सक्राइब करें',
    gu: 'હવે સબ્સ્ક્રાઇબ કરો',
  };

  return (
    <section className="py-4">
      <div className="container">
        <Card variant="glass" className="relative overflow-hidden border-success/30 bg-success/5">
          <div className="absolute inset-0 bg-gradient-to-r from-success/10 to-primary/10" />
          <div className="relative p-4 sm:p-6">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setDismissed(true)}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-success/20 flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-success" />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                  <Bell className="h-4 w-4 text-success animate-pulse" />
                  <h3 className="text-lg font-semibold text-foreground">{titles[language]}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{descriptions[language]}</p>
              </div>

              <Button
                variant="hero"
                className="flex-shrink-0 bg-success hover:bg-success/90 text-white gap-2"
                onClick={() => setWhatsappOptedIn(true)}
              >
                <MessageCircle className="h-4 w-4" />
                {subscribeText[language]}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
