import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AllocationTimeline = ({ timelineData }) => {
  const [selectedAssets, setSelectedAssets] = useState(['BTC', 'ETH', 'BNB']);
  const [timeRange, setTimeRange] = useState('3M');

  const timeRanges = [
    { value: '1M', label: '1 Month' },
    { value: '3M', label: '3 Months' },
    { value: '6M', label: '6 Months' },
    { value: '1Y', label: '1 Year' }
  ];

  const assetColors = {
    BTC: '#1976D2',
    ETH: '#4CAF50',
    BNB: '#FF9800',
    ADA: '#9C27B0',
    SOL: '#F44336',
    DOT: '#00BCD4',
    LINK: '#795548',
    Others: '#607D8B'
  };

  const availableAssets = Object.keys(assetColors);

  const toggleAsset = (asset) => {
    setSelectedAssets(prev => 
      prev.includes(asset) 
        ? prev.filter(a => a !== asset)
        : [...prev, asset]
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-4 shadow-lg">
          <p className="font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm text-foreground">{entry.dataKey}</span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {entry.value.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border crypto-elevation-1 p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Allocation Timeline</h3>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {timeRanges.map((range) => (
              <Button
                key={range.value}
                variant={timeRange === range.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange(range.value)}
                className="px-3 py-1 text-xs"
              >
                {range.label}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export Chart
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart */}
        <div className="lg:col-span-3">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
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
              
              {selectedAssets.map((asset) => (
                <Line
                  key={asset}
                  type="monotone"
                  dataKey={asset}
                  stroke={assetColors[asset]}
                  strokeWidth={2}
                  dot={{ fill: assetColors[asset], strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: assetColors[asset], strokeWidth: 2 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Asset Selection */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Select Assets</h4>
          <div className="space-y-2">
            {availableAssets.map((asset) => (
              <div key={asset} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={asset}
                  checked={selectedAssets.includes(asset)}
                  onChange={() => toggleAsset(asset)}
                  className="rounded border-border"
                />
                <label 
                  htmlFor={asset}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: assetColors[asset] }}
                  ></div>
                  <span className="text-sm text-foreground">{asset}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedAssets(availableAssets)}
                className="text-xs"
              >
                Select All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedAssets([])}
                className="text-xs"
              >
                Clear All
              </Button>
            </div>
          </div>

          {/* Key Insights */}
          <div className="pt-4 border-t border-border">
            <h4 className="font-medium text-foreground mb-3">Key Insights</h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="TrendingUp" size={14} className="text-success" />
                  <span className="font-medium text-foreground">Trending Up</span>
                </div>
                <p className="text-muted-foreground">ETH allocation increased by 3.2% this month</p>
              </div>
              
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="AlertTriangle" size={14} className="text-warning" />
                  <span className="font-medium text-foreground">Drift Alert</span>
                </div>
                <p className="text-muted-foreground">BTC allocation 4.5% above target</p>
              </div>
              
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Target" size={14} className="text-primary" />
                  <span className="font-medium text-foreground">Rebalance Due</span>
                </div>
                <p className="text-muted-foreground">Next scheduled rebalancing in 5 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocationTimeline;