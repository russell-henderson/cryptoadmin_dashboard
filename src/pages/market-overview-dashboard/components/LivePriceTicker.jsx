import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LivePriceTicker = () => {
  const [activeTab, setActiveTab] = useState('gainers');
  const [watchlist, setWatchlist] = useState(['BTC', 'ETH', 'ADA']);

  const generateMockPrices = () => {
    const symbols = ['BTC', 'ETH', 'BNB', 'ADA', 'SOL', 'XRP', 'DOT', 'AVAX', 'MATIC', 'LINK'];
    return symbols.map(symbol => ({
      symbol,
      name: {
        'BTC': 'Bitcoin',
        'ETH': 'Ethereum',
        'BNB': 'Binance Coin',
        'ADA': 'Cardano',
        'SOL': 'Solana',
        'XRP': 'Ripple',
        'DOT': 'Polkadot',
        'AVAX': 'Avalanche',
        'MATIC': 'Polygon',
        'LINK': 'Chainlink'
      }[symbol],
      price: Math.random() * 50000 + 100,
      change24h: (Math.random() - 0.5) * 20,
      volume24h: Math.random() * 1000000000,
      marketCap: Math.random() * 500000000000,
      sparkline: Array.from({ length: 20 }, () => Math.random() * 100)
    }));
  };

  const [priceData, setPriceData] = useState(generateMockPrices());

  useEffect(() => {
    const interval = setInterval(() => {
      setPriceData(generateMockPrices());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getFilteredData = () => {
    switch (activeTab) {
      case 'gainers':
        return priceData.filter(item => item.change24h > 0).sort((a, b) => b.change24h - a.change24h);
      case 'losers':
        return priceData.filter(item => item.change24h < 0).sort((a, b) => a.change24h - b.change24h);
      case 'volume':
        return priceData.sort((a, b) => b.volume24h - a.volume24h);
      case 'watchlist':
        return priceData.filter(item => watchlist.includes(item.symbol));
      default:
        return priceData;
    }
  };

  const toggleWatchlist = (symbol) => {
    setWatchlist(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  const generateMiniSparkline = (data) => {
    if (!data || data.length === 0) return null;
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 40;
      const y = 16 - ((value - min) / range) * 16;
      return `${x},${y}`;
    }).join(' ');

    const isPositive = data[data.length - 1] > data[0];

    return (
      <svg width="40" height="16" className="opacity-60">
        <polyline
          points={points}
          fill="none"
          stroke={isPositive ? 'var(--color-success)' : 'var(--color-error)'}
          strokeWidth="1"
        />
      </svg>
    );
  };

  const tabs = [
    { id: 'gainers', label: 'Top Gainers', icon: 'TrendingUp' },
    { id: 'losers', label: 'Top Losers', icon: 'TrendingDown' },
    { id: 'volume', label: 'Volume', icon: 'BarChart2' },
    { id: 'watchlist', label: 'Watchlist', icon: 'Star' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg crypto-elevation-1">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Live Prices</h3>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              iconName={tab.icon}
              iconPosition="left"
              className="flex-1"
            >
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.icon}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Price List */}
      <div className="max-h-96 overflow-y-auto">
        {getFilteredData().slice(0, 10).map((item, index) => (
          <div
            key={item.symbol}
            className="flex items-center justify-between p-4 border-b border-border last:border-b-0 hover:bg-muted/30 crypto-transition"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                <span className="text-xs font-bold text-primary">{item.symbol.slice(0, 2)}</span>
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground">{item.symbol}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleWatchlist(item.symbol)}
                    className="w-4 h-4 p-0"
                  >
                    <Icon
                      name="Star"
                      size={12}
                      color={watchlist.includes(item.symbol) ? 'var(--color-warning)' : 'var(--color-muted-foreground)'}
                    />
                  </Button>
                </div>
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Mini Sparkline */}
              <div className="hidden sm:block">
                {generateMiniSparkline(item.sparkline)}
              </div>

              {/* Price and Change */}
              <div className="text-right">
                <div className="font-mono text-sm font-medium text-foreground">
                  ${item.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
                <div className={`text-xs font-medium ${item.change24h >= 0 ? 'text-success' : 'text-error'}`}>
                  {item.change24h >= 0 ? '+' : ''}{item.change24h.toFixed(2)}%
                </div>
              </div>

              {/* Volume (hidden on mobile) */}
              <div className="hidden md:block text-right min-w-[80px]">
                <div className="text-xs text-muted-foreground">Volume</div>
                <div className="text-xs font-mono text-foreground">
                  ${(item.volume24h / 1000000).toFixed(1)}M
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Real-time data</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePriceTicker;