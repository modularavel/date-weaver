
import { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import UserCard from '@/components/UserCard';
import SearchFilters from '@/components/SearchFilters';
import { toast } from 'sonner';

// Mock data for the homepage
const mockUsers = [
  {
    id: '1',
    name: 'Eduardah',
    age: 31,
    location: 'São Luís, Maranhão, Brazil',
    image: 'https://daddybrasil.s3-sa-east-1.amazonaws.com/brunacarla21a/fotos/large/1684711927.jpg',
    isPremium: true,
    isVerified: true,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Loirinha',
    age: 31,
    location: 'São Luís, Maranhão, Brazil',
    image: 'https://daddybrasil.s3-sa-east-1.amazonaws.com/Laly22/fotos/large/1620322831zlD20e4VrxPsg4XP1rUWYVSMLbPxxoa1zKZ4ljAe.jpg',
    isPremium: true,
    isVerified: true,
    isOnline: false,
    infoText: 'Há 5 dias',
  },
  {
    id: '3',
    name: 'Vanessa',
    age: 31,
    location: 'São Luís, Maranhão, Brazil',
    image: 'https://daddybrasil.s3-sa-east-1.amazonaws.com/brunacarla21a/fotos/large/1684712047.jpg',
    isPremium: false,
    isVerified: false,
    isOnline: false,
  },
  {
    id: '4',
    name: 'Jhenny',
    age: 31,
    location: 'São Luís, Maranhão, Brazil',
    image: 'https://daddybrasil.s3-sa-east-1.amazonaws.com/brunacarla21a/fotos/large/1684711927.jpg',
    isPremium: false,
    isVerified: false,
    isOnline: false,
  },
  {
    id: '5',
    name: 'Mariana',
    age: 31,
    location: 'São Luís, Maranhão, Brazil',
    image: 'https://daddybrasil.s3-sa-east-1.amazonaws.com/brunacarla21a/fotos/large/1684711927.jpg',
    isPremium: false,
    isVerified: false,
    isOnline: false,
  },
  {
    id: '6',
    name: 'Danny',
    age: 31,
    location: 'São Luís, Maranhão, Brazil',
    image: 'https://daddybrasil.s3-sa-east-1.amazonaws.com/brunacarla21a/fotos/large/1684711927.jpg',
    isPremium: false,
    isVerified: true,
    isOnline: false,
  },
];

const sortOptions = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'nearby', label: 'Nearby first' },
  { value: 'popular', label: 'Popular first' },
];

const Index = () => {
  const [users, setUsers] = useState(mockUsers);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [ageRange, setAgeRange] = useState({ min: 18, max: 100 });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filtered = mockUsers.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setUsers(filtered);
      setLoading(false);
      
      toast.success(`Found ${filtered.length} users matching "${searchQuery}"`);
    }, 500);
  };
  
  const handleFilterChange = (filters: any) => {
    // In a real app, this would apply the filters to the user list
    toast.success('Filters applied successfully');
  };
  
  const handleResetFilters = () => {
    setUsers(mockUsers);
    setSearchQuery('');
    setAgeRange({ min: 18, max: 100 });
    toast.success('Filters reset successfully');
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
    
    // Simulate sorting
    let sorted = [...users];
    if (value === 'newest') {
      // No change, already sorted by newest
    } else if (value === 'oldest') {
      sorted.reverse();
    } else if (value === 'nearby') {
      // In a real app, this would sort by distance
      toast.info('Sorting by location would use geolocation data');
    } else if (value === 'popular') {
      // In a real app, this would sort by popularity metrics
      sorted.sort((a, b) => (a.isPremium === b.isPremium ? 0 : a.isPremium ? -1 : 1));
    }
    
    setUsers(sorted);
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container max-w-6xl mx-auto px-4 py-6 animate-fade-in">
        {/* Search Form */}
        <div className="mb-8">
          <form onSubmit={handleSearch}>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-grow">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by username, city, state or country..."
                    className="input-field pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                </div>
              </div>
              
              {/* Age Range */}
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min age"
                  className="input-field w-24"
                  min={18}
                  max={100}
                  value={ageRange.min}
                  onChange={(e) => setAgeRange({ ...ageRange, min: parseInt(e.target.value) || 18 })}
                />
                <input
                  type="number"
                  placeholder="Max age"
                  className="input-field w-24"
                  min={18}
                  max={100}
                  value={ageRange.max}
                  onChange={(e) => setAgeRange({ ...ageRange, max: parseInt(e.target.value) || 100 })}
                />
              </div>
              
              {/* Search Button */}
              <button type="submit" className="btn-primary">
                Search
              </button>
              
              {/* Advanced Search Button */}
              <button 
                type="button" 
                className="btn-secondary flex items-center gap-1"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </form>
          
          {/* Active filters */}
          <div className="flex items-center mt-2 text-sm">
            <span className="text-slate-500">Search combination:</span>
            <span className="ml-2 font-medium">Age between: {ageRange.min}-{ageRange.max}</span>
            
            {searchQuery && (
              <span className="ml-2 font-medium">Query: "{searchQuery}"</span>
            )}
            
            <button 
              className="ml-auto text-date-primary hover:underline text-sm"
              onClick={handleResetFilters}
            >
              Reset filters
            </button>
          </div>
        </div>
        
        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Search Results</h1>
          
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-slate-500">Sort by:</label>
            <div className="relative">
              <select
                id="sort"
                className="select-field pr-8 appearance-none"
                value={sortBy}
                onChange={handleSortChange}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>
        
        {/* Results Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="animate-pulse">
                <div className="bg-slate-200 rounded-xl aspect-[3/4]"></div>
                <div className="mt-2 bg-slate-200 h-5 rounded w-2/3"></div>
                <div className="mt-1 bg-slate-200 h-4 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : users.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map((user) => (
              <UserCard key={user.id} {...user} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-medium text-slate-700 mb-2">No users found</h2>
            <p className="text-slate-500 mb-4">
              Try adjusting your search filters or searching for different keywords.
            </p>
            <button 
              className="btn-primary"
              onClick={() => setUsers(mockUsers)}
            >
              Show all users
            </button>
          </div>
        )}
      </main>
      
      <SearchFilters 
        isOpen={showFilters} 
        onClose={() => setShowFilters(false)} 
        onApply={handleFilterChange}
        onReset={handleResetFilters}
      />
    </div>
  );
};

export default Index;
