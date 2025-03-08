
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Check, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export type UserCardProps = {
  id: string;
  name: string;
  age: number;
  location: string;
  image: string;
  isPremium?: boolean;
  isVerified?: boolean;
  infoText?: string;
  infoDetail?: string;
  isOnline?: boolean;
  showActions?: boolean;
};

const UserCard = ({
  id,
  name,
  age,
  location,
  image,
  isPremium = false,
  isVerified = false,
  infoText,
  infoDetail,
  isOnline = false,
  showActions = true,
}: UserCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite 
        ? `${name} removed from favorites` 
        : `${name} added to favorites`
    );
  };
  
  const handleMessageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`Starting conversation with ${name}`);
  };
  
  return (
    <Link
      to={`/profile/${id}`}
      className="user-card block glass-card rounded-xl overflow-hidden animate-fade-in"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 image-loading" />
        )}
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Status Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {isPremium && (
            <span className="premium-badge flex items-center">
              <span className="mr-1">★</span> Premium
            </span>
          )}
          {isVerified && (
            <span className="verified-badge flex items-center">
              <Check className="w-3 h-3 mr-0.5" /> Verified
            </span>
          )}
        </div>
        
        {/* Online Status */}
        {isOnline && (
          <span className="absolute top-2 right-2 w-3 h-3 bg-emerald-500 rounded-full shadow-md border border-white"></span>
        )}
        
        {/* Action Buttons */}
        {showActions && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent flex justify-between">
            <button
              onClick={handleMessageClick}
              className="p-2 bg-white/90 dark:bg-slate-800/90 rounded-full text-date-primary dark:text-white hover:bg-white dark:hover:bg-slate-700 transition-all"
              aria-label="Send message"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full transition-all ${
                isFavorite 
                  ? 'bg-date-accent text-white' 
                  : 'bg-white/90 dark:bg-slate-800/90 text-date-secondary dark:text-white hover:bg-white dark:hover:bg-slate-700'
              }`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
          </div>
        )}
      </div>
      
      {/* User Info */}
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center">
            {name}, {age}
          </h3>
        </div>
        
        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mt-1">
          <MapPin className="w-3.5 h-3.5 mr-1" />
          <span>{location}</span>
        </div>
        
        {infoText && (
          <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <span>{infoText}</span>
            {infoDetail && (
              <span className="block text-slate-400 dark:text-slate-500 text-xs mt-0.5">{infoDetail}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default UserCard;
