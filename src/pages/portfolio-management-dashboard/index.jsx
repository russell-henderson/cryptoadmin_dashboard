import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PortfolioSelector from './components/PortfolioSelector';
import MetricsRow from './components/MetricsRow';
import AllocationChart from './components/AllocationChart';
import RiskMetricsPanel from './components/RiskMetricsPanel';
import HoldingsTable from './components/HoldingsTable';
import AllocationTimeline from './components/AllocationTimeline';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';

const PortfolioManagementDashboard = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState('portfolio-1');
  const [showTargetOverlay, setShowTargetOverlay] = useState(false);
  const [rebalancingAlerts, setRebalancingAlerts] = useState(true);
  const [benchmarkComparison, setBenchmarkComparison] = useState('BTC');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for portfolios
  const portfolios = [
    {
      id: 'portfolio-1',
      name: 'Crypto Growth Fund',
      totalValue: 2450000,
      manager: 'John Smith'
    },
    {
      id: 'portfolio-2',
      name: 'Conservative Crypto',
      totalValue: 1200000,
      manager: 'Sarah Johnson'
    },
    {
      id: 'portfolio-3',
      name: 'DeFi Opportunities',
      totalValue: 850000,
      manager: 'Mike Chen'
    }
  ];

  // Mock portfolio data
  const portfolioData = {
    totalValue: 2450000,
    totalChange: 125000,
    totalChangePercent: 5.38,
    dayChange: -32000,
    dayChangePercent: -1.29,
    driftScore: 3.2,
    sharpeRatio: 1.847
  };

  // Mock allocation data
  const allocationData = [
    {
      name: 'Bitcoin',
      value: 42.5,
      amount: 1041250,
      target: 40.0,
      drift: 2.5
    },
    {
      name: 'Ethereum',
      value: 28.3,
      amount: 693350,
      target: 30.0,
      drift: -1.7
    },
    {
      name: 'Binance Coin',
      value: 12.1,
      amount: 296450,
      target: 10.0,
      drift: 2.1
    },
    {
      name: 'Cardano',
      value: 8.7,
      amount: 213150,
      target: 8.0,
      drift: 0.7
    },
    {
      name: 'Solana',
      value: 5.2,
      amount: 127400,
      target: 7.0,
      drift: -1.8
    },
    {
      name: 'Polkadot',
      value: 2.1,
      amount: 51450,
      target: 3.0,
      drift: -0.9
    },
    {
      name: 'Others',
      value: 1.1,
      amount: 26950,
      target: 2.0,
      drift: -0.9
    }
  ];

  // Mock risk data
  const riskData = {
    var95: 45000,
    varChange: 2.3,
    beta: 1.234,
    betaChange: -0.8,
    volatility: 32.5,
    volatilityChange: 1.2,
    maxDrawdown: -18.7,
    correlationMatrix: [
      [1.00, 0.72, 0.45, 0.38],
      [0.72, 1.00, 0.56, 0.42],
      [0.45, 0.56, 1.00, 0.34],
      [0.38, 0.42, 0.34, 1.00]
    ],
    concentrationRisk: [
      { asset: 'Bitcoin', weight: 42.5, riskLevel: 'medium' },
      { asset: 'Ethereum', weight: 28.3, riskLevel: 'low' },
      { asset: 'Binance Coin', weight: 12.1, riskLevel: 'low' },
      { asset: 'Top 3 Combined', weight: 82.9, riskLevel: 'high' }
    ],
    overallRiskScore: 6.2
  };

  // Mock holdings data
  const holdings = [
    {
      id: 'btc-1',
      asset: 'Bitcoin',
      symbol: 'BTC',
      type: 'cryptocurrency',
      value: 1041250,
      quantity: 24.125,
      weight: 42.5,
      target: 40.0,
      drift: 2.5,
      dayChange: -1.2,
      recommendation: 'Sell'
    },
    {
      id: 'eth-1',
      asset: 'Ethereum',
      symbol: 'ETH',
      type: 'cryptocurrency',
      value: 693350,
      quantity: 259.38,
      weight: 28.3,
      target: 30.0,
      drift: -1.7,
      dayChange: 2.4,
      recommendation: 'Buy'
    },
    {
      id: 'bnb-1',
      asset: 'Binance Coin',
      symbol: 'BNB',
      type: 'cryptocurrency',
      value: 296450,
      quantity: 1247.8,
      weight: 12.1,
      target: 10.0,
      drift: 2.1,
      dayChange: -0.8,
      recommendation: 'Sell'
    },
    {
      id: 'ada-1',
      asset: 'Cardano',
      symbol: 'ADA',
      type: 'cryptocurrency',
      value: 213150,
      quantity: 532875,
      weight: 8.7,
      target: 8.0,
      drift: 0.7,
      dayChange: 1.5,
      recommendation: 'Hold'
    },
    {
      id: 'sol-1',
      asset: 'Solana',
      symbol: 'SOL',
      type: 'cryptocurrency',
      value: 127400,
      quantity: 1456.8,
      weight: 5.2,
      target: 7.0,
      drift: -1.8,
      dayChange: 3.2,
      recommendation: 'Buy'
    }
  ];

  // Mock timeline data
  const timelineData = [
    { date: '2024-04-15', BTC: 45.2, ETH: 25.8, BNB: 10.5, ADA: 8.2, SOL: 6.8, DOT: 2.5, Others: 1.0 },
    { date: '2024-05-01', BTC: 43.8, ETH: 27.1, BNB: 11.2, ADA: 8.5, SOL: 6.2, DOT: 2.3, Others: 0.9 },
    { date: '2024-05-15', BTC: 41.5, ETH: 28.9, BNB: 12.1, ADA: 8.8, SOL: 5.9, DOT: 2.1, Others: 0.7 },
    { date: '2024-06-01', BTC: 42.1, ETH: 28.5, BNB: 11.8, ADA: 8.6, SOL: 5.5, DOT: 2.8, Others: 0.7 },
    { date: '2024-06-15', BTC: 44.2, ETH: 27.3, BNB: 11.5, ADA: 8.4, SOL: 5.1, DOT: 2.9, Others: 0.6 },
    { date: '2024-07-01', BTC: 43.1, ETH: 28.8, BNB: 12.0, ADA: 8.7, SOL: 4.8, DOT: 2.1, Others: 0.5 },
    { date: '2024-07-15', BTC: 42.5, ETH: 28.3, BNB: 12.1, ADA: 8.7, SOL: 5.2, DOT: 2.1, Others: 1.1 }
  ];

  const benchmarkOptions = [
    { value: 'BTC', label: 'Bitcoin Index' },
    { value: 'ETH', label: 'Ethereum Index' },
    { value: 'CRYPTO', label: 'Crypto Market Index' },
    { value: 'SP500', label: 'S&P 500' },
    { value: 'NASDAQ', label: 'NASDAQ Composite' }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [selectedPortfolio]);

  const handlePortfolioChange = (portfolioId) => {
    setIsLoading(true);
    setSelectedPortfolio(portfolioId);
  };

  const handleRebalance = (holdingIds) => {
    console.log('Rebalancing holdings:', holdingIds);
    // Implement rebalancing logic
  };

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card rounded-lg p-6 border border-border">
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-lg p-6 border border-border">
          <div className="animate-pulse">
            <div className="h-6 bg-muted rounded w-1/4 mb-6"></div>
            <div className="h-80 bg-muted rounded"></div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="animate-pulse">
            <div className="h-6 bg-muted rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-80 pt-16">
        <div className="p-6">
          <Breadcrumb />
          
          {/* Top Navigation */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div className="flex-1">
              <PortfolioSelector
                selectedPortfolio={selectedPortfolio}
                onPortfolioChange={handlePortfolioChange}
                portfolios={portfolios}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
                <span className="text-sm text-foreground">Rebalancing Alerts:</span>
                <Button
                  variant={rebalancingAlerts ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRebalancingAlerts(!rebalancingAlerts)}
                >
                  {rebalancingAlerts ? 'On' : 'Off'}
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="BarChart3" size={16} className="text-primary" />
                <span className="text-sm text-foreground">Benchmark:</span>
                <div className="w-40">
                  <Select
                    options={benchmarkOptions}
                    value={benchmarkComparison}
                    onChange={setBenchmarkComparison}
                  />
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="space-y-8">
              {/* Metrics Row */}
              <MetricsRow portfolioData={portfolioData} />

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Allocation Chart */}
                <div className="lg:col-span-2">
                  <AllocationChart
                    allocationData={allocationData}
                    showTargetOverlay={showTargetOverlay}
                    onToggleTarget={() => setShowTargetOverlay(!showTargetOverlay)}
                  />
                </div>

                {/* Risk Metrics Panel */}
                <div>
                  <RiskMetricsPanel riskData={riskData} />
                </div>
              </div>

              {/* Allocation Timeline */}
              <AllocationTimeline timelineData={timelineData} />

              {/* Holdings Table */}
              <HoldingsTable
                holdings={holdings}
                onRebalance={handleRebalance}
              />
            </div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation Spacer */}
      <div className="lg:hidden h-20"></div>
    </div>
  );
};

export default PortfolioManagementDashboard;