import { useState } from 'react';
import { Check, Trash2, Image } from 'lucide-react';
import { toast } from 'sonner';

export type PhotoStatus = 'approved' | 'pending' | 'rejected';

export type Photo = {
  id: string;
  url: string;
  status: PhotoStatus;
  isProfile?: boolean;
};

type PhotoGalleryProps = {
  photos: Photo[];
  title?: string;
  emptyMessage?: string;
  canEdit?: boolean;
  onMakeProfile?: (photoId: string) => void;
  onDelete?: (photoId: string) => void;
};

const statusMessages = {
  approved: {
    title: 'Approved photos',
    message: 'Only approved photos appear on your profile and can be selected as a profile picture!',
    className: 'border-emerald-500 bg-emerald-50 text-emerald-800',
  },
  pending: {
    title: 'Pending photos',
    message: 'Pending photos are waiting for moderation from our team and cannot be selected as a profile picture!',
    className: 'border-amber-500 bg-amber-50 text-amber-800',
  },
  rejected: {
    title: 'Disapproved photos',
    message: 'Disapproved photos will not appear on your profile and cannot be selected as a profile picture!',
    className: 'border-red-500 bg-red-50 text-red-800',
  },
};

const PhotoGallery = ({
  photos,
  title,
  emptyMessage = 'No photos available',
  canEdit = false,
  onMakeProfile,
  onDelete,
}: PhotoGalleryProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState<Record<string, boolean>>({});

  const handleMakeProfile = (photoId: string) => {
    if (onMakeProfile) {
      onMakeProfile(photoId);
      toast.success('Profile photo updated successfully');
    }
  };

  const handleDelete = (photoId: string) => {
    if (onDelete) {
      if (confirm('Are you sure you want to delete this photo?')) {
        onDelete(photoId);
        toast.success('Photo deleted successfully');
      }
    }
  };

  const groupedPhotos = photos.reduce<Record<PhotoStatus, Photo[]>>(
    (acc, photo) => {
      if (!acc[photo.status]) {
        acc[photo.status] = [];
      }
      acc[photo.status].push(photo);
      return acc;
    },
    { approved: [], pending: [], rejected: [] }
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Photos Sections */}
      {(title || photos.length > 0) && (
        <div>
        {title && <div className="inline-flex items-center"><h2 className="text-xl font-semibold">{title}</h2></div>}
            
          
          {Object.entries(groupedPhotos).map(([status, statusPhotos]) => {
            if (statusPhotos.length === 0) return null;
            
            const { title, message, className } = statusMessages[status as PhotoStatus];
            
            return (
              <div key={status} className="mb-8">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  {status === 'approved' && <Check className="w-4 h-4 text-emerald-500 mr-1" />}
                  {status === 'pending' && <Image className="w-4 h-4 text-amber-500 mr-1" />}
                  {status === 'rejected' && <Trash2 className="w-4 h-4 text-red-500 mr-1" />}
                  {title}
                </h3>
                
                <div className={`p-3 mb-4 rounded-md border ${className}`}>
                  {message}
                </div>
                
                <div className="photo-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                  {statusPhotos.map((photo) => (
                    <div 
                      key={photo.id} 
                      className="photo-item glass-card"
                    >
                      {!isImageLoaded[photo.id] && (
                        <div className="absolute inset-0 image-loading" />
                      )}
                      
                      <img
                        src={photo.url}
                        alt="User photo"
                        className={`w-full h-full object-cover transition-opacity duration-500 ${
                          isImageLoaded[photo.id] ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => setIsImageLoaded(prev => ({ ...prev, [photo.id]: true }))}
                      />
                      
                      {/* Photo status indicators */}
                      {photo.isProfile && (
                        <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-md">
                          Profile
                        </div>
                      )}
                      
                      {/* Actions */}
                      {canEdit && status === 'approved' && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent flex justify-between">
                          <button
                            onClick={() => handleMakeProfile(photo.id)}
                            className={`px-3 py-1 rounded text-xs font-medium ${
                              photo.isProfile 
                                ? 'bg-emerald-500 text-white cursor-default'
                                : 'bg-white text-slate-800 hover:bg-date-primary hover:text-white'
                            }`}
                            disabled={photo.isProfile}
                          >
                            {photo.isProfile ? 'Profile' : 'Set as Profile'}
                          </button>
                          
                          <button
                            onClick={() => handleDelete(photo.id)}
                            className="p-1.5 bg-white/90 text-red-500 rounded-full hover:bg-white"
                            title="Delete photo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      
                      {canEdit && status !== 'approved' && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent flex justify-end">
                          <button
                            onClick={() => handleDelete(photo.id)}
                            className="p-1.5 bg-white/90 text-red-500 rounded-full hover:bg-white"
                            title="Delete photo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {photos.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <Image className="w-12 h-12 mx-auto mb-2 text-slate-400" />
              <p>{emptyMessage}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
