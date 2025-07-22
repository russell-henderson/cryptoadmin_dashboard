import React from 'react';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

// Custom Sparkline SVG
const Sparkline = ({ data, color = 'currentColor' }) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * 60;
    const y = 30 - ((value - min) / range) * 30;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width="100%" height="100%" viewBox="0 0 60 30" className="opacity-70">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
};

const MetricCard = ({ title, value, change, icon, sparklineData }) => {
  const isPositive = typeof change === 'string' ? change.startsWith('+') : change > 0;
  const changeColor = isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  const changeIcon = isPositive ? <FaArrowUp /> : <FaArrowDown />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl shadow-sm hover:shadow-md border bg-white dark:bg-gray-900 p-5 flex flex-col justify-between min-h-[120px]"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <IconContext.Provider value={{ size: '1.5em', color: 'var(--color-primary)' }}>
            {icon}
          </IconContext.Provider>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
        </div>
        <div className={`flex items-center space-x-1 font-semibold ${changeColor}`}> 
          {changeIcon}
          <span>{change}</span>
        </div>
      </div>
      <div className="flex items-end justify-between mt-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
        {/* Sparkline bottom-right */}
        <div className="absolute bottom-2 right-2 w-[60px] h-[30px] overflow-hidden">
          <Sparkline data={sparklineData} color={isPositive ? '#16a34a' : '#dc2626'} />
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;
