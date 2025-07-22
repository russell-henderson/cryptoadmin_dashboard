import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MarketMetricsCard from './components/MarketMetricsCard';
import GlobalControls from './components/GlobalControls';
import PriceChart from './components/PriceChart';
import LivePriceTicker from './components/LivePriceTicker';
import CryptocurrencyTable from './components/CryptocurrencyTable';

const MarketOverviewDashboard = () => {
  const [selectedExchange, setSelectedExchange] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [autoRefresh, setAutoRefresh] = useState(5);
  const [watchlistOnly, setWatchlistOnly] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleExchangeChange = (exchange) => {
    setSelectedExchange(exchange);
    console.log('Exchange changed to:', exchange);
  };

  const handleTimeRangeChange = (range) => {
    setSelectedTimeRange(range);
    console.log('Time range changed to:', range);
  };

  const handleAutoRefreshChange = (interval) => {
    setAutoRefresh(interval);
    console.log('Auto refresh changed to:', interval);
  };

  const handleWatchlistFilter = (enabled) => {
    setWatchlistOnly(enabled);
    console.log('Watchlist filter:', enabled);
  };

  const marketMetrics = [
    {
      title: "Total Market Cap",
      value: "$1.68T",
      change: "+2.4%",
      changeType: "positive",
      icon: "DollarSign",
      sparklineData: [100, 105, 103, 108, 112, 110, 115, 118, 116, 120]
    },
    {
      title: "24h Volume",
      value: "$89.2B",
      change: "+5.7%",
      changeType: "positive",
      icon: "BarChart2",
      sparklineData: [80, 85, 82, 88, 92, 90, 95, 98, 96, 100]
    },
    {
      title: "Fear & Greed Index",
      value: "72",
      change: "Greed",
      changeType: "positive",
      icon: "Activity",
      sparklineData: [60, 65, 63, 68, 72, 70, 75, 78, 76, 72]
    },
    {
      title: "BTC Dominance",
      value: "42.3%",
      change: "-0.8%",
      changeType: "negative",
      icon: "PieChart",
      sparklineData: [45, 44, 43, 42, 41, 42, 43, 42, 41, 42.3]
    },
    {
      title: "Active Coins",
      value: "2,847",
      change: "+12",
      changeType: "positive",
      icon: "Coins",
      sparklineData: [2800, 2810, 2820, 2830, 2835, 2840, 2845, 2847, 2847, 2847]
    },
    {
      title: "Market Trend Score",
      value: "8.2/10",
      change: "+0.3",
      changeType: "positive",
      icon: "TrendingUp",
      sparklineData: [7.5, 7.8, 7.6, 8.0, 8.2, 8.1, 8.3, 8.2, 8.1, 8.2]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />

      <main className="lg:ml-80 pt-16 pb-20 lg:pb-0">
        <div className="p-6">
          <Breadcrumb />

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Market Overview</h1>
            <p className="text-muted-foreground">
              Real-time cryptocurrency market intelligence and trading insights
            </p>
          </div>

          <GlobalControls
            onExchangeChange={handleExchangeChange}
            onTimeRangeChange={handleTimeRangeChange}
            onAutoRefreshChange={handleAutoRefreshChange}
            onWatchlistFilter={handleWatchlistFilter}
          />

          <div className="overflow-x-auto scrollbar-hide">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-6 min-w-[320px]">
              {marketMetrics.map((metric, index) => (
                <MarketMetricsCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  changeType={metric.changeType}
                  icon={metric.icon}
                  sparklineData={metric.sparklineData}
                  loading={loading}
                />
              ))}
            </div>
          </div>

          <div className="overflow-x-auto scrollbar-hide">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6 min-w-[320px]">
              <div className="xl:col-span-2 min-w-[320px]">
                <PriceChart symbol="BTC/USD" timeRange={selectedTimeRange} />
              </div>
              <div className="xl:col-span-1 min-w-[320px]">
                <LivePriceTicker />
              </div>
            </div>
          </div>

          <CryptocurrencyTable />
        </div>
      </main>
    </div>
  );
};

export default MarketOverviewDashboard;
