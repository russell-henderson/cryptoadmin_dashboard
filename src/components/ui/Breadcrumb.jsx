import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/market-overview-dashboard': {
      label: 'Market Overview',
      icon: 'BarChart3',
      parent: null
    },
    '/trading-performance-dashboard': {
      label: 'Trading Performance',
      icon: 'TrendingUp',
      parent: null
    },
    '/portfolio-management-dashboard': {
      label: 'Portfolio Management',
      icon: 'PieChart',
      parent: null
    },
    '/risk-monitoring-dashboard': {
      label: 'Risk Monitoring',
      icon: 'Shield',
      parent: null
    },
    '/market-research-dashboard': {
      label: 'Market Research',
      icon: 'Search',
      parent: null
    }
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      {
        label: 'Dashboard',
        icon: 'Home',
        path: '/',
        isClickable: true
      }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap[currentPath];
      
      if (routeInfo) {
        breadcrumbs.push({
          label: routeInfo.label,
          icon: routeInfo.icon,
          path: currentPath,
          isClickable: index < pathSegments.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleNavigation = (path) => {
    if (path && path !== location.pathname) {
      navigate(path);
    }
  };

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 py-4 text-sm" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-muted-foreground mx-2" 
              />
            )}
            
            <div className="flex items-center space-x-2">
              {item.icon && (
                <Icon 
                  name={item.icon} 
                  size={16} 
                  className={item.isClickable ? 'text-primary' : 'text-muted-foreground'} 
                />
              )}
              
              {item.isClickable ? (
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation(item.path)}
                  className="p-0 h-auto font-normal text-primary hover:text-primary/80 crypto-transition"
                >
                  {item.label}
                </Button>
              ) : (
                <span className="font-medium text-foreground">
                  {item.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;