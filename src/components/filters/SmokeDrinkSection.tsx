
import React from 'react';
import FilterSection from './FilterSection';
import { Wine } from 'lucide-react';

type SmokeDrinkSectionProps = {
  smoke: string;
  drink: string;
  onChange: (field: string, value: string) => void;
};

const SmokeDrinkSection = ({ 
  smoke, 
  drink, 
  onChange 
}: SmokeDrinkSectionProps) => {
  return (
    <FilterSection title="Smoke and drinks" icon={<Wine className="w-5 h-5" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Smoke?</label>
          <select 
            className="select-field"
            value={smoke}
            onChange={(e) => onChange('smoke', e.target.value)}
          >
            <option value="all">All</option>
            <option value="no">No</option>
            <option value="occasionally">Occasionally</option>
            <option value="regularly">Regularly</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Drink?</label>
          <select 
            className="select-field"
            value={drink}
            onChange={(e) => onChange('drink', e.target.value)}
          >
            <option value="all">All</option>
            <option value="no">No</option>
            <option value="socially">Socially</option>
            <option value="regularly">Regularly</option>
          </select>
        </div>
      </div>
    </FilterSection>
  );
};

export default SmokeDrinkSection;
