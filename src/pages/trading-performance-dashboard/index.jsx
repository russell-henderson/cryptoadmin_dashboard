import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import DashboardHeader from './components/DashboardHeader';
import PerformanceKPIStrip from './components/PerformanceKPIStrip';
import PerformanceChart from './components/PerformanceChart';
import TradeDistributionChart from './components/TradeDistributionChart';
import RecentTransactionsTable from './components/RecentTransactionsTable';
import PerformanceAttributionTable from './components/PerformanceAttributionTable';

const TradingPerformanceDashboard = () => {
  const [dateRange, setDateRange] = useState('7D');
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [selectedStrategy, setSelectedStrategy] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const handleAccountChange = (account) => {
    setSelectedAccount(account);
  };

  const handleStrategyToggle = (strategy) => {
    setSelectedStrategy(strategy);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        <main className="lg:pl-80 pt-16">
          <div className="p-6">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading trading performance data...</p>
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
      
      <main className="lg:pl-80 pt-16 pb-20 lg:pb-6">
        <div className="p-6">
          <Breadcrumb />
          
          <DashboardHeader
            onDateRangeChange={handleDateRangeChange}
            onAccountChange={handleAccountChange}
            onStrategyToggle={handleStrategyToggle}
          />

          <PerformanceKPIStrip
            dateRange={dateRange}
            selectedAccount={selectedAccount}
            selectedStrategy={selectedStrategy}
          />

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-8">
            <div className="xl:col-span-8">
              <PerformanceChart dateRange={dateRange} />
            </div>
            
            <div className="xl:col-span-4 space-y-6">
              <TradeDistributionChart />
              <div className="lg:hidden xl:block">
                <RecentTransactionsTable />
              </div>
            </div>
          </div>

          <div className="xl:hidden mb-8">
            <RecentTransactionsTable />
          </div>

          <PerformanceAttributionTable />
        </div>
      </main>
    </div>
  );
};

export default TradingPerformanceDashboard;