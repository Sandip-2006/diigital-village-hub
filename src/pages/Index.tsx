import { MainLayout } from '@/components/layout/MainLayout';
import { HeroSlider } from '@/components/modules/HeroSlider';
import { AdvertisementSlider } from '@/components/modules/AdvertisementSlider';
import { AnnouncementTicker } from '@/components/modules/AnnouncementTicker';
import { QuickLinksGrid } from '@/components/modules/QuickLinksGrid';
import { SchemeCards } from '@/components/modules/SchemeCards';
import { UpcomingEvents } from '@/components/modules/UpcomingEvents';
import { WeatherWidget } from '@/components/modules/WeatherWidget';
import { EmergencyContacts } from '@/components/modules/EmergencyContacts';
import { WhatsAppOptIn } from '@/components/modules/WhatsAppOptIn';

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Slider */}
      <HeroSlider />

      {/* WhatsApp Opt-in Banner */}
      <WhatsAppOptIn />

      {/* Announcement Ticker */}
      <AnnouncementTicker />

      {/* Quick Links */}
      <QuickLinksGrid />

      {/* Advertisement Slider */}
      <section className="py-8 bg-muted/30">
        <div className="container">
          <AdvertisementSlider />
        </div>
      </section>

      {/* Schemes Section */}
      <SchemeCards />

      {/* Events & Sidebar Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upcoming Events */}
            <div className="lg:col-span-2">
              <UpcomingEvents />
            </div>

            {/* Sidebar Widgets */}
            <div className="space-y-6">
              <WeatherWidget />
              <EmergencyContacts />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
