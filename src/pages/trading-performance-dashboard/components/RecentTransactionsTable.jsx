import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentTransactionsTable = () => {
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });

  const transactions = [
    {
      id: 'TXN-001',
      asset: 'BTC',
      type: 'BUY',
      entryPrice: 43250.00,
      exitPrice: 44100.00,
      quantity: 0.5,
      realizedPnL: 425.00,
      timestamp: '2025-01-15 14:30:22',
      strategy: 'Scalping',
      status: 'Completed'
    },
    {
      id: 'TXN-002',
      asset: 'ETH',
      type: 'SELL',
      entryPrice: 2680.50,
      exitPrice: 2645.20,
      quantity: 2.0,
      realizedPnL: -70.60,
      timestamp: '2025-01-15 14:25:18',
      strategy: 'Swing',
      status: 'Completed'
    },
    {
      id: 'TXN-003',
      asset: 'ADA',
      type: 'BUY',
      entryPrice: 0.4520,
      exitPrice: 0.4680,
      quantity: 1000,
      realizedPnL: 160.00,
      timestamp: '2025-01-15 14:20:45',
      strategy: 'Arbitrage',
      status: 'Completed'
    },
    {
      id: 'TXN-004',
      asset: 'SOL',
      type: 'BUY',
      entryPrice: 98.75,
      exitPrice: null,
      quantity: 5.0,
      realizedPnL: null,
      timestamp: '2025-01-15 14:15:33',
      strategy: 'Swing',
      status: 'Open'
    },
    {
      id: 'TXN-005',
      asset: 'BTC',
      type: 'SELL',
      entryPrice: 43800.00,
      exitPrice: 43950.00,
      quantity: 0.25,
      realizedPnL: 37.50,
      timestamp: '2025-01-15 14:10:12',
      strategy: 'Scalping',
      status: 'Completed'
    }
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
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
    if (value === null) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const getTypeColor = (type) => {
    return type === 'BUY' ? 'text-success' : 'text-error';
  };

  const getStatusColor = (status) => {
    return status === 'Completed' ? 'text-success' : 'text-warning';
  };

  const getPnLColor = (pnl) => {
    if (pnl === null) return 'text-muted-foreground';
    return pnl >= 0 ? 'text-success' : 'text-error';
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
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Activity" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        </div>
        <Button variant="outline" size="sm" iconName="ExternalLink">
          View All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <SortableHeader label="Asset" sortKey="asset" />
              <SortableHeader label="Type" sortKey="type" />
              <SortableHeader label="Entry Price" sortKey="entryPrice" />
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Exit Price
              </th>
              <SortableHeader label="Quantity" sortKey="quantity" />
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                P&L
              </th>
              <SortableHeader label="Time" sortKey="timestamp" />
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {sortedTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-muted/30 crypto-transition">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{transaction.asset}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{transaction.asset}</span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${getTypeColor(transaction.type)}`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-foreground font-mono">
                  {formatCurrency(transaction.entryPrice)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-foreground font-mono">
                  {transaction.exitPrice ? formatCurrency(transaction.exitPrice) : '-'}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-foreground font-mono">
                  {transaction.quantity}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium font-mono ${getPnLColor(transaction.realizedPnL)}`}>
                    {transaction.realizedPnL ? formatCurrency(transaction.realizedPnL) : '-'}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {new Date(transaction.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${transaction.status === 'Completed' ? 'bg-success' : 'bg-warning'}`}></div>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Showing {sortedTransactions.length} of {sortedTransactions.length} transactions
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export CSV
          </Button>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactionsTable;