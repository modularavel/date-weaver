
import { useState } from 'react';
import { X, Filter } from 'lucide-react';
import EducationProfessionSection from './filters/EducationProfessionSection';
import MaritalStatusChildrenSection from './filters/MaritalStatusChildrenSection';
import SmokeDrinkSection from './filters/SmokeDrinkSection';
import PhysicalCharacteristicsSection from './filters/PhysicalCharacteristicsSection';

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/20 dark:bg-black/40 backdrop-blur-sm flex justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl my-8 mx-auto glass-card rounded-xl shadow-xl animate-scale-in">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Advanced search
            </h2>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
            <EducationProfessionSection 
              education={filters.education}
              profession={filters.profession}
              onChange={handleChange}
            />

            <MaritalStatusChildrenSection 
              maritalStatus={filters.maritalStatus}
              children={filters.children}
              onChange={handleChange}
            />

            <SmokeDrinkSection 
              smoke={filters.smoke}
              drink={filters.drink}
              onChange={handleChange}
            />

            <PhysicalCharacteristicsSection 
              height={filters.height}
              hairstyle={filters.hairstyle}
              eyes={filters.eyes}
              ethnicity={filters.ethnicity}
              body={filters.body}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-700 mt-4">
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
