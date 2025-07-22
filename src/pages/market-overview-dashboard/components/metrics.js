import { FaDollarSign, FaChartLine, FaSmile, FaShieldAlt, FaCoins, FaStar } from 'react-icons/fa';

export const metrics = [
  {
    title: 'Total Market Cap',
    value: '$1.68T',
    change: 2.4,
    icon: <FaDollarSign />,
    sparklineData: [1.62, 1.63, 1.65, 1.66, 1.67, 1.68, 1.68],
  },
  {
    title: '24h Volume',
    value: '$89.2B',
    change: 5.7,
    icon: <FaChartLine />,
    sparklineData: [85, 86, 87, 88, 89, 89.2, 89.2],
  },
  {
    title: 'Fear & Greed Index',
    value: '72',
    change: 0.8,
    icon: <FaSmile />,
    sparklineData: [68, 70, 71, 72, 72, 72, 72],
  },
  {
    title: 'BTC Dominance',
    value: '42.3%',
    change: -0.8,
    icon: <FaShieldAlt />,
    sparklineData: [43, 42.8, 42.6, 42.5, 42.4, 42.3, 42.3],
  },
  {
    title: 'Active Coins',
    value: '2,847',
    change: 12,
    icon: <FaCoins />,
    sparklineData: [2800, 2820, 2840, 2845, 2847, 2847, 2847],
  },
  {
    title: 'Market Trend Score',
    value: '8.2/10',
    change: 0.3,
    icon: <FaStar />,
    sparklineData: [7.8, 8.0, 8.1, 8.2, 8.2, 8.2, 8.2],
  },
];
