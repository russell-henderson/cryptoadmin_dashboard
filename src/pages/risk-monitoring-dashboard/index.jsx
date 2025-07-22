import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import RiskMetricsCard from './components/RiskMetricsCard';
import CriticalAlertsPanel from './components/CriticalAlertsPanel';
import RiskMetricsChart from './components/RiskMetricsChart';
import RiskDistributionPanel from './components/RiskDistributionPanel';
import RiskBreakdownTable from './components/RiskBreakdownTable';
import RiskControlPanel from './components/RiskControlPanel';

const RiskMonitoringDashboard = () => {
  const [riskTolerance, setRiskTolerance] = useState('moderate');
  const [alertSeverity, setAlertSeverity] = useState('high');
  const [compliancePeriod, setCompliancePeriod] = useState('daily');
  const [selectedMetrics, setSelectedMetrics] = useState(['var', 'drawdown', 'leverage', 'volatility']);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for risk metrics
  const riskMetrics = [
    {
      title: "Portfolio VaR",
      value: "2.45",
      unit: "%",
      threshold: "3.00",
      trend: 0.8,
      status: "normal",
      icon: "TrendingDown",
      description: "95% confidence, 1-day horizon"
    },
    {
      title: "Max Drawdown",
      value: "8.2",
      unit: "%",
      threshold: "10.0",
      trend: -1.2,
      status: "warning",
      icon: "ArrowDown",
      description: "Peak-to-trough decline"
    },
    {
      title: "Leverage Ratio",
      value: "1.85",
      unit: "x",
      threshold: "2.00",
      trend: 2.1,
      status: "critical",
      icon: "BarChart3",
      description: "Total exposure to equity"
    },
    {
      title: "Compliance Score",
      value: "94",
      unit: "%",
      threshold: "90",
      trend: 0.5,
      status: "normal",
      icon: "Shield",
      description: "Regulatory compliance rating"
    }
  ];

  // Mock data for critical alerts
  const criticalAlerts = [
    {
      id: 1,
      title: "Leverage Threshold Breach",
      description: "BTC position exceeds maximum leverage limit of 2.0x",
      severity: "critical",
      timestamp: "2 minutes ago",
      source: "Risk Engine"
    },
    {
      id: 2,
      title: "Correlation Risk Alert",
      description: "High correlation detected between ETH and BTC positions (0.89)",
      severity: "high",
      timestamp: "15 minutes ago",
      source: "Portfolio Monitor"
    },
    {
      id: 3,
      title: "Volatility Spike",
      description: "DOGE volatility increased by 45% in the last hour",
      severity: "medium",
      timestamp: "32 minutes ago",
      source: "Market Data"
    }
  ];

  // Mock data for risk metrics chart
  const chartData = [
    { time: '00:00', var: 2.1, drawdown: 7.5, leverage: 1.6, volatility: 18.2 },
    { time: '04:00', var: 2.3, drawdown: 7.8, leverage: 1.7, volatility: 19.1 },
    { time: '08:00', var: 2.5, drawdown: 8.1, leverage: 1.8, volatility: 20.3 },
    { time: '12:00', var: 2.4, drawdown: 8.2, leverage: 1.85, volatility: 21.5 },
    { time: '16:00', var: 2.6, drawdown: 8.0, leverage: 1.9, volatility: 22.1 },
    { time: '20:00', var: 2.45, drawdown: 7.9, leverage: 1.85, volatility: 20.8 },
    { time: '24:00', var: 2.45, drawdown: 8.2, leverage: 1.85, volatility: 21.2 }
  ];

  const thresholds = {
    var: 3.0,
    drawdown: 10.0,
    leverage: 2.0,
    volatility: 25.0
  };

  // Mock data for risk distribution
  const distributionData = [
    { range: '0-5%', frequency: 12 },
    { range: '5-10%', frequency: 28 },
    { range: '10-15%', frequency: 35 },
    { range: '15-20%', frequency: 18 },
    { range: '20-25%', frequency: 8 },
    { range: '25%+', frequency: 3 }
  ];

  // Mock data for top risk contributors
  const topContributors = [
    {
      id: 1,
      asset: "BTC-USD",
      position: 2450000,
      impact: 18.5,
      beta: 1.2,
      trend: "up"
    },
    {
      id: 2,
      asset: "ETH-USD",
      position: 1850000,
      impact: 14.2,
      beta: 1.4,
      trend: "up"
    },
    {
      id: 3,
      asset: "ADA-USD",
      position: 890000,
      impact: 8.7,
      beta: 0.9,
      trend: "down"
    },
    {
      id: 4,
      asset: "DOT-USD",
      position: 650000,
      impact: 6.3,
      beta: 1.1,
      trend: "up"
    },
    {
      id: 5,
      asset: "LINK-USD",
      position: 420000,
      impact: 4.8,
      beta: 0.8,
      trend: "down"
    }
  ];

  // Mock data for risk breakdown table
  const riskBreakdownData = [
    {
      id: 1,
      asset: "BTC-USD",
      type: "Spot",
      position: 2450000,
      beta: 1.2,
      volatility: 24.5,
      correlation: 0.85,
      stressTest: -15.2,
      status: "warning"
    },
    {
      id: 2,
      asset: "ETH-USD",
      type: "Futures",
      position: 1850000,
      beta: 1.4,
      volatility: 28.1,
      correlation: 0.89,
      stressTest: -18.7,
      status: "critical"
    },
    {
      id: 3,
      asset: "ADA-USD",
      type: "Spot",
      position: 890000,
      beta: 0.9,
      volatility: 32.3,
      correlation: 0.72,
      stressTest: -12.4,
      status: "normal"
    },
    {
      id: 4,
      asset: "DOT-USD",
      type: "Options",
      position: 650000,
      beta: 1.1,
      volatility: 35.8,
      correlation: 0.68,
      stressTest: -22.1,
      status: "critical"
    },
    {
      id: 5,
      asset: "LINK-USD",
      type: "Spot",
      position: 420000,
      beta: 0.8,
      volatility: 29.4,
      correlation: 0.65,
      stressTest: -9.8,
      status: "normal"
    },
    {
      id: 6,
      asset: "UNI-USD",
      type: "Futures",
      position: 380000,
      beta: 1.3,
      volatility: 41.2,
      correlation: 0.71,
      stressTest: -25.6,
      status: "critical"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleMetricToggle = (metric) => {
    setSelectedMetrics(prev =>
      prev.includes(metric)
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  const handleAlertDismiss = (alertId) => {
    console.log('Dismissing alert:', alertId);
  };

  const handleAlertDetails = (alertId) => {
    console.log('Viewing alert details:', alertId);
  };

  const handleSort = (field, direction) => {
    console.log('Sorting by:', field, direction);
  };

  const handleFilter = (filterText) => {
    console.log('Filtering by:', filterText);
  };

  const handleExport = () => {
    console.log('Exporting selected data');
  };

  const handleEmergencyStop = () => {
    console.log('Emergency stop activated');
  };

  const handleExportReport = () => {
    console.log('Exporting risk report');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        <main className="lg:ml-80 pt-16">
          <div className="p-6">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading risk monitoring data...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-80 pt-16 pb-20 lg:pb-6">
        <div className="p-6 space-y-6">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Risk Monitoring Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Real-time risk assessment and compliance oversight
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Last updated</p>
              <p className="text-sm font-medium text-foreground">
                {new Date().toLocaleString()}
              </p>
            </div>
          </div>

          {/* Critical Alerts Banner */}
          <CriticalAlertsPanel
            alerts={criticalAlerts}
            onDismiss={handleAlertDismiss}
            onViewDetails={handleAlertDetails}
          />

          {/* Risk Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {riskMetrics.map((metric, index) => (
              <RiskMetricsCard
                key={index}
                title={metric.title}
                value={metric.value}
                unit={metric.unit}
                threshold={metric.threshold}
                trend={metric.trend}
                status={metric.status}
                icon={metric.icon}
                description={metric.description}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Risk Metrics Chart */}
            <div className="xl:col-span-8">
              <RiskMetricsChart
                data={chartData}
                thresholds={thresholds}
                selectedMetrics={selectedMetrics}
                onMetricToggle={handleMetricToggle}
              />
            </div>

            {/* Right Panel */}
            <div className="xl:col-span-4 space-y-6">
              <RiskDistributionPanel
                distributionData={distributionData}
                topContributors={topContributors}
              />
              
              <RiskControlPanel
                riskTolerance={riskTolerance}
                onRiskToleranceChange={setRiskTolerance}
                alertSeverity={alertSeverity}
                onAlertSeverityChange={setAlertSeverity}
                compliancePeriod={compliancePeriod}
                onCompliancePeriodChange={setCompliancePeriod}
                onEmergencyStop={handleEmergencyStop}
                onExportReport={handleExportReport}
              />
            </div>
          </div>

          {/* Risk Breakdown Table */}
          <RiskBreakdownTable
            data={riskBreakdownData}
            onSort={handleSort}
            onFilter={handleFilter}
            onExport={handleExport}
          />
        </div>
      </main>
    </div>
  );
};

export default RiskMonitoringDashboard;