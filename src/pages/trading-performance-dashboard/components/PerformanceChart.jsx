import React, { useState } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceChart = ({ dateRange }) => {
  const [selectedAsset, setSelectedAsset] = useState('all');
  const [selectedStrategy, setSelectedStrategy] = useState('all');

  const chartData = [
    { date: '2025-01-01', cumulativePnL: 15420, dailyVolume: 2450000, btcPnL: 8200, ethPnL: 4100, adaPnL: 3120 },
    { date: '2025-01-02', cumulativePnL: 18750, dailyVolume: 3200000, btcPnL: 9800, ethPnL: 5200, adaPnL: 3750 },
    { date: '2025-01-03', cumulativePnL: 22100, dailyVolume: 2800000, btcPnL: 11200, ethPnL: 6300, adaPnL: 4600 },
    { date: '2025-01-04', cumulativePnL: 19800, dailyVolume: 4100000, btcPnL: 10100, ethPnL: 5500, adaPnL: 4200 },
    { date: '2025-01-05', cumulativePnL: 25600, dailyVolume: 3600000, btcPnL: 13400, ethPnL: 7200, adaPnL: 5000 },
    { date: '2025-01-06', cumulativePnL: 28900, dailyVolume: 2900000, btcPnL: 15100, ethPnL: 8300, adaPnL: 5500 },
    { date: '2025-01-07', cumulativePnL: 32400, dailyVolume: 3800000, btcPnL: 16800, ethPnL: 9200, adaPnL: 6400 },
    { date: '2025-01-08', cumulativePnL: 35750, dailyVolume: 4200000, btcPnL: 18500, ethPnL: 10100, adaPnL: 7150 },
    { date: '2025-01-09', cumulativePnL: 38200, dailyVolume: 3100000, btcPnL: 19800, ethPnL: 10900, adaPnL: 7500 },
    { date: '2025-01-10', cumulativePnL: 41600, dailyVolume: 3700000, btcPnL: 21600, ethPnL: 11800, adaPnL: 8200 }
  ];

  const assetOptions = [
    { value: 'all', label: 'All Assets' },
    { value: 'btc', label: 'Bitcoin (BTC)' },
    { value: 'eth', label: 'Ethereum (ETH)' },
    { value: 'ada', label: 'Cardano (ADA)' }
  ];

  const strategyOptions = [
    { value: 'all', label: 'All Strategies' },
    { value: 'scalping', label: 'Scalping' },
    { value: 'swing', label: 'Swing Trading' },
    { value: 'arbitrage', label: 'Arbitrage' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatVolume = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-4 shadow-lg">
          <p className="font-medium text-popover-foreground mb-2">{`Date: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.name === 'Daily Volume' ? formatVolume(entry.value) : formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg p-6 crypto-elevation-1">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <Icon name="TrendingUp" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Performance Overview</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <select
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {assetOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <select
            value={selectedStrategy}
            onChange={(e) => setSelectedStrategy(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {strategyOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              yAxisId="pnl"
              orientation="left"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={formatCurrency}
            />
            <YAxis 
              yAxisId="volume"
              orientation="right"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={formatVolume}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              yAxisId="volume"
              dataKey="dailyVolume" 
              name="Daily Volume"
              fill="var(--color-muted)"
              opacity={0.6}
            />
            <Line 
              yAxisId="pnl"
              type="monotone" 
              dataKey="cumulativePnL" 
              name="Cumulative P&L"
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="outline" size="sm" iconName="Maximize2">
            Fullscreen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;