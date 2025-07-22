import React from 'react';
import Icon from '../../../components/AppIcon';

const MarketMetricsCard = ({ title, value, change, changeType, icon, sparklineData, loading }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  const generateSparkline = () => {
    if (!sparklineData || sparklineData.length === 0) return null;
    
    const max = Math.max(...sparklineData);
    const min = Math.min(...sparklineData);
    const range = max - min;
    
    const points = sparklineData.map((value, index) => {
      const x = (index / (sparklineData.length - 1)) * 60;
      const y = 20 - ((value - min) / range) * 20;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width="60" height="20" className="opacity-60">
        <polyline
          points={points}
          fill="none"
          stroke={changeType === 'positive' ? 'var(--color-success)' : changeType === 'negative' ? 'var(--color-error)' : 'var(--color-muted-foreground)'}
          strokeWidth="1.5"
        />
      </svg>
    );
  };

  return (
    <div className="relative rounded-xl overflow-hidden bg-card border border-border p-6 crypto-elevation-1 crypto-transition hover:crypto-elevation-2" role="status" aria-live="polite">
      {loading ? (
        <div className="flex flex-col justify-between h-full animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg" />
            <div>
              <div className="h-4 w-24 bg-muted rounded mb-2" />
              <div className="h-6 w-32 bg-muted rounded" />
            </div>
          </div>
          <div className="text-right mt-4">
            <div className="h-4 w-16 bg-muted rounded mb-2" />
            <div className="h-4 w-20 bg-muted rounded" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name={icon} size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
              <p className="text-2xl font-bold text-foreground mt-1 animate-pulse" aria-label={title + ' value'}>{value}</p>
            </div>
          </div>
          <div className="flex-1" />
          <div className="flex items-end justify-between mt-2">
            <div className={`flex items-center space-x-1 ${getChangeColor()} animate-fadeIn`} aria-label={title + ' change'}>
              <Icon name={getChangeIcon()} size={16} />
              <span className="text-sm font-medium">{change}</span>
            </div>
            <div className="absolute bottom-2 right-2 w-[60px] h-[30px] overflow-hidden">
              {sparklineData && sparklineData.length > 0 && (
                <svg width="100%" height="100%" viewBox="0 0 60 20" className="opacity-60">
                  <polyline
                    points={(() => {
                      const max = Math.max(...sparklineData);
                      const min = Math.min(...sparklineData);
                      const range = max - min;
                      return sparklineData.map((value, index) => {
                        const x = (index / (sparklineData.length - 1)) * 60;
                        const y = 20 - ((value - min) / (range || 1)) * 20;
                        return `${x},${y}`;
                      }).join(' ');
                    })()}
                    fill="none"
                    stroke={changeType === 'positive' ? 'var(--color-success)' : changeType === 'negative' ? 'var(--color-error)' : 'var(--color-muted-foreground)'}
                    strokeWidth="1.5"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketMetricsCard;