import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useStore } from '@/store/useStore';
import { mockGallery, GalleryItem } from '@/lib/mockData';
import { X, ChevronLeft, ChevronRight, Calendar, Download, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

const Gallery = () => {
  const { language, selectedVillage } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const gallery = mockGallery.filter(g => !selectedVillage || g.villageId === selectedVillage.id);
  const filteredGallery = selectedCategory === 'all' 
    ? gallery 
    : gallery.filter(g => g.category === selectedCategory);

  const categories = [
    { key: 'all', label: { en: 'All', hi: 'सभी', gu: 'બધા' } },
    { key: 'events', label: { en: 'Events', hi: 'आयोजन', gu: 'કાર્યક્રમો' } },
    { key: 'development', label: { en: 'Development', hi: 'विकास', gu: 'વિકાસ' } },
    { key: 'culture', label: { en: 'Culture', hi: 'संस्कृति', gu: 'સંસ્કૃતિ' } },
    { key: 'nature', label: { en: 'Nature', hi: 'प्रकृति', gu: 'પ્રકૃતિ' } },
    { key: 'celebrities', label: { en: 'Celebrities', hi: 'हस्तियाँ', gu: 'હસ્તીઓ' } },
  ];

  const getTitle = (item: GalleryItem) =>
    language === 'hi' ? item.titleHi : language === 'gu' ? item.titleGu : item.title;

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredGallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
  };

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {language === 'hi' ? 'गैलरी' : language === 'gu' ? 'ગેલેરી' : 'Gallery'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'hi' ? 'गाँव की तस्वीरें और यादें' : 
             language === 'gu' ? 'ગામના ફોટા અને યાદો' : 'Photos and memories from the village'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat.key}
              variant={selectedCategory === cat.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat.key)}
            >
              {cat.label[language as keyof typeof cat.label] || cat.label.en}
            </Button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filteredGallery.map((item, index) => (
            <Card 
              key={item.id} 
              className="break-inside-avoid overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={getTitle(item)}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ZoomIn className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-medium text-sm mb-1">
                    {getTitle(item)}
                  </h3>
                  <div className="flex items-center gap-2 text-white/70 text-xs">
                    <Calendar className="h-3 w-3" />
                    {item.date}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredGallery.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              {language === 'hi' ? 'इस श्रेणी में कोई तस्वीर नहीं' : 
               language === 'gu' ? 'આ કેટેગરીમાં કોઈ ફોટો નથી' : 'No photos in this category'}
            </CardContent>
          </Card>
        )}

        {/* Lightbox Dialog */}
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-5xl w-full h-[90vh] p-0 bg-black/95 border-none">
            <DialogTitle className="sr-only">
              {filteredGallery[currentImageIndex] && getTitle(filteredGallery[currentImageIndex])}
            </DialogTitle>
            
            {filteredGallery[currentImageIndex] && (
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
                  onClick={() => setLightboxOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>

                {/* Navigation */}
                {filteredGallery.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 z-50 text-white hover:bg-white/20 h-12 w-12"
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 z-50 text-white hover:bg-white/20 h-12 w-12"
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    >
                      <ChevronRight className="h-8 w-8" />
                    </Button>
                  </>
                )}

                {/* Image */}
                <img
                  src={filteredGallery[currentImageIndex].image}
                  alt={getTitle(filteredGallery[currentImageIndex])}
                  className="max-w-full max-h-full object-contain"
                />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {getTitle(filteredGallery[currentImageIndex])}
                  </h3>
                  <div className="flex items-center gap-4 text-white/70 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {filteredGallery[currentImageIndex].date}
                    </span>
                    <Badge variant="secondary" className="capitalize">
                      {filteredGallery[currentImageIndex].category}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <span className="text-white/50 text-sm">
                      {currentImageIndex + 1} / {filteredGallery.length}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Gallery;
