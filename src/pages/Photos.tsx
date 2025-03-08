
import { useState } from 'react';
import Header from '@/components/Header';
import PhotoGallery from '@/components/PhotoGallery';
import { type Photo } from '@/components/PhotoGallery';

// Mock photos data
const mockPhotos: Photo[] = [
  {
    id: '1',
    url: '/lovable-uploads/7205855e-5f82-453b-9efb-b9cf8b67bbd3.png',
    status: 'approved',
    isProfile: true,
  },
  {
    id: '2',
    url: '/lovable-uploads/d75d8be6-fbdf-49a2-9880-190c34b0748f.png',
    status: 'approved',
  },
  {
    id: '3',
    url: '/lovable-uploads/3b14247a-0fb7-43f6-9107-08f292b71528.png',
    status: 'approved',
  },
  {
    id: '4',
    url: '/lovable-uploads/246eecfa-a0d5-4282-a2c0-2d094d4c20f2.png',
    status: 'approved',
  },
  {
    id: '5',
    url: '/lovable-uploads/aaae5426-fc95-4c3e-b6e5-7d86e9ee04df.png',
    status: 'approved',
  },
  {
    id: '6',
    url: '/lovable-uploads/f7ab97fe-3a37-4f30-b4cf-f7dda4580058.png',
    status: 'pending',
  },
  {
    id: '7',
    url: '/lovable-uploads/08da76f3-7d52-4803-b910-90cb2b1921fe.png',
    status: 'rejected',
  },
];

const Photos = () => {
  const [photos, setPhotos] = useState<Photo[]>(mockPhotos);
  
  const handleMakeProfile = (photoId: string) => {
    setPhotos(photos.map(photo => ({
      ...photo,
      isProfile: photo.id === photoId,
    })));
  };
  
  const handleDeletePhoto = (photoId: string) => {
    setPhotos(photos.filter(photo => photo.id !== photoId));
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 animate-fade-in">
        <div className="glass-card rounded-xl overflow-hidden p-6">
          <h1 className="text-2xl font-bold mb-6">My photos</h1>
          
          <PhotoGallery 
            photos={photos}
            canEdit={true}
            onMakeProfile={handleMakeProfile}
            onDelete={handleDeletePhoto}
          />
        </div>
      </main>
    </div>
  );
};

export default Photos;
