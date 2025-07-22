import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

// Robust polyfill for UUID generation (browser safe)
const generateId = () => {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  if (window.crypto?.getRandomValues) {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  // Fallback for environments without crypto
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};


function PriceChart({ symbol = 'BTC/USD', timeRange = '1h' }) {
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState('candlestick');
  const [showVolume, setShowVolume] = useState(true);
  // Persistent indicators state
  const getInitialIndicators = () => {
    const saved = window.localStorage.getItem('chartIndicators');
    return saved ? JSON.parse(saved) : ['MA20', 'MA50'];
  };
  const [indicators, setIndicators] = useState(getInitialIndicators());

  // Mock candlestick data
  const generateMockData = () => {
    const data = [];
    const basePrice = 43250;
    let currentPrice = basePrice;
    for (let i = 0; i < 100; i++) {
      const timestamp = new Date(Date.now() - (100 - i) * 60000);
      const change = (Math.random() - 0.5) * 200;
      currentPrice += change;
      const open = currentPrice;
      const high = open + Math.random() * 100;
      const low = open - Math.random() * 100;
      const close = low + Math.random() * (high - low);
      const volume = Math.random() * 1000000;
      data.push({
        id: generateId(),
        timestamp: timestamp.toLocaleTimeString(),
        open,
        high,
        low,
        close,
        volume,
        price: close,
        ma20: close + (Math.random() - 0.5) * 50,
        ma50: close + (Math.random() - 0.5) * 100
      });
    }
    return data;
  };

  const [chartData, setChartData] = useState(generateMockData());

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [chartData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(generateMockData());
    }, 5000);
    return () => clearInterval(interval);
  }, [timeRange]);

  const chartTools = [
    { id: 'candlestick', label: 'Candlestick', icon: 'BarChart3' },
    { id: 'line', label: 'Line', icon: 'TrendingUp' },
    { id: 'area', label: 'Area', icon: 'Activity' }
  ];

  const technicalIndicators = [
    { id: 'MA20', label: 'MA 20', color: '#FF6B35' },
    { id: 'MA50', label: 'MA 50', color: '#1976D2' },
    { id: 'RSI', label: 'RSI', color: '#4CAF50' },
    { id: 'MACD', label: 'MACD', color: '#9C27B0' }
  ];

  const toggleIndicator = (indicatorId) => {
    setIndicators(prev => {
      const updated = prev.includes(indicatorId)
        ? prev.filter(id => id !== indicatorId)
        : [...prev, indicatorId];
      window.localStorage.setItem('chartIndicators', JSON.stringify(updated));
      return updated;
    });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <span className="text-xs text-muted-foreground">{entry.name}:</span>
              <span className="text-sm font-mono text-foreground">
                ${entry.value?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 overflow-hidden">
      {/* Chart Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-foreground">{symbol}</h3>
          <div className="flex items-center space-x-2">
            <div className="relative group">
              <span className="text-3xl font-extrabold text-primary animate-fadeInUp" aria-label="Current price">
                ${chartData[chartData.length - 1]?.price.toLocaleString()}
              </span>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-10 hidden group-hover:block bg-popover border border-border rounded px-2 py-1 text-xs text-muted-foreground shadow-lg whitespace-nowrap">
                {`Current price for ${symbol}`}
              </div>
            </div>
            <div className="relative group flex items-center space-x-1 text-success animate-pulse" aria-label="Price change">
              <Icon name="TrendingUp" size={18} />
              <span className="text-lg font-semibold">+2.4%</span>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-10 hidden group-hover:block bg-popover border border-border rounded px-2 py-1 text-xs text-success shadow-lg whitespace-nowrap">
                {`24h change for ${symbol}`}
              </div>
            </div>
          </div>
        </div>

        {/* Chart Tools */}
        <div className="flex items-center space-x-2">
          {chartTools.map((tool) => (
            <Button
              key={tool.id}
              variant={chartType === tool.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setChartType(tool.id)}
              iconName={tool.icon}
              iconPosition="left"
            >
              {tool.label}
            </Button>
          ))}
          
          <div className="w-px h-6 bg-border mx-2"></div>
          
          <Button
            variant={showVolume ? "default" : "ghost"}
            size="sm"
            onClick={() => setShowVolume(!showVolume)}
            iconName="BarChart2"
          >
            Volume
          </Button>
        </div>
      </div>

      {/* Technical Indicators */}
      <div className="flex items-center space-x-2 p-4 border-b border-border bg-muted/30">
        <span className="text-sm font-medium text-muted-foreground">Indicators:</span>
        {technicalIndicators.map((indicator) => (
          <div className="relative group" key={indicator.id}>
            <Button
              variant={indicators.includes(indicator.id) ? "default" : "ghost"}
              size="xs"
              onClick={() => toggleIndicator(indicator.id)}
              aria-label={`Toggle ${indicator.label}`}
            >
              {indicator.label}
            </Button>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-10 hidden group-hover:block bg-popover border border-border rounded px-2 py-1 text-xs text-muted-foreground shadow-lg whitespace-nowrap">
              {`Show/hide ${indicator.label} indicator`}
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="overflow-x-auto">
        <div className="aspect-[16/9] min-w-[600px] relative overflow-hidden">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
              <div className="h-64 w-full bg-gray-200 dark:bg-gray-800 rounded-xl" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="timestamp" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={false}
                  name="Price"
                />
                {indicators.includes('MA20') && (
                  <Line
                    type="monotone"
                    dataKey="ma20"
                    stroke="#FF6B35"
                    strokeWidth={1}
                    dot={false}
                    name="MA 20"
                  />
                )}
                {indicators.includes('MA50') && (
                  <Line
                    type="monotone"
                    dataKey="ma50"
                    stroke="#1976D2"
                    strokeWidth={1}
                    dot={false}
                    name="MA 50"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Volume Chart */}
        {showVolume && (
          <div className="h-24 mt-4 border-t border-border pt-4 overflow-hidden rounded-xl">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center animate-pulse">
                <div className="w-2/3 h-2/3 bg-muted rounded-xl" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="timestamp" hide />
                  <YAxis hide />
                  <Tooltip
                    formatter={(value) => [`${value.toLocaleString()}`, 'Volume']}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Bar
                    dataKey="volume"
                    fill="var(--color-muted)"
                    opacity={0.6}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PriceChart;