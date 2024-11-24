import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const StatsCard = ({ title, value, change, icon, description }) => {
  const isPositiveChange = change.startsWith('+');
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
            {icon}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold">{value}</p>
              <span className={`ml-2 text-sm font-medium ${
                isPositiveChange ? 'text-green-600' : 'text-red-600'
              }`}>
                {change}
              </span>
            </div>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;