import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import ProfileDetail from '@/components/ProfileDetail';

// Mock data for the profile page
const mockUserDetails = {
  id: '1',
  name: 'Eduardah',
  age: 31,
  location: 'São Luís, Maranhão, Brazil',
  images: [
    '/lovable-uploads/7205855e-5f82-453b-9efb-b9cf8b67bbd3.png',
    '/lovable-uploads/246eecfa-a0d5-4282-a2c0-2d094d4c20f2.png',
    '/lovable-uploads/3b14247a-0fb7-43f6-9107-08f292b71528.png',
  ],
  isPremium: true,
  isVerified: true,
  isOnline: true,
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  details: {
    'Sex': 'Women',
    'Preference for': 'Both (Age between 18 - 100)',
    'Height': 'Info not set',
    'Education': 'Info not set',
    'Profession': 'Info not set',
    'Marital status': 'Info not set',
    'Children': 'Info not set',
    'Smoke?': 'Info not set',
    'Drink?': 'Info not set',
    'Hairstyle': 'Info not set',
    'Eyes': 'Info not set',
    'Ethnicity': 'Info not set',
    'Body': 'Info not set',
  }
};

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <ProfileDetail {...mockUserDetails} />
      </main>
    </div>
  );
};

export default Profile;
