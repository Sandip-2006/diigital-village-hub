import { useStore } from '@/store/useStore';
import { villages, Village, getVillageByCoordinates } from '@/lib/villages';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MapPin, Navigation, ChevronDown, Users } from 'lucide-react';
import { getTranslation } from '@/lib/i18n';
import { toast } from '@/hooks/use-toast';

export function VillagePicker() {
  const { selectedVillage, setSelectedVillage, language, isLocationDetecting, setLocationDetecting } = useStore();
  const t = getTranslation(language);

  const getVillageName = (v: Village) => {
    switch (language) {
      case 'hi': return v.nameHi;
      case 'gu': return v.nameGu;
      default: return v.name;
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: 'Location not supported',
        description: 'Your browser does not support location detection.',
        variant: 'destructive',
      });
      return;
    }

    setLocationDetecting(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nearestVillage = getVillageByCoordinates(latitude, longitude);
        
        if (nearestVillage) {
          setSelectedVillage(nearestVillage);
          toast({
            title: 'Village Detected!',
            description: `You are near ${getVillageName(nearestVillage)}`,
          });
        } else {
          // Default to first village if none found nearby
          setSelectedVillage(villages[0]);
          toast({
            title: 'No village found nearby',
            description: `Defaulting to ${getVillageName(villages[0])}`,
          });
        }
        setLocationDetecting(false);
      },
      (error) => {
        console.error('Location error:', error);
        toast({
          title: 'Location Error',
          description: 'Could not detect your location. Please select manually.',
          variant: 'destructive',
        });
        setLocationDetecting(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="glass" className="gap-2 min-w-[200px] justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-medium">
              {selectedVillage ? getVillageName(selectedVillage) : t.common.selectVillage}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64 bg-card border-border">
        <div className="px-2 py-1.5">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={detectLocation}
            disabled={isLocationDetecting}
          >
            <Navigation className={`h-4 w-4 ${isLocationDetecting ? 'animate-spin' : ''}`} />
            {isLocationDetecting ? 'Detecting...' : t.home.detectLocation}
          </Button>
        </div>
        <DropdownMenuSeparator />
        {villages.map((village) => (
          <DropdownMenuItem
            key={village.id}
            onClick={() => setSelectedVillage(village)}
            className={`flex items-center gap-3 cursor-pointer ${
              selectedVillage?.id === village.id ? 'bg-primary/10' : ''
            }`}
          >
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium">{getVillageName(village)}</p>
              <p className="text-xs text-muted-foreground">
                {village.taluka}, {village.district}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              {village.population.toLocaleString()}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
