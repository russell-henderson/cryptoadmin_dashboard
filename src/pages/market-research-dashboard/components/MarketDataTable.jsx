import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const MarketDataTable = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedColumns, setSelectedColumns] = useState('all');

  const columnOptions = [
    { value: 'all', label: 'All Columns' },
    { value: 'basic', label: 'Basic Info' },
    { value: 'technical', label: 'Technical Indicators' },
    { value: 'fundamental', label: 'Fundamental Metrics' }
  ];

  const marketData = [
    {
      id: 1,
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 43250.00,
      change24h: 2.4,
      volume: 28500000000,
      marketCap: 847000000000,
      rsi: 68.5,
      macd: 'Bullish',
      sentiment: 74,
      correlation: 1.00,
      volatility: 'Medium',
      signal: 'Buy',
      confidence: 85
    },
    {
      id: 2,
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2680.50,
      change24h: -1.2,
      volume: 15200000000,
      marketCap: 322000000000,
      rsi: 45.2,
      macd: 'Bearish',
      sentiment: 68,
      correlation: 0.73,
      volatility: 'High',
      signal: 'Hold',
      confidence: 72
    },
    {
      id: 3,
      symbol: 'ADA',
      name: 'Cardano',
      price: 0.485,
      change24h: 5.8,
      volume: 890000000,
      marketCap: 17200000000,
      rsi: 72.1,
      macd: 'Bullish',
      sentiment: 81,
      correlation: 0.65,
      volatility: 'High',
      signal: 'Buy',
      confidence: 78
    },
    {
      id: 4,
      symbol: 'DOT',
      name: 'Polkadot',
      price: 7.23,
      change24h: -3.1,
      volume: 420000000,
      marketCap: 9800000000,
      rsi: 38.7,
      macd: 'Bearish',
      sentiment: 52,
      correlation: 0.58,
      volatility: 'Medium',
      signal: 'Sell',
      confidence: 69
    },
    {
      id: 5,
      symbol: 'SOL',
      name: 'Solana',
      price: 98.45,
      change24h: 8.2,
      volume: 2100000000,
      marketCap: 42500000000,
      rsi: 78.9,
      macd: 'Bullish',
      sentiment: 89,
      correlation: 0.71,
      volatility: 'Very High',
      signal: 'Buy',
      confidence: 91
    },
    {
      id: 6,
      symbol: 'MATIC',
      name: 'Polygon',
      price: 0.89,
      change24h: 1.7,
      volume: 680000000,
      marketCap: 8200000000,
      rsi: 55.3,
      macd: 'Neutral',
      sentiment: 63,
      correlation: 0.62,
      volatility: 'Medium',
      signal: 'Hold',
      confidence: 65
    }
  ];

  const columns = [
    { key: 'symbol', label: 'Symbol', sortable: true, type: 'text' },
    { key: 'name', label: 'Name', sortable: true, type: 'text' },
    { key: 'price', label: 'Price', sortable: true, type: 'currency' },
    { key: 'change24h', label: '24h Change', sortable: true, type: 'percentage' },
    { key: 'volume', label: 'Volume', sortable: true, type: 'currency' },
    { key: 'marketCap', label: 'Market Cap', sortable: true, type: 'currency' },
    { key: 'rsi', label: 'RSI', sortable: true, type: 'number' },
    { key: 'macd', label: 'MACD', sortable: false, type: 'text' },
    { key: 'sentiment', label: 'Sentiment', sortable: true, type: 'percentage' },
    { key: 'correlation', label: 'Correlation', sortable: true, type: 'number' },
    { key: 'volatility', label: 'Volatility', sortable: false, type: 'text' },
    { key: 'signal', label: 'Signal', sortable: false, type: 'signal' },
    { key: 'confidence', label: 'Confidence', sortable: true, type: 'percentage' }
  ];

  const getVisibleColumns = () => {
    switch (selectedColumns) {
      case 'basic':
        return columns.filter(col => ['symbol', 'name', 'price', 'change24h', 'volume'].includes(col.key));
      case 'technical':
        return columns.filter(col => ['symbol', 'rsi', 'macd', 'volatility', 'signal'].includes(col.key));
      case 'fundamental':
        return columns.filter(col => ['symbol', 'marketCap', 'sentiment', 'correlation', 'confidence'].includes(col.key));
      default:
        return columns;
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...marketData];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [marketData, sortConfig]);

  const filteredData = sortedData.filter(item =>
    item.symbol.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const formatValue = (value, type) => {
    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: value < 1 ? 4 : 2
        }).format(value);
      case 'percentage':
        return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
      case 'number':
        return value.toFixed(2);
      default:
        return value;
    }
  };

  const getChangeColor = (value) => {
    return value > 0 ? 'text-success' : value < 0 ? 'text-error' : 'text-muted-foreground';
  };

  const getSignalColor = (signal) => {
    switch (signal.toLowerCase()) {
      case 'buy':
        return 'bg-success text-success-foreground';
      case 'sell':
        return 'bg-error text-error-foreground';
      case 'hold':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSentimentColor = (sentiment) => {
    if (sentiment >= 70) return 'text-success';
    if (sentiment >= 40) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg crypto-elevation-1">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Market Data Analysis</h2>
            <p className="text-sm text-muted-foreground">
              Comprehensive market metrics with technical and fundamental indicators
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-64">
              <Input
                type="search"
                placeholder="Search assets..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
              />
            </div>
            
            <div className="w-full sm:w-48">
              <Select
                options={columnOptions}
                value={selectedColumns}
                onChange={setSelectedColumns}
                placeholder="Column View"
              />
            </div>
            
            <Button variant="outline" iconName="Download" iconSize={16}>
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              {getVisibleColumns().map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-sm font-medium text-muted-foreground ${
                    column.sortable ? 'cursor-pointer hover:text-foreground' : ''
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <Icon
                        name={
                          sortConfig.key === column.key
                            ? sortConfig.direction === 'asc' ?'ChevronUp' :'ChevronDown' :'ChevronsUpDown'
                        }
                        size={14}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b border-border hover:bg-muted/50 crypto-transition ${
                  index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                }`}
              >
                {getVisibleColumns().map((column) => (
                  <td key={column.key} className="px-4 py-3 text-sm">
                    {column.key === 'symbol' && (
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-primary-foreground">
                            {item.symbol.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-foreground">{item.symbol}</span>
                      </div>
                    )}
                    
                    {column.key === 'name' && (
                      <span className="text-foreground">{item.name}</span>
                    )}
                    
                    {column.key === 'change24h' && (
                      <span className={getChangeColor(item.change24h)}>
                        {formatValue(item.change24h, column.type)}
                      </span>
                    )}
                    
                    {column.key === 'signal' && (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSignalColor(item.signal)}`}>
                        {item.signal}
                      </span>
                    )}
                    
                    {column.key === 'sentiment' && (
                      <span className={getSentimentColor(item.sentiment)}>
                        {formatValue(item.sentiment, column.type)}
                      </span>
                    )}
                    
                    {column.key === 'macd' && (
                      <span className={`text-xs ${
                        item.macd === 'Bullish' ? 'text-success' : 
                        item.macd === 'Bearish' ? 'text-error' : 'text-muted-foreground'
                      }`}>
                        {item.macd}
                      </span>
                    )}
                    
                    {column.key === 'volatility' && (
                      <span className={`text-xs ${
                        item.volatility === 'Very High' ? 'text-error' :
                        item.volatility === 'High' ? 'text-warning' :
                        item.volatility === 'Medium' ? 'text-primary' : 'text-success'
                      }`}>
                        {item.volatility}
                      </span>
                    )}
                    
                    {!['symbol', 'name', 'change24h', 'signal', 'sentiment', 'macd', 'volatility'].includes(column.key) && (
                      <span className="text-foreground">
                        {formatValue(item[column.key], column.type)}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing {filteredData.length} of {marketData.length} assets</span>
          <div className="flex items-center space-x-2">
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
            <Button variant="ghost" size="icon" iconName="RefreshCw" iconSize={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDataTable;