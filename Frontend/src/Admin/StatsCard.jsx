import React from 'react';
import { FaUsers, FaUserCheck, FaUserTimes } from 'react-icons/fa';

const iconMap = {
  total: <FaUsers className="text-blue-500 text-3xl" />,
  active: <FaUserCheck className="text-green-500 text-3xl" />,
  inactive: <FaUserTimes className="text-red-500 text-3xl" />,
};

const StatsCard = ({ title, count, type }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 w-full md:w-1/3">
      <div>{iconMap[type]}</div>
      <div>
        <h4 className="text-gray-600 text-sm">{title}</h4>
        <p className="text-xl font-bold">{count}</p>
      </div>
    </div>
  );
};

export default StatsCard;
