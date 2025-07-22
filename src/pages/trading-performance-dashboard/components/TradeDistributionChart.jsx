import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const TradeDistributionChart = () => {
  const distributionData = [
    { name: 'Bitcoin (BTC)', value: 45.2, trades: 156, color: '#F7931A' },
    { name: 'Ethereum (ETH)', value: 28.7, trades: 89, color: '#627EEA' },
    { name: 'Cardano (ADA)', value: 12.4, trades: 67, color: '#0033AD' },
    { name: 'Solana (SOL)', value: 8.9, trades: 34, color: '#9945FF' },
    { name: 'Others', value: 4.8, trades: 28, color: '#6B7280' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-popover-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">{`${data.value}% (${data.trades} trades)`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="500"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    ) : null;
  };

  return (
    <div className="bg-card rounded-lg p-6 crypto-elevation-1">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="PieChart" size={24} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Trade Distribution</h3>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={distributionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {distributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {distributionData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm font-medium text-foreground">{item.name}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{item.value}%</p>
              <p className="text-xs text-muted-foreground">{item.trades} trades</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground">374</p>
            <p className="text-sm text-muted-foreground">Total Trades</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-success">68.5%</p>
            <p className="text-sm text-muted-foreground">Win Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeDistributionChart;