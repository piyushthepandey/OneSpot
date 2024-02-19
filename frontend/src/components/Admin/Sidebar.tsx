// src/components/Admin/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone';
import QueryStatsTwoToneIcon from '@mui/icons-material/QueryStatsTwoTone';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useTranslation } from 'react-i18next';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-40 h-screen bg-white text-black p-2.5 border-r border-gray-300 flex flex-col items-start">
      <ul className="list-none p-0 m-0 justify-start">
        <p className="mb-2.5 text-xs text-gray-600 text-left">{t('sidebar.main')}</p>
        <li className="mb-2.5 flex items-center">
          <DashboardTwoToneIcon className="mr-2.5 text-xl text-blue-600" />
          <Link to="/admin" className="no-underline text-black text-sm transition-colors duration-300 hover:text-gray-600">
            {t('sidebar.dashboard')}
          </Link>
        </li>
        <p className="mb-2.5 text-xs text-gray-600 text-left">{t('sidebar.list')}</p>
        <li className="mb-2.5 flex items-center">
          <GroupTwoToneIcon className="mr-2.5 text-xl text-blue-600" />
          <Link to="/usersLists" className="no-underline text-black text-sm transition-colors duration-300 hover:text-gray-600">
            {t('sidebar.users')}
          </Link>
        </li>
        <li className="mb-2.5 flex items-center">
          <QueryStatsTwoToneIcon className="mr-2.5 text-xl text-blue-600" />
          <Link to="/admin" className="no-underline text-black text-sm transition-colors duration-300 hover:text-gray-600">
            {t('sidebar.stats')}
          </Link>
        </li>
        <li className="mb-2.5 flex items-center">
          <ApartmentIcon className="mr-2.5 text-xl text-blue-600" />
          <Link to="/housingPostLists" className="no-underline text-black text-sm transition-colors duration-300 hover:text-gray-600">
            {t('sidebar.recent_housing_posts')}
          </Link>
        </li>
        <li className="mb-2.5 flex items-center">
          <DynamicFeedIcon className="mr-2.5 text-xl text-blue-600" />
          <Link to="/activityPostsLists" className="no-underline text-black text-sm transition-colors duration-300 hover:text-gray-600">
            {t('sidebar.recent_activity_posts')}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
