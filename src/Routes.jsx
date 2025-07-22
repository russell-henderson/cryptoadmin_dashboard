import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import MarketOverviewDashboard from "pages/market-overview-dashboard";
import TradingPerformanceDashboard from "pages/trading-performance-dashboard";
import RiskMonitoringDashboard from "pages/risk-monitoring-dashboard";
import MarketResearchDashboard from "pages/market-research-dashboard";
import PortfolioManagementDashboard from "pages/portfolio-management-dashboard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<MarketOverviewDashboard />} />
        <Route path="/market-overview-dashboard" element={<MarketOverviewDashboard />} />
        <Route path="/trading-performance-dashboard" element={<TradingPerformanceDashboard />} />
        <Route path="/risk-monitoring-dashboard" element={<RiskMonitoringDashboard />} />
        <Route path="/market-research-dashboard" element={<MarketResearchDashboard />} />
        <Route path="/portfolio-management-dashboard" element={<PortfolioManagementDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;