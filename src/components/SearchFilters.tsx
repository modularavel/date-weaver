
import { useState } from 'react';
import { X, Filter, GraduationCap, Users, Wine, User } from 'lucide-react';

type FilterSectionProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

const FilterSection = ({ title, icon, children }: FilterSectionProps) => (
  <div className="mb-6">
    <h3 className="text-lg font-medium flex items-center mb-3">
      {icon}
      <span className="ml-2">{title}</span>
    </h3>
    {children}
  </div>
);

type SearchFiltersProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  onReset: () => void;
};

const SearchFilters = ({ isOpen, onClose, onApply, onReset }: SearchFiltersProps) => {
  const [filters, setFilters] = useState({
    education: 'all',
    profession: 'all',
    maritalStatus: 'all',
    children: 'all',
    smoke: 'all',
    drink: 'all',
    height: 'all',
    hairstyle: 'all',
    eyes: 'all',
    ethnicity: 'all',
    body: 'all',
  });

  const handleChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      education: 'all',
      profession: 'all',
      maritalStatus: 'all',
      children: 'all',
      smoke: 'all',
      drink: 'all',
      height: 'all',
      hairstyle: 'all',
      eyes: 'all',
      ethnicity: 'all',
      body: 'all',
    });
    onReset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/20 backdrop-blur-sm flex justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl my-8 mx-auto glass-card rounded-xl shadow-xl animate-scale-in">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Advanced search
            </h2>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
            {/* Education & Profession */}
            <FilterSection title="Education and profession" icon={<GraduationCap className="w-5 h-5" />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Education</label>
                  <select 
                    className="select-field"
                    value={filters.education}
                    onChange={(e) => handleChange('education', e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="high-school">High School</option>
                    <option value="college">College</option>
                    <option value="bachelor">Bachelor's degree</option>
                    <option value="master">Master's degree</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Profession</label>
                  <select 
                    className="select-field"
                    value={filters.profession}
                    onChange={(e) => handleChange('profession', e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="tech">Technology</option>
                    <option value="finance">Finance</option>
                    <option value="arts">Arts & Entertainment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </FilterSection>

            {/* Marital Status & Children */}
            <FilterSection title="Marital status & children" icon={<Users className="w-5 h-5" />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Marital status</label>
                  <select 
                    className="select-field"
                    value={filters.maritalStatus}
                    onChange={(e) => handleChange('maritalStatus', e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="single">Single</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                    <option value="separated">Separated</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Children</label>
                  <select 
                    className="select-field"
                    value={filters.children}
                    onChange={(e) => handleChange('children', e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="no">No children</option>
                    <option value="yes-living-together">Yes, living together</option>
                    <option value="yes-not-living-together">Yes, not living together</option>
                  </select>
                </div>
              </div>
            </FilterSection>

            {/* Smoke & Drink */}
            <FilterSection title="Smoke and drinks" icon={<Wine className="w-5 h-5" />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Smoke?</label>
                  <select 
                    className="select-field"
                    value={filters.smoke}
                    onChange={(e) => handleChange('smoke', e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="no">No</option>
                    <option value="occasionally">Occasionally</option>
                    <option value="regularly">Regularly</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Drink?</label>
                  <select 
                    className="select-field"
                    value={filters.drink}
                    onChange={(e) => handleChange('drink', e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="no">No</option>
                    <option value="socially">Socially</option>
                    <option value="regularly">Regularly</option>
                  </select>
                </div>
              </div>
            </FilterSection>

            {/* Physical Characteristics */}
            <FilterSection title="Physical characteristics" icon={<User className="w-5 h-5" />}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Height</label>
                  <select 
                    className="select-field"
                    value={filters.height}
                    onChange={(e) => handleChange('height', e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="short">Short</option>
                    <option value="average">Average</option>
                    <option value="tall">Tall</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Hairstyle</label>
                  <select 
                    className="select-field"
                    value={filters.hairstyle}
                    onChange={(e) => handleChange('hairstyle', e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Eyes</label>
                  <select 
                    className="select-field"
                    value={filters.eyes}
                    onChange={(e) => handleChange('eyes', e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="brown">Brown</option>
                    <option value="hazel">Hazel</option>
                    <option value="black">Black</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ethnicity</label>
                  <select 
                    className="select-field"
                    value={filters.ethnicity}
                    onChange={(e) => handleChange('ethnicity', e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="asian">Asian</option>
                    <option value="black">Black</option>
                    <option value="hispanic">Hispanic</option>
                    <option value="indian">Indian</option>
                    <option value="middle-eastern">Middle Eastern</option>
                    <option value="white">White</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Body</label>
                  <select 
                    className="select-field"
                    value={filters.body}
                    onChange={(e) => handleChange('body', e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="slim">Slim</option>
                    <option value="athletic">Athletic</option>
                    <option value="average">Average</option>
                    <option value="curvy">Curvy</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </FilterSection>
          </div>

          <div className="flex justify-between gap-4 pt-4 border-t border-slate-200 mt-4">
            <button 
              onClick={handleReset}
              className="btn-secondary"
            >
              Reset filters
            </button>
            
            <button 
              onClick={handleApply}
              className="btn-primary"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
