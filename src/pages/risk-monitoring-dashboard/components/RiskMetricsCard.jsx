import React from 'react';
import Icon from '../../../components/AppIcon';

const RiskMetricsCard = ({ title, value, unit, threshold, trend, status, icon, description }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'critical':
        return 'text-error border-error bg-error/5';
      case 'warning':
        return 'text-warning border-warning bg-warning/5';
      case 'normal':
        return 'text-success border-success bg-success/5';
      default:
        return 'text-muted-foreground border-border bg-muted/5';
    }
  };

  const getTrendIcon = () => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend > 0) return 'text-error';
    if (trend < 0) return 'text-success';
    return 'text-muted-foreground';
  };

  return (
    <div className={`bg-card rounded-lg border-2 p-6 crypto-elevation-1 crypto-transition hover:crypto-elevation-2 ${getStatusColor()}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${status === 'critical' ? 'bg-error/10' : status === 'warning' ? 'bg-warning/10' : 'bg-primary/10'}`}>
            <Icon name={icon} size={20} className={status === 'critical' ? 'text-error' : status === 'warning' ? 'text-warning' : 'text-primary'} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground/80">{description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name={getTrendIcon()} size={16} className={getTrendColor()} />
          <span className={`text-xs font-medium ${getTrendColor()}`}>
            {Math.abs(trend).toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Threshold</span>
            <span className="font-medium">{threshold}{unit}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                status === 'critical' ? 'bg-error' : 
                status === 'warning'? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${Math.min((parseFloat(value) / parseFloat(threshold)) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMetricsCard;