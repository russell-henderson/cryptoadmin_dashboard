import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsRow = ({ portfolioData }) => {
  const metrics = [
    {
      id: 'total-value',
      label: 'Total Portfolio Value',
      value: portfolioData.totalValue,
      change: portfolioData.totalChange,
      changePercent: portfolioData.totalChangePercent,
      icon: 'DollarSign',
      format: 'currency'
    },
    {
      id: '24h-change',
      label: '24h Change',
      value: portfolioData.dayChange,
      change: portfolioData.dayChangePercent,
      changePercent: null,
      icon: 'TrendingUp',
      format: 'currency'
    },
    {
      id: 'allocation-drift',
      label: 'Allocation Drift Score',
      value: portfolioData.driftScore,
      change: null,
      changePercent: null,
      icon: 'Target',
      format: 'percentage',
      status: portfolioData.driftScore > 5 ? 'warning' : 'success'
    },
    {
      id: 'risk-adjusted',
      label: 'Risk-Adjusted Returns',
      value: portfolioData.sharpeRatio,
      change: null,
      changePercent: null,
      icon: 'Shield',
      format: 'decimal',
      status: portfolioData.sharpeRatio > 1 ? 'success' : 'warning'
    }
  ];

  const formatValue = (value, format) => {
    switch (format) {
      case 'currency':
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      case 'percentage':
        return `${value.toFixed(2)}%`;
      case 'decimal':
        return value.toFixed(3);
      default:
        return value.toString();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-foreground';
    }
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric) => (
        <div key={metric.id} className="bg-card rounded-lg p-6 border border-border crypto-elevation-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name={metric.icon} size={20} className="text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
            </div>
            {metric.status && (
              <div className={`w-2 h-2 rounded-full ${metric.status === 'success' ? 'bg-success' : metric.status === 'warning' ? 'bg-warning' : 'bg-error'}`}></div>
            )}
          </div>
          
          <div className="space-y-2">
            <div className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
              {formatValue(metric.value, metric.format)}
            </div>
            
            {metric.change !== null && (
              <div className="flex items-center space-x-2">
                <Icon 
                  name={metric.change >= 0 ? "ArrowUp" : "ArrowDown"} 
                  size={16} 
                  className={getChangeColor(metric.change)} 
                />
                <span className={`text-sm font-medium ${getChangeColor(metric.change)}`}>
                  {formatValue(Math.abs(metric.change), metric.format)}
                  {metric.changePercent && ` (${metric.changePercent.toFixed(2)}%)`}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsRow;