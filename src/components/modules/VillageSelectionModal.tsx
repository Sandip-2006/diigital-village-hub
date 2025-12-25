import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { villages, Village, getVillageByCoordinates } from '@/lib/villages';
import { getTranslation } from '@/lib/i18n';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Users, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const STORAGE_KEY = 'village-selection-shown';

export function VillageSelectionModal() {
  const { language, selectedVillage, setSelectedVillage } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedVillage, setDetectedVillage] = useState<Village | null>(null);
  const t = getTranslation(language);

  // Check if modal should show on first visit
  useEffect(() => {
    const hasShown = localStorage.getItem(STORAGE_KEY);
    if (!hasShown && !selectedVillage) {
      setIsOpen(true);
    }
  }, [selectedVillage]);

  const getVillageName = (v: Village) => {
    switch (language) {
      case 'hi': return v.nameHi;
      case 'gu': return v.nameGu;
      default: return v.name;
    }
  };

  const translations = {
    en: {
      title: 'Welcome! Select Your Village',
      subtitle: 'Choose your village to see relevant information and services',
      detectLocation: 'Detect My Location',
      detecting: 'Detecting location...',
      nearestVillage: 'Nearest village detected',
      orSelectManually: 'Or select manually',
      confirm: 'Confirm Selection',
      population: 'Population',
    },
    hi: {
      title: 'स्वागत है! अपना गाँव चुनें',
      subtitle: 'प्रासंगिक जानकारी और सेवाओं को देखने के लिए अपना गाँव चुनें',
      detectLocation: 'मेरा स्थान पता करें',
      detecting: 'स्थान का पता लगा रहे हैं...',
      nearestVillage: 'निकटतम गाँव का पता चला',
      orSelectManually: 'या मैन्युअल रूप से चुनें',
      confirm: 'चयन की पुष्टि करें',
      population: 'जनसंख्या',
    },
    gu: {
      title: 'સ્વાગત છે! તમારું ગામ પસંદ કરો',
      subtitle: 'સંબંધિત માહિતી અને સેવાઓ જોવા માટે તમારું ગામ પસંદ કરો',
      detectLocation: 'મારું સ્થાન શોધો',
      detecting: 'સ્થાન શોધી રહ્યા છીએ...',
      nearestVillage: 'નજીકનું ગામ મળ્યું',
      orSelectManually: 'અથવા જાતે પસંદ કરો',
      confirm: 'પસંદગીની પુષ્ટિ કરો',
      population: 'વસ્તી',
    },
  };

  const text = translations[language as keyof typeof translations] || translations.en;

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Location not supported', {
        description: 'Your browser does not support location detection.',
      });
      return;
    }

    setIsDetecting(true);
    setDetectedVillage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nearestVillage = getVillageByCoordinates(latitude, longitude);

        if (nearestVillage) {
          setDetectedVillage(nearestVillage);
          toast.success('Location detected!', {
            description: `You are near ${getVillageName(nearestVillage)}`,
          });
        } else {
          toast.info('No village found nearby', {
            description: 'Please select your village manually.',
          });
        }
        setIsDetecting(false);
      },
      (error) => {
        console.error('Location error:', error);
        toast.error('Location Error', {
          description: 'Could not detect your location. Please select manually.',
        });
        setIsDetecting(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSelectVillage = (village: Village) => {
    setSelectedVillage(village);
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
    toast.success(`${getVillageName(village)} selected!`);
  };

  const handleConfirmDetected = () => {
    if (detectedVillage) {
      handleSelectVillage(detectedVillage);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl">{text.title}</DialogTitle>
          <DialogDescription>{text.subtitle}</DialogDescription>
        </DialogHeader>

        {/* Geolocation Button */}
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full h-14 gap-3 text-base"
            onClick={detectLocation}
            disabled={isDetecting}
          >
            {isDetecting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {text.detecting}
              </>
            ) : (
              <>
                <Navigation className="h-5 w-5" />
                {text.detectLocation}
              </>
            )}
          </Button>

          {/* Detected Village */}
          {detectedVillage && (
            <Card className="p-4 border-primary bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{text.nearestVillage}</p>
                  <p className="font-semibold text-lg">{getVillageName(detectedVillage)}</p>
                  <p className="text-sm text-muted-foreground">
                    {detectedVillage.taluka}, {detectedVillage.district}
                  </p>
                </div>
                <Button size="sm" onClick={handleConfirmDetected}>
                  {text.confirm}
                </Button>
              </div>
            </Card>
          )}

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {text.orSelectManually}
              </span>
            </div>
          </div>

          {/* Village List */}
          <div className="grid gap-2">
            {villages.map((village) => (
              <Card
                key={village.id}
                className={`p-4 cursor-pointer transition-all hover:border-primary hover:bg-primary/5 ${
                  selectedVillage?.id === village.id ? 'border-primary bg-primary/10' : ''
                }`}
                onClick={() => handleSelectVillage(village)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {getVillageName(village)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {village.taluka}, {village.district}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="gap-1">
                      <Users className="h-3 w-3" />
                      {village.population.toLocaleString()}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
