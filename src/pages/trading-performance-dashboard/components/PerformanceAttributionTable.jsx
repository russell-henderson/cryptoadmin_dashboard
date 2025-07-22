import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceAttributionTable = () => {
  const [sortConfig, setSortConfig] = useState({ key: 'totalPnL', direction: 'desc' });
  const [filterBy, setFilterBy] = useState('all');

  const attributionData = [
    {
      id: 1,
      cryptocurrency: 'Bitcoin (BTC)',
      timePeriod: 'Last 7 Days',
      strategy: 'Scalping',
      totalPnL: 15420.50,
      winRate: 72.5,
      avgTrade: 245.30,
      trades: 63,
      volume: 2450000,
      sharpeRatio: 2.8
    },
    {
      id: 2,
      cryptocurrency: 'Ethereum (ETH)',
      timePeriod: 'Last 7 Days',
      strategy: 'Swing Trading',
      totalPnL: 8750.20,
      winRate: 65.2,
      avgTrade: 312.50,
      trades: 28,
      volume: 1680000,
      sharpeRatio: 2.1
    },
    {
      id: 3,
      cryptocurrency: 'Cardano (ADA)',
      timePeriod: 'Last 7 Days',
      strategy: 'Arbitrage',
      totalPnL: 4320.80,
      winRate: 78.9,
      avgTrade: 180.90,
      trades: 38,
      volume: 890000,
      sharpeRatio: 3.2
    },
    {
      id: 4,
      cryptocurrency: 'Solana (SOL)',
      timePeriod: 'Last 7 Days',
      strategy: 'Scalping',
      totalPnL: 2890.40,
      winRate: 68.4,
      avgTrade: 195.20,
      trades: 19,
      volume: 560000,
      sharpeRatio: 2.4
    },
    {
      id: 5,
      cryptocurrency: 'Bitcoin (BTC)',
      timePeriod: 'Last 30 Days',
      strategy: 'Swing Trading',
      totalPnL: -1250.30,
      winRate: 58.3,
      avgTrade: -89.31,
      trades: 14,
      volume: 1200000,
      sharpeRatio: 1.2
    },
    {
      id: 6,
      cryptocurrency: 'Ethereum (ETH)',
      timePeriod: 'Last 30 Days',
      strategy: 'Arbitrage',
      totalPnL: 6780.90,
      winRate: 71.4,
      avgTrade: 226.03,
      trades: 30,
      volume: 1450000,
      sharpeRatio: 2.6
    }
  ];

  const strategies = ['all', 'Scalping', 'Swing Trading', 'Arbitrage'];
  const timePeriods = ['all', 'Last 7 Days', 'Last 30 Days'];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = attributionData.filter(item => {
    if (filterBy === 'all') return true;
    return item.strategy === filterBy;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
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

  const getPnLColor = (pnl) => {
    return pnl >= 0 ? 'text-success' : 'text-error';
  };

  const getPnLBgColor = (pnl) => {
    return pnl >= 0 ? 'bg-success/10' : 'bg-error/10';
  };

  const SortableHeader = ({ label, sortKey }) => (
    <th 
      className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground crypto-transition"
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <Icon 
          name={sortConfig.key === sortKey && sortConfig.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
          size={14}
          className={sortConfig.key === sortKey ? 'text-primary' : 'text-muted-foreground'}
        />
      </div>
    </th>
  );

  return (
    <div className="bg-card rounded-lg crypto-elevation-1">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <Icon name="BarChart3" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Performance Attribution</h3>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {strategies.map(strategy => (
              <option key={strategy} value={strategy}>
                {strategy === 'all' ? 'All Strategies' : strategy}
              </option>
            ))}
          </select>
          
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <SortableHeader label="Cryptocurrency" sortKey="cryptocurrency" />
              <SortableHeader label="Time Period" sortKey="timePeriod" />
              <SortableHeader label="Strategy" sortKey="strategy" />
              <SortableHeader label="Total P&L" sortKey="totalPnL" />
              <SortableHeader label="Win Rate" sortKey="winRate" />
              <SortableHeader label="Avg Trade" sortKey="avgTrade" />
              <SortableHeader label="Trades" sortKey="trades" />
              <SortableHeader label="Volume" sortKey="volume" />
              <SortableHeader label="Sharpe Ratio" sortKey="sharpeRatio" />
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {sortedData.map((item) => (
              <tr key={item.id} className="hover:bg-muted/30 crypto-transition">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">
                        {item.cryptocurrency.split(' ')[0].charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.cryptocurrency}</span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {item.timePeriod}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {item.strategy}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full ${getPnLBgColor(item.totalPnL)}`}>
                    <span className={`text-sm font-medium font-mono ${getPnLColor(item.totalPnL)}`}>
                      {formatCurrency(item.totalPnL)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-foreground font-mono">
                  {item.winRate.toFixed(1)}%
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium font-mono ${getPnLColor(item.avgTrade)}`}>
                    {formatCurrency(item.avgTrade)}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-foreground font-mono">
                  {item.trades}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-foreground font-mono">
                  {formatVolume(item.volume)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-foreground font-mono">
                  {item.sharpeRatio.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Showing {sortedData.length} of {attributionData.length} records
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Filter">
            More Filters
          </Button>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAttributionTable;