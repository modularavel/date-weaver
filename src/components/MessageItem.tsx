
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format, isToday, isYesterday } from 'date-fns';
import { Check, CheckCheck, Star, Info } from 'lucide-react';
import { toast } from 'sonner';

export type MessageItemProps = {
  id: string;
  userId: string;
  name: string;
  image: string;
  lastMessage: string;
  timestamp: Date;
  isRead?: boolean;
  isOnline?: boolean;
  isPremium?: boolean;
  isVerified?: boolean;
  isFavorite?: boolean;
  onClick?: () => void;
};

const MessageItem = ({
  id,
  userId,
  name,
  image,
  lastMessage,
  timestamp,
  isRead = true,
  isOnline = false,
  isPremium = false,
  isVerified = false,
  isFavorite = false,
  onClick,
}: MessageItemProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const formatMessageTime = (date: Date) => {
    if (isToday(date)) {
      return format(date, 'HH:mm');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'dd MMM');
    }
  };
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(isFavorite 
      ? `${name} removed from favorites` 
      : `${name} added to favorites`
    );
  };

  const showUserInfo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.info(`View ${name}'s profile`);
  };

  const handleClick = () => {
    if (onClick) onClick();
  };
  
  return (
    <div 
      className={`flex items-center p-3 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${
        !isRead ? 'bg-slate-50' : ''
      }`}
      onClick={handleClick}
    >
      {/* User Avatar */}
      <div className="relative mr-3 flex-shrink-0">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
          {!isImageLoaded && (
            <div className="absolute inset-0 image-loading rounded-full" />
          )}
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        
        {/* Online Status */}
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></span>
        )}
      </div>
      
      {/* Message Content */}
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-medium text-slate-900 truncate pr-2 flex items-center">
            {name}
            {isPremium && (
              <span className="ml-1 text-amber-500">★</span>
            )}
            {isVerified && (
              <span className="ml-1 text-emerald-500">
                <Check className="w-3.5 h-3.5" />
              </span>
            )}
          </h3>
          <span className="text-xs text-slate-500 whitespace-nowrap">
            {formatMessageTime(timestamp)}
          </span>
        </div>
        
        <div className="flex items-center">
          <p className={`text-sm truncate max-w-[180px] md:max-w-xs ${isRead ? 'text-slate-500' : 'text-slate-900 font-medium'}`}>
            {lastMessage}
          </p>
          
          {!isRead && (
            <span className="ml-2 w-2 h-2 bg-date-primary rounded-full flex-shrink-0"></span>
          )}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center ml-2 space-x-2">
        <button
          onClick={toggleFavorite}
          className={`p-1.5 rounded-full ${isFavorite ? 'text-amber-500 hover:bg-amber-50' : 'text-slate-400 hover:bg-slate-100'}`}
        >
          <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-500' : ''}`} />
        </button>
        
        <button
          onClick={showUserInfo}
          className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MessageItem;
