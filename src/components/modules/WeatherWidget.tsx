import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets,
  Thermometer,
  AlertTriangle
} from 'lucide-react';

interface WeatherData {
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'partly-cloudy';
  humidity: number;
  windSpeed: number;
  forecast: {
    day: string;
    temp: number;
    condition: 'sunny' | 'cloudy' | 'rainy' | 'partly-cloudy';
  }[];
  alerts?: string[];
}

const mockWeather: WeatherData = {
  temp: 28,
  condition: 'sunny',
  humidity: 45,
  windSpeed: 12,
  forecast: [
    { day: 'Today', temp: 28, condition: 'sunny' },
    { day: 'Tomorrow', temp: 26, condition: 'partly-cloudy' },
    { day: 'Friday', temp: 24, condition: 'cloudy' },
    { day: 'Saturday', temp: 22, condition: 'rainy' },
  ],
  alerts: ['Light fog expected in morning hours'],
};

const conditionIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  'partly-cloudy': Cloud,
};

export function WeatherWidget() {
  const { language, selectedVillage } = useStore();
  const t = getTranslation(language);
  
  const WeatherIcon = conditionIcons[mockWeather.condition];

  return (
    <Card variant="glass" className="overflow-hidden">
      <CardContent className="p-0">
        {/* Main Weather Display */}
        <div className="p-6 bg-gradient-to-br from-info/20 to-info/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t.home.weatherUpdate}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {selectedVillage?.name || 'Your Location'}
              </p>
            </div>
            <Badge variant="info" className="capitalize">
              {mockWeather.condition.replace('-', ' ')}
            </Badge>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-3">
              <WeatherIcon className="h-12 w-12 text-warning animate-pulse" />
              <div>
                <span className="text-4xl font-bold text-foreground">{mockWeather.temp}</span>
                <span className="text-lg text-muted-foreground">°C</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Droplets className="h-4 w-4 text-info" />
                <span>{mockWeather.humidity}% Humidity</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Wind className="h-4 w-4 text-muted-foreground" />
                <span>{mockWeather.windSpeed} km/h Wind</span>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Alert */}
        {mockWeather.alerts && mockWeather.alerts.length > 0 && (
          <div className="px-6 py-3 bg-warning/10 border-t border-warning/20">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span className="text-warning font-medium">{mockWeather.alerts[0]}</span>
            </div>
          </div>
        )}

        {/* Forecast */}
        <div className="p-4 border-t border-border/50">
          <div className="grid grid-cols-4 gap-2">
            {mockWeather.forecast.map((day, i) => {
              const DayIcon = conditionIcons[day.condition];
              return (
                <div 
                  key={i}
                  className={`text-center p-2 rounded-lg ${i === 0 ? 'bg-primary/10' : 'hover:bg-muted/50'} transition-colors`}
                >
                  <p className="text-xs text-muted-foreground">{day.day}</p>
                  <DayIcon className="h-5 w-5 mx-auto my-1.5 text-muted-foreground" />
                  <p className="text-sm font-semibold">{day.temp}°</p>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
