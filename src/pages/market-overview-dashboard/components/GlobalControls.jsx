import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const GlobalControls = ({ onExchangeChange, onTimeRangeChange, onAutoRefreshChange, onWatchlistFilter }) => {
  const [selectedExchange, setSelectedExchange] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [autoRefresh, setAutoRefresh] = useState(5);
  const [watchlistOnly, setWatchlistOnly] = useState(false);

  const exchangeOptions = [
    { value: 'all', label: 'All Exchanges' },
    { value: 'binance', label: 'Binance' },
    { value: 'coinbase', label: 'Coinbase Pro' },
    { value: 'kraken', label: 'Kraken' },
    { value: 'huobi', label: 'Huobi' },
    { value: 'okx', label: 'OKX' }
  ];

  const timeRangeOptions = [
    { value: '1m', label: '1 Minute' },
    { value: '5m', label: '5 Minutes' },
    { value: '15m', label: '15 Minutes' },
    { value: '1h', label: '1 Hour' },
    { value: '4h', label: '4 Hours' },
    { value: '1d', label: '1 Day' }
  ];

  const refreshOptions = [
    { value: 1, label: '1 Second' },
    { value: 5, label: '5 Seconds' },
    { value: 15, label: '15 Seconds' },
    { value: 30, label: '30 Seconds' },
    { value: 60, label: '1 Minute' }
  ];

  const handleExchangeChange = (value) => {
    setSelectedExchange(value);
    onExchangeChange?.(value);
  };

  const handleTimeRangeChange = (value) => {
    setSelectedTimeRange(value);
    onTimeRangeChange?.(value);
  };

  const handleAutoRefreshChange = (value) => {
    setAutoRefresh(value);
    onAutoRefreshChange?.(value);
  };

  const handleWatchlistToggle = () => {
    const newValue = !watchlistOnly;
    setWatchlistOnly(newValue);
    onWatchlistFilter?.(newValue);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 crypto-elevation-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Exchange Selector */}
        <div className="col-span-1 lg:col-span-2">
          <Select
            label="Exchange"
            options={exchangeOptions}
            value={selectedExchange}
            onChange={handleExchangeChange}
            className="w-full"
          />
        </div>

        {/* Time Range Picker */}
        <div className="col-span-1">
          <Select
            label="Time Range"
            options={timeRangeOptions}
            value={selectedTimeRange}
            onChange={handleTimeRangeChange}
            className="w-full"
          />
        </div>

        {/* Auto Refresh */}
        <div className="col-span-1">
          <Select
            label="Auto Refresh"
            options={refreshOptions}
            value={autoRefresh}
            onChange={handleAutoRefreshChange}
            className="w-full"
          />
        </div>

        {/* Watchlist Filter */}
        <div className="col-span-1 flex items-end">
          <Button
            variant={watchlistOnly ? "default" : "outline"}
            onClick={handleWatchlistToggle}
            iconName="Star"
            iconPosition="left"
            className="w-full"
          >
            Watchlist Only
          </Button>
        </div>

        {/* Connection Status */}
        <div className="col-span-1 flex items-end">
          <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 rounded-lg w-full">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-success">Live</span>
            <span className="text-xs text-muted-foreground ml-auto">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalControls;