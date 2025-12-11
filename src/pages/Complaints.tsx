import { MainLayout } from '@/components/layout/MainLayout';
import { useStore } from '@/store/useStore';
import { getTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Upload, Send, FileText } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const Complaints = () => {
  const { language } = useStore();
  const t = getTranslation(language);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: 'Complaint Submitted!', description: 'Your complaint ID: CMP-2024-00123' });
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground">{t.complaints.title}</h1>
            <p className="text-muted-foreground mt-2">Submit and track your grievances</p>
          </div>

          <Card variant="glass" className="animate-fade-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" />New Complaint</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.complaints.category}</label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="water">Water Supply</SelectItem>
                      <SelectItem value="electricity">Electricity</SelectItem>
                      <SelectItem value="road">Roads</SelectItem>
                      <SelectItem value="sanitation">Sanitation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.complaints.description}</label>
                  <Textarea placeholder="Describe your complaint in detail..." rows={4} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.complaints.location}</label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter location" className="flex-1" />
                    <Button type="button" variant="outline" size="icon"><MapPin className="h-4 w-4" /></Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.complaints.attachFile}</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click or drag files to upload</p>
                  </div>
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full gap-2" disabled={loading}>
                  {loading ? 'Submitting...' : <><Send className="h-4 w-4" />{t.complaints.submitComplaint}</>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Complaints;
