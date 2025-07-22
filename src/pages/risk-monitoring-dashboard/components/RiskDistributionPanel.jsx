import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const RiskDistributionPanel = ({ distributionData, topContributors }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 crypto-elevation-2">
          <p className="text-sm font-medium text-foreground mb-1">{label}</p>
          <p className="text-sm text-muted-foreground">
            Frequency: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  const getRiskColor = (impact) => {
    if (impact >= 15) return 'text-error';
    if (impact >= 10) return 'text-warning';
    if (impact >= 5) return 'text-primary';
    return 'text-success';
  };

  const getRiskBgColor = (impact) => {
    if (impact >= 15) return 'bg-error/10';
    if (impact >= 10) return 'bg-warning/10';
    if (impact >= 5) return 'bg-primary/10';
    return 'bg-success/10';
  };

  return (
    <div className="space-y-6">
      {/* Risk Distribution Histogram */}
      <div className="bg-card rounded-lg border border-border crypto-elevation-1">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Risk Distribution</h3>
          </div>
        </div>
        
        <div className="p-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="range" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="frequency" 
                  fill="var(--color-primary)" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Risk Contributors */}
      <div className="bg-card rounded-lg border border-border crypto-elevation-1">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Target" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Top Risk Contributors</h3>
            </div>
            <span className="text-sm text-muted-foreground">
              Last 24 hours
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-3">
            {topContributors.map((contributor, index) => (
              <div key={contributor.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 crypto-transition">
                <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-full">
                  <span className="text-sm font-medium text-foreground">
                    {index + 1}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {contributor.asset}
                    </h4>
                    <span className={`text-sm font-medium ${getRiskColor(contributor.impact)}`}>
                      {contributor.impact}%
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs text-muted-foreground">
                      Position: ${contributor.position.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      Beta: {contributor.beta}
                    </span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        contributor.impact >= 15 ? 'bg-error' :
                        contributor.impact >= 10 ? 'bg-warning' :
                        contributor.impact >= 5 ? 'bg-primary' : 'bg-success'
                      }`}
                      style={{ width: `${Math.min(contributor.impact * 5, 100)}%` }}
                    />
                  </div>
                </div>
                
                <div className={`p-2 rounded-lg ${getRiskBgColor(contributor.impact)}`}>
                  <Icon 
                    name={contributor.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                    size={16} 
                    className={getRiskColor(contributor.impact)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskDistributionPanel;