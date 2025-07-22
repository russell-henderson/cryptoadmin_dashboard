import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ResearchControls from './components/ResearchControls';
import InsightCards from './components/InsightCards';
import AnalysisArea from './components/AnalysisArea';
import ResearchSidebar from './components/ResearchSidebar';
import MarketDataTable from './components/MarketDataTable';

const MarketResearchDashboard = () => {
  const [timeframe, setTimeframe] = useState('7d');
  const [category, setCategory] = useState('all');
  const [activeSources, setActiveSources] = useState(['social', 'news', 'technical']);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    // Trigger data refresh based on timeframe
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    // Filter data based on category
  };

  const handleSourceToggle = (sources) => {
    setActiveSources(sources);
    // Update sentiment sources
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        <main className="lg:ml-80 pt-16">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading market research data...</p>
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
      
      <main className="lg:ml-80 pt-16 pb-20 lg:pb-8">
        <div className="px-6 py-8">
          {/* Breadcrumb */}
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Market Research Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                  Comprehensive market intelligence and sentiment analysis for cryptocurrency research
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>Live Data</span>
                </div>
              </div>
            </div>
          </div>

          {/* Research Controls */}
          <div className="mb-8">
            <ResearchControls
              onTimeframeChange={handleTimeframeChange}
              onCategoryChange={handleCategoryChange}
              onSourceToggle={handleSourceToggle}
            />
          </div>

          {/* Insight Cards */}
          <div className="mb-8">
            <InsightCards />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Analysis Area - Takes 2/3 of the width on xl screens */}
            <div className="xl:col-span-2">
              <AnalysisArea />
            </div>
            
            {/* Research Sidebar - Takes 1/3 of the width on xl screens */}
            <div className="xl:col-span-1">
              <ResearchSidebar />
            </div>
          </div>

          {/* Market Data Table */}
          <div className="mb-8">
            <MarketDataTable />
          </div>

          {/* Footer Stats */}
          <div className="bg-card border border-border rounded-lg p-6 crypto-elevation-1">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">2,847</div>
                <div className="text-sm text-muted-foreground">Total Data Points</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">98.7%</div>
                <div className="text-sm text-muted-foreground">Data Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">15</div>
                <div className="text-sm text-muted-foreground">Active Sources</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {new Date().toLocaleDateString()}
                </div>
                <div className="text-sm text-muted-foreground">Last Updated</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarketResearchDashboard;