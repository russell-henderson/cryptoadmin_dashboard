import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RiskMetricsPanel = ({ riskData }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');

  const timeframes = ['1W', '1M', '3M', '6M', '1Y'];

  const RiskMetricCard = ({ title, value, change, status, icon, description }) => (
    <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon name={icon} size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        <div className={`w-2 h-2 rounded-full ${
          status === 'low' ? 'bg-success' : 
          status === 'medium' ? 'bg-warning' : 'bg-error'
        }`}></div>
      </div>
      
      <div className="space-y-1">
        <div className="text-lg font-bold text-foreground">{value}</div>
        {change && (
          <div className={`text-xs flex items-center space-x-1 ${
            change > 0 ? 'text-error' : 'text-success'
          }`}>
            <Icon name={change > 0 ? "ArrowUp" : "ArrowDown"} size={12} />
            <span>{Math.abs(change).toFixed(2)}%</span>
          </div>
        )}
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );

  const CorrelationMatrix = ({ correlations }) => (
    <div className="space-y-3">
      <h4 className="font-medium text-foreground">Correlation Matrix</h4>
      <div className="grid grid-cols-4 gap-1 text-xs">
        {correlations.map((row, i) => 
          row.map((value, j) => (
            <div
              key={`${i}-${j}`}
              className={`p-2 rounded text-center font-medium ${
                value > 0.7 ? 'bg-error text-error-foreground' :
                value > 0.3 ? 'bg-warning text-warning-foreground' :
                value > -0.3 ? 'bg-muted text-muted-foreground' :
                value > -0.7 ? 'bg-warning text-warning-foreground': 'bg-success text-success-foreground'
              }`}
            >
              {value.toFixed(2)}
            </div>
          ))
        )}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>BTC</span>
        <span>ETH</span>
        <span>BNB</span>
        <span>ADA</span>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border crypto-elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Risk Metrics</h3>
        </div>
        
        <div className="flex items-center space-x-1">
          {timeframes.map((timeframe) => (
            <Button
              key={timeframe}
              variant={selectedTimeframe === timeframe ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTimeframe(timeframe)}
              className="px-3 py-1 text-xs"
            >
              {timeframe}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {/* Risk Metrics Cards */}
        <div className="space-y-4">
          <RiskMetricCard
            title="Value at Risk (95%)"
            value={`$${riskData.var95.toLocaleString()}`}
            change={riskData.varChange}
            status={riskData.var95 > 50000 ? 'high' : riskData.var95 > 25000 ? 'medium' : 'low'}
            icon="AlertTriangle"
            description="Maximum expected loss over 1 day"
          />
          
          <RiskMetricCard
            title="Portfolio Beta"
            value={riskData.beta.toFixed(3)}
            change={riskData.betaChange}
            status={Math.abs(riskData.beta - 1) > 0.5 ? 'high' : 'medium'}
            icon="Activity"
            description="Sensitivity to market movements"
          />
          
          <RiskMetricCard
            title="Volatility (30d)"
            value={`${riskData.volatility.toFixed(2)}%`}
            change={riskData.volatilityChange}
            status={riskData.volatility > 40 ? 'high' : riskData.volatility > 25 ? 'medium' : 'low'}
            icon="BarChart3"
            description="Annualized price volatility"
          />
          
          <RiskMetricCard
            title="Max Drawdown"
            value={`${riskData.maxDrawdown.toFixed(2)}%`}
            change={null}
            status={Math.abs(riskData.maxDrawdown) > 30 ? 'high' : Math.abs(riskData.maxDrawdown) > 15 ? 'medium' : 'low'}
            icon="TrendingDown"
            description="Largest peak-to-trough decline"
          />
        </div>

        {/* Correlation Matrix */}
        <CorrelationMatrix correlations={riskData.correlationMatrix} />

        {/* Concentration Risk */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Concentration Risk</h4>
          <div className="space-y-2">
            {riskData.concentrationRisk.map((risk, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Target" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{risk.asset}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{risk.weight.toFixed(1)}%</div>
                  <div className={`text-xs ${
                    risk.riskLevel === 'high' ? 'text-error' : 
                    risk.riskLevel === 'medium' ? 'text-warning' : 'text-success'
                  }`}>
                    {risk.riskLevel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Score */}
        <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Overall Risk Score</span>
            <div className={`px-2 py-1 rounded text-xs font-medium ${
              riskData.overallRiskScore > 7 ? 'bg-error text-error-foreground' :
              riskData.overallRiskScore > 4 ? 'bg-warning text-warning-foreground': 'bg-success text-success-foreground'
            }`}>
              {riskData.overallRiskScore}/10
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                riskData.overallRiskScore > 7 ? 'bg-error' :
                riskData.overallRiskScore > 4 ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${(riskData.overallRiskScore / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMetricsPanel;