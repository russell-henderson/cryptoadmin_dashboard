import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DashboardHeader = ({ onDateRangeChange, onAccountChange, onStrategyToggle }) => {
  const [selectedDateRange, setSelectedDateRange] = useState('7D');
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [strategyFilter, setStrategyFilter] = useState('all');

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: '7D', label: '7 Days' },
    { value: '30D', label: '30 Days' },
    { value: 'YTD', label: 'YTD' },
    { value: 'custom', label: 'Custom' }
  ];

  const accountOptions = [
    { value: 'all', label: 'All Accounts' },
    { value: 'main', label: 'Main Trading Account' },
    { value: 'hedge', label: 'Hedge Fund Portfolio' },
    { value: 'arbitrage', label: 'Arbitrage Account' },
    { value: 'demo', label: 'Demo Account' }
  ];

  const strategyOptions = [
    { value: 'all', label: 'All Strategies' },
    { value: 'scalping', label: 'Scalping' },
    { value: 'swing', label: 'Swing Trading' },
    { value: 'arbitrage', label: 'Arbitrage' },
    { value: 'dca', label: 'DCA Strategy' }
  ];

  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range);
    onDateRangeChange?.(range);
  };

  const handleAccountChange = (account) => {
    setSelectedAccount(account);
    onAccountChange?.(account);
  };

  const handleStrategyChange = (strategy) => {
    setStrategyFilter(strategy);
    onStrategyToggle?.(strategy);
  };

  return (
    <div className="bg-card rounded-lg p-6 crypto-elevation-1 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center space-x-4 mb-6 lg:mb-0">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon name="TrendingUp" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Trading Performance</h1>
              <p className="text-sm text-muted-foreground">
                Monitor and analyze your trading effectiveness
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Date Range Picker */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-muted-foreground mb-2">TIME PERIOD</label>
            <div className="flex bg-muted rounded-lg p-1">
              {dateRangeOptions.slice(0, 4).map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleDateRangeChange(option.value)}
                  className={`px-3 py-2 text-sm font-medium rounded-md crypto-transition ${
                    selectedDateRange === option.value
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Account Selector */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-muted-foreground mb-2">ACCOUNT</label>
            <select
              value={selectedAccount}
              onChange={(e) => handleAccountChange(e.target.value)}
              className="px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring min-w-[180px]"
            >
              {accountOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Strategy Filter */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-muted-foreground mb-2">STRATEGY</label>
            <select
              value={strategyFilter}
              onChange={(e) => handleStrategyChange(e.target.value)}
              className="px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring min-w-[160px]"
            >
              {strategyOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col justify-end">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" iconName="Download">
                Export
              </Button>
              <Button variant="outline" size="sm" iconName="RefreshCw">
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Active Positions</p>
            <p className="text-2xl font-bold text-foreground">12</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Today's Trades</p>
            <p className="text-2xl font-bold text-foreground">47</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Portfolio Value</p>
            <p className="text-2xl font-bold text-foreground">$2.4M</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Last Update</p>
            <p className="text-sm font-medium text-foreground">{new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;