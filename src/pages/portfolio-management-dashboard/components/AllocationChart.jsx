import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AllocationChart = ({ allocationData, showTargetOverlay, onToggleTarget }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const COLORS = [
    '#1976D2', // Bitcoin - Primary Blue
    '#4CAF50', // Ethereum - Success Green
    '#FF9800', // Binance Coin - Warning Orange
    '#9C27B0', // Cardano - Purple
    '#F44336', // Solana - Error Red
    '#00BCD4', // Polkadot - Cyan
    '#795548', // Chainlink - Brown
    '#607D8B'  // Others - Blue Grey
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-4 shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: payload[0].color }}
            ></div>
            <span className="font-medium text-foreground">{data.name}</span>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current:</span>
              <span className="font-medium">{data.value.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Value:</span>
              <span className="font-medium">{data.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
            </div>
            {showTargetOverlay && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Target:</span>
                <span className="font-medium">{data.target.toFixed(2)}%</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Drift:</span>
              <span className={`font-medium ${Math.abs(data.drift) > 2 ? 'text-warning' : 'text-success'}`}>
                {data.drift > 0 ? '+' : ''}{data.drift.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // Don't show labels for slices < 5%

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border crypto-elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="PieChart" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Asset Allocation</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={showTargetOverlay ? "default" : "outline"}
            size="sm"
            iconName="Target"
            iconPosition="left"
            onClick={onToggleTarget}
          >
            Target Overlay
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={CustomLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {allocationData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    stroke={activeIndex === index ? '#ffffff' : 'none'}
                    strokeWidth={activeIndex === index ? 2 : 0}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend & Details */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground mb-4">Holdings Breakdown</h4>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {allocationData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <div>
                    <div className="font-medium text-foreground text-sm">{item.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium text-foreground text-sm">{item.value.toFixed(2)}%</div>
                  {showTargetOverlay && (
                    <div className={`text-xs ${Math.abs(item.drift) > 2 ? 'text-warning' : 'text-success'}`}>
                      Target: {item.target.toFixed(1)}%
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocationChart;