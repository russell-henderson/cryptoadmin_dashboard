import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RiskMetricsChart = ({ data, thresholds, selectedMetrics, onMetricToggle }) => {
  const [timeRange, setTimeRange] = useState('24h');

  const timeRanges = [
    { value: '1h', label: '1H' },
    { value: '24h', label: '24H' },
    { value: '7d', label: '7D' },
    { value: '30d', label: '30D' }
  ];

  const metricColors = {
    var: '#F44336',
    drawdown: '#FF9800',
    leverage: '#2196F3',
    volatility: '#9C27B0'
  };

  const metricLabels = {
    var: 'Value at Risk',
    drawdown: 'Max Drawdown',
    leverage: 'Leverage Ratio',
    volatility: 'Volatility'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 crypto-elevation-2">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {metricLabels[entry.dataKey]}
                </span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {entry.value}%
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border crypto-elevation-1">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Risk Metrics Trend</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            {timeRanges.map((range) => (
              <Button
                key={range.value}
                variant={timeRange === range.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange(range.value)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {Object.entries(metricLabels).map(([key, label]) => (
            <label key={key} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedMetrics.includes(key)}
                onChange={() => onMetricToggle(key)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center crypto-transition ${
                selectedMetrics.includes(key) 
                  ? 'border-primary bg-primary' :'border-muted-foreground'
              }`}>
                {selectedMetrics.includes(key) && (
                  <Icon name="Check" size={12} color="white" />
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: metricColors[key] }}
                />
                <span className="text-sm text-foreground">{label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {/* Threshold lines */}
              {Object.entries(thresholds).map(([metric, threshold]) => 
                selectedMetrics.includes(metric) && (
                  <ReferenceLine
                    key={`threshold-${metric}`}
                    y={threshold}
                    stroke={metricColors[metric]}
                    strokeDasharray="5 5"
                    strokeOpacity={0.5}
                  />
                )
              )}
              
              {/* Data lines */}
              {selectedMetrics.map((metric) => (
                <Line
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  stroke={metricColors[metric]}
                  strokeWidth={2}
                  dot={{ fill: metricColors[metric], strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: metricColors[metric], strokeWidth: 2 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RiskMetricsChart;