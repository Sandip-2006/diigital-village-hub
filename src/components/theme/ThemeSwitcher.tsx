import { useStore } from '@/store/useStore';
import { festivalThemes, ThemeId } from '@/lib/themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Palette } from 'lucide-react';

export function ThemeSwitcher() {
  const { theme, setTheme, language } = useStore();
  const currentTheme = festivalThemes.find(t => t.id === theme);

  const getThemeName = (t: typeof festivalThemes[0]) => {
    switch (language) {
      case 'hi': return t.nameHi;
      case 'gu': return t.nameGu;
      default: return t.name;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="glass" size="sm" className="gap-2">
          <span className="text-lg">{currentTheme?.emoji}</span>
          <Palette className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-card border-border">
        {festivalThemes.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`flex items-center gap-3 cursor-pointer ${theme === t.id ? 'bg-primary/10' : ''}`}
          >
            <span className="text-xl">{t.emoji}</span>
            <div className="flex-1">
              <p className="font-medium">{getThemeName(t)}</p>
              <p className="text-xs text-muted-foreground">{t.description.slice(0, 25)}...</p>
            </div>
            {theme === t.id && (
              <div className="h-2 w-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
