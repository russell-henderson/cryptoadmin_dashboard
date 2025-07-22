import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const navigationItems = [
  {
    id: 'market-overview',
    label: 'Market Overview',
    icon: 'BarChart3',
    path: '/market-overview-dashboard',
    tooltipText: 'Real-time market data and trends',
    badge: null
  },
  {
    id: 'trading-performance',
    label: 'Trading Performance',
    icon: 'TrendingUp',
    path: '/trading-performance-dashboard',
    tooltipText: 'Track trading results and analytics',
    badge: null
  },
  {
    id: 'portfolio-management',
    label: 'Portfolio Management',
    icon: 'PieChart',
    path: '/portfolio-management-dashboard',
    tooltipText: 'Manage and monitor portfolios',
    badge: '12'
  },
  {
    id: 'risk-monitoring',
    label: 'Risk Monitoring',
    icon: 'Shield',
    path: '/risk-monitoring-dashboard',
    tooltipText: 'Risk assessment and compliance',
    badge: null
  },
  {
    id: 'market-research',
    label: 'Market Research',
    icon: 'Search',
    path: '/market-research-dashboard',
    tooltipText: 'Research tools and market analysis',
    badge: null
  }
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 bg-card border-r border-border crypto-elevation-1 crypto-transition">
      <nav className="flex-1 py-8 px-6">
        <ul className="space-y-4">
          {navigationItems.map(item => (
            <li key={item.id} className="relative group">
              <Button
                variant={location.pathname === item.path ? "default" : "ghost"}
                onClick={() => handleNavigation(item.path)}
                className="w-full justify-start h-12 px-4 crypto-transition"
              >
                <Icon name={item.icon} size={20} />
                <span className="ml-3 font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Button>
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-10 hidden group-hover:block bg-popover border border-border rounded px-2 py-1 text-xs text-muted-foreground shadow-lg whitespace-nowrap">
                {item.tooltipText}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;