import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceKPIStrip = ({ dateRange, selectedAccount, selectedStrategy }) => {
  const kpiData = [
    {
      id: 'total-pnl',
      label: 'Total P&L',
      value: '$127,450.32',
      change: '+12.4%',
      trend: 'up',
      benchmark: 'vs $113,200 last period',
      icon: 'TrendingUp',
      color: 'text-success'
    },
    {
      id: 'win-rate',
      label: 'Win Rate',
      value: '68.5%',
      change: '+2.1%',
      trend: 'up',
      benchmark: 'vs 66.4% avg',
      icon: 'Target',
      color: 'text-primary'
    },
    {
      id: 'avg-trade-duration',
      label: 'Avg Trade Duration',
      value: '4.2h',
      change: '-0.8h',
      trend: 'down',
      benchmark: 'vs 5.0h target',
      icon: 'Clock',
      color: 'text-warning'
    },
    {
      id: 'sharpe-ratio',
      label: 'Sharpe Ratio',
      value: '2.34',
      change: '+0.15',
      trend: 'up',
      benchmark: 'vs 2.19 benchmark',
      icon: 'BarChart3',
      color: 'text-accent'
    }
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'ArrowUp' : 'ArrowDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {kpiData.map((kpi) => (
        <div key={kpi.id} className="bg-card rounded-lg p-6 crypto-elevation-1 crypto-transition hover:crypto-elevation-2">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-muted ${kpi.color}`}>
              <Icon name={kpi.icon} size={24} />
            </div>
            <div className={`flex items-center space-x-1 ${getTrendColor(kpi.trend)}`}>
              <Icon name={getTrendIcon(kpi.trend)} size={16} />
              <span className="text-sm font-medium">{kpi.change}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">{kpi.label}</h3>
            <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
            <p className="text-xs text-muted-foreground">{kpi.benchmark}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceKPIStrip;