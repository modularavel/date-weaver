import { useState } from 'react';
import { MapPin, Calendar, Heart, MessageCircle, ChevronLeft, CheckCheck } from 'lucide-react';
import { toast } from 'sonner';

export type UserDetailProps = {
  id: string;
  name: string;
  age: number;
  location: string;
  images: string[];
  isPremium?: boolean;
  isVerified?: boolean;
  bio?: string;
  details?: {
    [key: string]: string | number | boolean;
  };
  isOnline?: boolean;
};

const ProfileDetail = ({
  id,
  name,
  age,
  location,
  images,
  isPremium = false,
  isVerified = false,
  bio = '',
  details = {},
  isOnline = false,
}: UserDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const handleNextImage = () => {
    setIsImageLoaded(false);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const handlePrevImage = () => {
    setIsImageLoaded(false);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const handleSendMessage = () => {
    toast.success(`Starting conversation with ${name}`);
  };
  
  const handleAddFavorite = () => {
    toast.success(`${name} added to favorites`);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in animate-slide-in">
      <div className="bg-white dark:bg-slate-900 shadow-md rounded-xl overflow-hidden">
        {/* Images Section */}
        <div className="relative aspect-[4/5] md:aspect-[16/9] bg-slate-200">
          {!isImageLoaded && (
            <div className="absolute inset-0 image-loading" />
          )}
          
          <img
            src={images[currentImageIndex]}
            alt={name}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Image Navigation */}
          {images.length > 1 && (
            <>
              <button 
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button 
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6 rotate-180" />
              </button>
              
              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsImageLoaded(false);
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-white w-5'
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Status Indicators */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isPremium && (
              <span className="premium-badge">
                <span className="mr-1">★</span> Premium
              </span>
            )}
            
            {isVerified && (
              <span className="verified-badge">
                <CheckCheck className="w-3 h-3 mr-0.5" /> Verified
              </span>
            )}
            
            {isOnline && (
              <span className="bg-emerald-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                Online now
              </span>
            )}
          </div>
        </div>
        
        {/* Profile Info */}
        <div className="p-5">
          {/* Basic Info */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{name}, {age}</h1>
              
              <div className="flex gap-2">
                <button
                  onClick={handleSendMessage}
                  className="btn-primary flex items-center gap-1"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message</span>
                </button>
                
                <button
                  onClick={handleAddFavorite}
                  className="btn-secondary flex items-center gap-1"
                >
                  <Heart className="w-4 h-4" />
                  <span className="sr-only md:not-sr-only">Favorite</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-slate-600 mt-2">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Joined recently</span>
              </div>
            </div>
            
            {bio && (
              <div className="mt-4 text-slate-700">
                <h3 className="text-sm font-semibold text-slate-500 mb-1">Bio</h3>
                <p className="text-sm leading-relaxed">{bio}</p>
              </div>
            )}
          </div>
          
          {/* Details Section */}
          {Object.keys(details).length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-500 mb-2">Details</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {Object.entries(details).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-500">{key}</span>
                    <span className="font-medium">{value.toString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
