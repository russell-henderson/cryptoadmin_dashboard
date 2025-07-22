import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ResearchControls = ({ onTimeframeChange, onCategoryChange, onSourceToggle }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeSources, setActiveSources] = useState(['social', 'news', 'technical']);

  const timeframeOptions = [
    { value: '1h', label: '1 Hour' },
    { value: '4h', label: '4 Hours' },
    { value: '1d', label: '1 Day' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Assets' },
    { value: 'btc', label: 'Bitcoin' },
    { value: 'eth', label: 'Ethereum' },
    { value: 'altcoins', label: 'Altcoins' },
    { value: 'defi', label: 'DeFi Tokens' },
    { value: 'nft', label: 'NFT Tokens' },
    { value: 'meme', label: 'Meme Coins' }
  ];

  const sourceTypes = [
    { id: 'social', label: 'Social Media', icon: 'MessageCircle' },
    { id: 'news', label: 'News', icon: 'Newspaper' },
    { id: 'technical', label: 'Technical', icon: 'TrendingUp' }
  ];

  const handleTimeframeChange = (value) => {
    setSelectedTimeframe(value);
    onTimeframeChange?.(value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onCategoryChange?.(value);
  };

  const toggleSource = (sourceId) => {
    const newSources = activeSources.includes(sourceId)
      ? activeSources.filter(s => s !== sourceId)
      : [...activeSources, sourceId];
    setActiveSources(newSources);
    onSourceToggle?.(newSources);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 crypto-elevation-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Left Section - Selectors */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="min-w-[140px]">
            <Select
              label="Timeframe"
              options={timeframeOptions}
              value={selectedTimeframe}
              onChange={handleTimeframeChange}
              className="w-full"
            />
          </div>
          
          <div className="min-w-[160px]">
            <Select
              label="Asset Category"
              options={categoryOptions}
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full"
            />
          </div>
        </div>

        {/* Center Section - Source Toggles */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-foreground mb-2">Sentiment Sources</label>
          <div className="flex flex-wrap gap-2">
            {sourceTypes.map((source) => (
              <Button
                key={source.id}
                variant={activeSources.includes(source.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSource(source.id)}
                iconName={source.icon}
                iconPosition="left"
                iconSize={16}
                className="crypto-transition"
              >
                {source.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={16}
          >
            Refresh
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            iconName="Settings"
            iconSize={16}
          />
          
          <Button
            variant="ghost"
            size="icon"
            iconName="Download"
            iconSize={16}
          />
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">847</div>
            <div className="text-sm text-muted-foreground">Active Signals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">+12.4%</div>
            <div className="text-sm text-muted-foreground">Sentiment Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">0.73</div>
            <div className="text-sm text-muted-foreground">Correlation Index</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">High</div>
            <div className="text-sm text-muted-foreground">Signal Confidence</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchControls;