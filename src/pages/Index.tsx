import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Photo {
  id: number;
  url: string;
  title: string;
  description: string;
}

const photos: Photo[] = [
  {
    id: 1,
    url: 'https://cdn.poehali.dev/files/a83e217a-35f4-4f88-a450-bfe59eed060b.png',
    title: 'Яркие воспоминания',
    description: 'Особенный момент жизни'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800',
    title: 'Закат на пляже',
    description: 'Тёплый вечер у моря'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    title: 'Горные вершины',
    description: 'Путешествие в горы'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    title: 'Туманное утро',
    description: 'Рассвет в горах'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800',
    title: 'Цветущая весна',
    description: 'Весенние краски'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    title: 'Тропический рай',
    description: 'Отдых на острове'
  }
];

export default function Index() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleNext = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[prevIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'Escape') setSelectedPhoto(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Галерея воспоминаний
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Каждое фото — это история, запечатлённая в момент времени
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer animate-scale-in shadow-lg hover:shadow-2xl transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-bold text-white mb-2">{photo.title}</h3>
                  <p className="text-white/80">{photo.description}</p>
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Icon name="Expand" size={20} className="text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 z-10"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhoto(null);
            }}
          >
            <Icon name="X" size={24} className="text-white" />
          </button>

          <button
            className="absolute left-4 md:left-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-4 transition-all duration-300 hover:scale-110 hover:-translate-x-1"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
          >
            <Icon name="ChevronLeft" size={32} className="text-white" />
          </button>

          <button
            className="absolute right-4 md:right-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-4 transition-all duration-300 hover:scale-110 hover:translate-x-1"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            <Icon name="ChevronRight" size={32} className="text-white" />
          </button>

          <div
            className="max-w-6xl w-full max-h-[90vh] animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="w-full h-full object-contain rounded-2xl"
            />
            
            <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {selectedPhoto.title}
              </h2>
              <p className="text-lg text-white/70">{selectedPhoto.description}</p>
              <p className="text-sm text-white/50 mt-2">
                {photos.findIndex(p => p.id === selectedPhoto.id) + 1} / {photos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
