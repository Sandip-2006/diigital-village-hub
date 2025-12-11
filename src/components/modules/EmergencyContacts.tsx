import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, AlertTriangle, Ambulance, Shield, Flame, Users } from 'lucide-react';

interface EmergencyContact {
  name: string;
  nameHi: string;
  nameGu: string;
  number: string;
  icon: React.ReactNode;
  color: string;
}

const emergencyContacts: EmergencyContact[] = [
  {
    name: 'Police',
    nameHi: 'पुलिस',
    nameGu: 'પોલીસ',
    number: '100',
    icon: <Shield className="h-5 w-5" />,
    color: 'text-info',
  },
  {
    name: 'Ambulance',
    nameHi: 'एम्बुलेंस',
    nameGu: 'એમ્બ્યુલન્સ',
    number: '108',
    icon: <Ambulance className="h-5 w-5" />,
    color: 'text-destructive',
  },
  {
    name: 'Fire',
    nameHi: 'अग्निशमन',
    nameGu: 'ફાયર',
    number: '101',
    icon: <Flame className="h-5 w-5" />,
    color: 'text-warning',
  },
  {
    name: 'Women Helpline',
    nameHi: 'महिला हेल्पलाइन',
    nameGu: 'મહિલા હેલ્પલાઈન',
    number: '181',
    icon: <Users className="h-5 w-5" />,
    color: 'text-secondary',
  },
];

export function EmergencyContacts() {
  const { language } = useStore();
  const t = getTranslation(language);

  const getName = (c: EmergencyContact) => {
    switch (language) {
      case 'hi': return c.nameHi;
      case 'gu': return c.nameGu;
      default: return c.name;
    }
  };

  return (
    <Card variant="glass" className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 bg-destructive/10 border-b border-destructive/20">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h3 className="font-semibold text-foreground">{t.home.emergencyContacts}</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 p-4">
          {emergencyContacts.map((contact) => (
            <a
              key={contact.number}
              href={`tel:${contact.number}`}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors group"
            >
              <div className={`p-2 rounded-lg bg-card ${contact.color}`}>
                {contact.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {getName(contact)}
                </p>
                <p className="text-lg font-bold text-primary">{contact.number}</p>
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
