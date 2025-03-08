import React from 'react';
import FilterSection from './FilterSection';
import { Users } from 'lucide-react';

type MaritalStatusChildrenSectionProps = {
  maritalStatus: string;
  children: string;
  onChange: (field: string, value: string) => void;
};

const MaritalStatusChildrenSection = ({ 
  maritalStatus, 
  children, 
  onChange 
}: MaritalStatusChildrenSectionProps) => {
  return (
    <FilterSection title="Marital status & children" icon={<Users className="w-5 h-5" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Marital status</label>
          <select 
            className="select-field"
            value={maritalStatus}
            onChange={(e) => onChange('maritalStatus', e.target.value)}
          >
            <option value="all">All</option>
            <option value="single">Single</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
            <option value="separated">Separated</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Children</label>
          <select 
            className="select-field"
            value={children}
            onChange={(e) => onChange('children', e.target.value)}
          >
            <option value="all">All</option>
            <option value="no">No children</option>
            <option value="yes-living-together">Yes, living together</option>
            <option value="yes-not-living-together">Yes, not living together</option>
          </select>
        </div>
      </div>
    </FilterSection>
  );
};

export default MaritalStatusChildrenSection;
