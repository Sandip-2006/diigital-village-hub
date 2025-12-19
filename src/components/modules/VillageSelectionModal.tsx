import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { villages, Village, getVillageByCoordinates } from '@/lib/villages';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin, Navigation, Loader2, Check } from 'lucide-react';

export function VillageSelectionModal() {
  const { language, selectedVillage, setSelectedVillage, isLocationDetecting, setLocationDetecting } = useStore();
  const t = getTranslation(language);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>('');
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [gpsSuccess, setGpsSuccess] = useState(false);

  // Check if first visit (no village selected)
  useEffect(() => {
    if (!selectedVillage) {
      setIsOpen(true);
    }
  }, [selectedVillage]);

  const getVillageName = (v: Village) => {
    if (language === 'hi') return v.nameHi;
    if (language === 'gu') return v.nameGu;
    return v.name;
  };

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      setGpsError('GPS not supported');
      return;
    }

    setLocationDetecting(true);
    setGpsError(null);
    setGpsSuccess(false);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nearestVillage = getVillageByCoordinates(latitude, longitude);
        
        if (nearestVillage) {
          setSelectedId(nearestVillage.id);
          setGpsSuccess(true);
        } else {
          // Default to first village if no match
          setSelectedId(villages[0].id);
          setGpsError('No nearby village found. Please select manually.');
        }
        setLocationDetecting(false);
      },
      (error) => {
        setLocationDetecting(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGpsError('Location permission denied');
            break;
          case error.POSITION_UNAVAILABLE:
            setGpsError('Location unavailable');
            break;
          default:
            setGpsError('Unable to detect location');
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleConfirm = () => {
    const village = villages.find(v => v.id === selectedId);
    if (village) {
      setSelectedVillage(village);
      setIsOpen(false);
    }
  };

  const selectVillageText = language === 'hi' ? 'अपना गाँव चुनें' : language === 'gu' ? 'તમારું ગામ પસંદ કરો' : 'Select Your Village';
  const detectLocationText = language === 'hi' ? 'स्थान पहचानें' : language === 'gu' ? 'સ્થાન શોધો' : 'Detect My Location';
  const confirmText = language === 'hi' ? 'पुष्टि करें' : language === 'gu' ? 'પુષ્ટિ કરો' : 'Confirm';
  const orText = language === 'hi' ? 'या' : language === 'gu' ? 'અથવા' : 'or';
  const welcomeText = language === 'hi' ? 'डिजिटल ग्राम पोर्टल में आपका स्वागत है' : language === 'gu' ? 'ડિજિટલ ગામ પોર્ટલમાં આપનું સ્વાગત છે' : 'Welcome to Digital Village Portal';
  const selectManuallyText = language === 'hi' ? 'नीचे से अपना गाँव चुनें' : language === 'gu' ? 'નીચેથી તમારું ગામ પસંદ કરો' : 'Select your village below';

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-xl">{selectVillageText}</DialogTitle>
          <DialogDescription>{welcomeText}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* GPS Detection Button */}
          <Button
            onClick={detectLocation}
            disabled={isLocationDetecting}
            className="w-full gap-2"
            variant="secondary"
          >
            {isLocationDetecting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Detecting...</span>
              </>
            ) : gpsSuccess ? (
              <>
                <Check className="h-4 w-4" />
                <span>Location Detected!</span>
              </>
            ) : (
              <>
                <Navigation className="h-4 w-4" />
                <span>{detectLocationText}</span>
              </>
            )}
          </Button>

          {gpsError && (
            <p className="text-sm text-destructive text-center">{gpsError}</p>
          )}

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">{orText}</span>
            </div>
          </div>

          {/* Manual Selection */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground text-center">{selectManuallyText}</p>
            <Select value={selectedId} onValueChange={setSelectedId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={selectVillageText} />
              </SelectTrigger>
              <SelectContent>
                {villages.map((village) => (
                  <SelectItem key={village.id} value={village.id}>
                    <div className="flex items-center gap-2">
                      <span>{getVillageName(village)}</span>
                      <span className="text-muted-foreground text-xs">({village.taluka})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Confirm Button */}
          <Button
            onClick={handleConfirm}
            disabled={!selectedId}
            className="w-full"
          >
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}