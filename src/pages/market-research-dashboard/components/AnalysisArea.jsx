import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalysisArea = () => {
  const [activeTab, setActiveTab] = useState('correlation');

  const tabs = [
    { id: 'correlation', label: 'Correlation Heatmap', icon: 'GitBranch' },
    { id: 'sentiment', label: 'Sentiment Timeline', icon: 'TrendingUp' },
    { id: 'patterns', label: 'Technical Patterns', icon: 'BarChart3' }
  ];

  // Mock data for correlation heatmap
  const correlationData = [
    { asset: 'BTC', btc: 1.00, eth: 0.73, ada: 0.65, dot: 0.58, sol: 0.71 },
    { asset: 'ETH', btc: 0.73, eth: 1.00, ada: 0.82, dot: 0.76, sol: 0.89 },
    { asset: 'ADA', btc: 0.65, eth: 0.82, ada: 1.00, dot: 0.71, sol: 0.78 },
    { asset: 'DOT', btc: 0.58, eth: 0.76, ada: 0.71, dot: 1.00, sol: 0.69 },
    { asset: 'SOL', btc: 0.71, eth: 0.89, ada: 0.78, dot: 0.69, sol: 1.00 }
  ];

  // Mock data for sentiment timeline
  const sentimentData = [
    { time: '00:00', sentiment: 65, volume: 1200 },
    { time: '04:00', sentiment: 72, volume: 1450 },
    { time: '08:00', sentiment: 68, volume: 1800 },
    { time: '12:00', sentiment: 75, volume: 2100 },
    { time: '16:00', sentiment: 82, volume: 1950 },
    { time: '20:00', sentiment: 78, volume: 1650 }
  ];

  // Mock data for technical patterns
  const patternData = [
    { pattern: 'Bull Flag', confidence: 85, occurrences: 12 },
    { pattern: 'Head & Shoulders', confidence: 72, occurrences: 8 },
    { pattern: 'Triangle', confidence: 91, occurrences: 15 },
    { pattern: 'Double Bottom', confidence: 68, occurrences: 6 },
    { pattern: 'Cup & Handle', confidence: 79, occurrences: 9 }
  ];

  const getCorrelationColor = (value) => {
    if (value >= 0.8) return 'bg-success text-success-foreground';
    if (value >= 0.6) return 'bg-warning text-warning-foreground';
    if (value >= 0.4) return 'bg-primary text-primary-foreground';
    return 'bg-error text-error-foreground';
  };

  const renderCorrelationHeatmap = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Asset Correlation Matrix</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download" iconSize={16}>
            Export
          </Button>
          <Button variant="ghost" size="icon" iconName="RefreshCw" iconSize={16} />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2 text-sm font-medium text-muted-foreground">Asset</th>
              {['BTC', 'ETH', 'ADA', 'DOT', 'SOL'].map(asset => (
                <th key={asset} className="text-center p-2 text-sm font-medium text-muted-foreground">
                  {asset}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {correlationData.map((row) => (
              <tr key={row.asset}>
                <td className="p-2 font-medium text-foreground">{row.asset}</td>
                {Object.entries(row).slice(1).map(([key, value]) => (
                  <td key={key} className="p-2 text-center">
                    <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getCorrelationColor(value)}`}>
                      {value.toFixed(2)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded"></div>
          <span>Strong (0.8+)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-warning rounded"></div>
          <span>Moderate (0.6-0.8)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded"></div>
          <span>Weak (0.4-0.6)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-error rounded"></div>
          <span>Very Weak (&lt;0.4)</span>
        </div>
      </div>
    </div>
  );

  const renderSentimentTimeline = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">24h Sentiment Timeline</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Calendar" iconSize={16}>
            Custom Range
          </Button>
          <Button variant="ghost" size="icon" iconName="RefreshCw" iconSize={16} />
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sentimentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="sentiment" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-success">+12.4%</div>
          <div className="text-sm text-muted-foreground">Avg Sentiment</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-primary">1,650</div>
          <div className="text-sm text-muted-foreground">Mentions/Hour</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-warning">High</div>
          <div className="text-sm text-muted-foreground">Volatility</div>
        </div>
      </div>
    </div>
  );

  const renderTechnicalPatterns = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Technical Pattern Recognition</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Filter" iconSize={16}>
            Filter
          </Button>
          <Button variant="ghost" size="icon" iconName="RefreshCw" iconSize={16} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {patternData.map((pattern, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <div className="font-medium text-foreground">{pattern.pattern}</div>
                <div className="text-sm text-muted-foreground">{pattern.occurrences} occurrences</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-foreground">{pattern.confidence}%</div>
                <div className="text-sm text-muted-foreground">Confidence</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={patternData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="occurrences"
                label={({ pattern, percent }) => `${pattern} ${(percent * 100).toFixed(0)}%`}
              >
                {patternData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 72}, 70%, 50%)`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'correlation':
        return renderCorrelationHeatmap();
      case 'sentiment':
        return renderSentimentTimeline();
      case 'patterns':
        return renderTechnicalPatterns();
      default:
        return renderCorrelationHeatmap();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg crypto-elevation-1">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm crypto-transition ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AnalysisArea;