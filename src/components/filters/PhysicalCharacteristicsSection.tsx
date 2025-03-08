import React from 'react';
import FilterSection from './FilterSection';
import { User } from 'lucide-react';

type PhysicalCharacteristicsSectionProps = {
  height: string;
  hairstyle: string;
  eyes: string;
  ethnicity: string;
  body: string;
  onChange: (field: string, value: string) => void;
};

const PhysicalCharacteristicsSection = ({ 
  height,
  hairstyle,
  eyes,
  ethnicity,
  body,
  onChange 
}: PhysicalCharacteristicsSectionProps) => {
  return (
    <FilterSection title="Physical characteristics" icon={<User className="w-5 h-5" />}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Height</label>
          <select 
            className="select-field"
            value={height}
            onChange={(e) => onChange('height', e.target.value)}
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
            value={hairstyle}
            onChange={(e) => onChange('hairstyle', e.target.value)}
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
            value={eyes}
            onChange={(e) => onChange('eyes', e.target.value)}
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
            value={ethnicity}
            onChange={(e) => onChange('ethnicity', e.target.value)}
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
            value={body}
            onChange={(e) => onChange('body', e.target.value)}
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
  );
};

export default PhysicalCharacteristicsSection;
