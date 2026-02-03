
import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
  isPositive?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, icon, isPositive = true }) => {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-green-50 rounded-lg text-green-600">
          {icon}
        </div>
        {change && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {isPositive ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-green-900">{value}</h3>
      </div>
    </div>
  );
};
