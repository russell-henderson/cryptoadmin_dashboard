import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PortfolioSelector = ({ selectedPortfolio, onPortfolioChange, portfolios }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const portfolioOptions = portfolios.map(portfolio => ({
    value: portfolio.id,
    label: `${portfolio.name} (${portfolio.totalValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })})`
  }));

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Icon name="Briefcase" size={20} className="text-primary" />
        <span className="text-sm font-medium text-foreground">Portfolio:</span>
      </div>
      
      <div className="min-w-64">
        <Select
          options={portfolioOptions}
          value={selectedPortfolio}
          onChange={onPortfolioChange}
          placeholder="Select portfolio"
          searchable
        />
      </div>

      <Button
        variant="outline"
        size="sm"
        iconName="Plus"
        iconPosition="left"
        onClick={() => setShowCreateModal(true)}
      >
        Create New
      </Button>

      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Icon name="Clock" size={16} />
        <span>Last updated: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default PortfolioSelector;