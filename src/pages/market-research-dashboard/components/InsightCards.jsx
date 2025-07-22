import React from 'react';
import Icon from '../../../components/AppIcon';

const InsightCards = () => {
  const insights = [
    {
      id: 'sentiment',
      title: 'Market Sentiment',
      value: '+12.4%',
      change: '+2.1%',
      trend: 'up',
      icon: 'TrendingUp',
      color: 'success',
      description: 'Overall market sentiment is bullish with strong social media engagement',
      gauge: 74
    },
    {
      id: 'trend',
      title: 'Trend Strength',
      value: '8.2/10',
      change: '+0.5',
      trend: 'up',
      icon: 'Activity',
      color: 'primary',
      description: 'Strong upward trend momentum across major cryptocurrencies',
      gauge: 82
    },
    {
      id: 'correlation',
      title: 'Correlation Index',
      value: '0.73',
      change: '-0.05',
      trend: 'down',
      icon: 'GitBranch',
      color: 'warning',
      description: 'High correlation between major assets, diversification limited',
      gauge: 73
    },
    {
      id: 'confidence',
      title: 'Signal Confidence',
      value: 'High',
      change: '+5%',
      trend: 'up',
      icon: 'Shield',
      color: 'success',
      description: 'Research signals show high confidence with multiple confirmations',
      gauge: 89
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      success: 'text-success bg-success/10 border-success/20',
      primary: 'text-primary bg-primary/10 border-primary/20',
      warning: 'text-warning bg-warning/10 border-warning/20',
      error: 'text-error bg-error/10 border-error/20'
    };
    return colors[color] || colors.primary;
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'ArrowUp' : trend === 'down' ? 'ArrowDown' : 'Minus';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {insights.map((insight) => (
        <div
          key={insight.id}
          className="bg-card border border-border rounded-lg p-6 crypto-elevation-1 hover:crypto-elevation-2 crypto-transition"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${getColorClasses(insight.color)}`}>
              <Icon name={insight.icon} size={24} />
            </div>
            <div className={`flex items-center space-x-1 ${getTrendColor(insight.trend)}`}>
              <Icon name={getTrendIcon(insight.trend)} size={16} />
              <span className="text-sm font-medium">{insight.change}</span>
            </div>
          </div>

          {/* Title and Value */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              {insight.title}
            </h3>
            <div className="text-2xl font-bold text-foreground">
              {insight.value}
            </div>
          </div>

          {/* Gauge */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>0</span>
              <span>100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full bg-${insight.color} crypto-transition`}
                style={{ width: `${insight.gauge}%` }}
              ></div>
            </div>
            <div className="text-right text-xs text-muted-foreground mt-1">
              {insight.gauge}%
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {insight.description}
          </p>

          {/* Action Button */}
          <div className="mt-4 pt-4 border-t border-border">
            <button className="text-sm text-primary hover:text-primary/80 font-medium crypto-transition">
              View Details →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InsightCards;