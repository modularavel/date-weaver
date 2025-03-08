
import React from 'react';

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

export default FilterSection;
