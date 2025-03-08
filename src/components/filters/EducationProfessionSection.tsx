import React from 'react';
import FilterSection from './FilterSection';
import { GraduationCap } from 'lucide-react';

type EducationProfessionSectionProps = {
  education: string;
  profession: string;
  onChange: (field: string, value: string) => void;
};

const EducationProfessionSection = ({ 
  education, 
  profession, 
  onChange 
}: EducationProfessionSectionProps) => {
  return (
    <FilterSection title="Education and profession" icon={<GraduationCap className="w-5 h-5" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Education</label>
          <select 
            className="select-field"
            value={education}
            onChange={(e) => onChange('education', e.target.value)}
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
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Profession</label>
          <select 
            className="select-field"
            value={profession}
            onChange={(e) => onChange('profession', e.target.value)}
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
  );
};

export default EducationProfessionSection;
