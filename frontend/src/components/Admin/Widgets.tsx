import React from 'react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import { StatCardProps } from '../../models/Admin/model';
import { SvgIconComponent } from '@mui/icons-material';



const StatCard: React.FC<StatCardProps> = ({ Icon, value, label, percentage }) => {
  const { t } = useTranslation(); // Use the useTranslation hook to access translations

  return (
    <div className="flex flex-col items-center justify-between p-4 bg-blue-900 rounded-lg shadow-lg">
      <Icon className="text-blue-300 text-4xl" />
      <div className="text-center">
        <p className="text-2xl font-semibold text-white">{value}</p>
        <p className="text-gray-400">{label}</p> 
      </div>
      <div className={`text-lg font-semibold ${percentage.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
        {percentage}
      </div>
    </div>
  );
};

export default StatCard;
