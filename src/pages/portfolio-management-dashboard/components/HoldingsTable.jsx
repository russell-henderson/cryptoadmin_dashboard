import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const HoldingsTable = ({ holdings, onRebalance }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'value', direction: 'desc' });
  const [filterBy, setFilterBy] = useState('all');
  const [selectedHoldings, setSelectedHoldings] = useState([]);

  const filterOptions = [
    { value: 'all', label: 'All Assets' },
    { value: 'crypto', label: 'Cryptocurrencies' },
    { value: 'overweight', label: 'Overweight' },
    { value: 'underweight', label: 'Underweight' },
    { value: 'rebalance', label: 'Needs Rebalancing' }
  ];

  const filteredHoldings = holdings.filter(holding => {
    const matchesSearch = holding.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         holding.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'crypto' && holding.type === 'cryptocurrency') ||
                         (filterBy === 'overweight' && holding.drift > 2) ||
                         (filterBy === 'underweight' && holding.drift < -2) ||
                         (filterBy === 'rebalance' && Math.abs(holding.drift) > 2);
    
    return matchesSearch && matchesFilter;
  });

  const sortedHoldings = [...filteredHoldings].sort((a, b) => {
    if (sortConfig.direction === 'asc') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'desc' ? 'asc' : 'desc'
    });
  };

  const handleSelectHolding = (holdingId) => {
    setSelectedHoldings(prev => 
      prev.includes(holdingId) 
        ? prev.filter(id => id !== holdingId)
        : [...prev, holdingId]
    );
  };

  const handleSelectAll = () => {
    if (selectedHoldings.length === sortedHoldings.length) {
      setSelectedHoldings([]);
    } else {
      setSelectedHoldings(sortedHoldings.map(h => h.id));
    }
  };

  const getDriftColor = (drift) => {
    if (Math.abs(drift) <= 1) return 'text-success';
    if (Math.abs(drift) <= 3) return 'text-warning';
    return 'text-error';
  };

  const getDriftBgColor = (drift) => {
    if (Math.abs(drift) <= 1) return 'bg-success/10';
    if (Math.abs(drift) <= 3) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'Buy': return 'text-success bg-success/10';
      case 'Sell': return 'text-error bg-error/10';
      case 'Hold': return 'text-muted-foreground bg-muted/10';
      default: return 'text-foreground bg-muted/10';
    }
  };

  const SortButton = ({ column, children }) => (
    <Button
      variant="ghost"
      onClick={() => handleSort(column)}
      className="p-0 h-auto font-medium text-left justify-start hover:bg-transparent"
    >
      <span>{children}</span>
      {sortConfig.key === column && (
        <Icon 
          name={sortConfig.direction === 'asc' ? "ArrowUp" : "ArrowDown"} 
          size={14} 
          className="ml-1" 
        />
      )}
    </Button>
  );

  return (
    <div className="bg-card rounded-lg border border-border crypto-elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Table" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Holdings Details</h3>
          <span className="text-sm text-muted-foreground">({sortedHoldings.length} assets)</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="w-64">
            <Input
              type="search"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-48">
            <Select
              options={filterOptions}
              value={filterBy}
              onChange={setFilterBy}
              placeholder="Filter by..."
            />
          </div>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            disabled={selectedHoldings.length === 0}
          >
            Export Selected
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">
                <input
                  type="checkbox"
                  checked={selectedHoldings.length === sortedHoldings.length && sortedHoldings.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left py-3 px-4">
                <SortButton column="asset">Asset</SortButton>
              </th>
              <th className="text-left py-3 px-4">
                <SortButton column="value">Current Value</SortButton>
              </th>
              <th className="text-left py-3 px-4">
                <SortButton column="weight">Weight</SortButton>
              </th>
              <th className="text-left py-3 px-4">
                <SortButton column="target">Target</SortButton>
              </th>
              <th className="text-left py-3 px-4">
                <SortButton column="drift">Drift</SortButton>
              </th>
              <th className="text-left py-3 px-4">
                <SortButton column="dayChange">24h Change</SortButton>
              </th>
              <th className="text-left py-3 px-4">Recommendation</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedHoldings.map((holding) => (
              <tr key={holding.id} className="border-b border-border/50 hover:bg-muted/30 crypto-transition">
                <td className="py-4 px-4">
                  <input
                    type="checkbox"
                    checked={selectedHoldings.includes(holding.id)}
                    onChange={() => handleSelectHolding(holding.id)}
                    className="rounded border-border"
                  />
                </td>
                
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{holding.symbol.slice(0, 2)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{holding.asset}</div>
                      <div className="text-sm text-muted-foreground">{holding.symbol}</div>
                    </div>
                  </div>
                </td>
                
                <td className="py-4 px-4">
                  <div>
                    <div className="font-medium text-foreground">
                      {holding.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {holding.quantity.toLocaleString()} {holding.symbol}
                    </div>
                  </div>
                </td>
                
                <td className="py-4 px-4">
                  <div className="font-medium text-foreground">{holding.weight.toFixed(2)}%</div>
                </td>
                
                <td className="py-4 px-4">
                  <div className="font-medium text-foreground">{holding.target.toFixed(2)}%</div>
                </td>
                
                <td className="py-4 px-4">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getDriftColor(holding.drift)} ${getDriftBgColor(holding.drift)}`}>
                    {holding.drift > 0 ? '+' : ''}{holding.drift.toFixed(2)}%
                  </div>
                </td>
                
                <td className="py-4 px-4">
                  <div className={`flex items-center space-x-1 ${holding.dayChange >= 0 ? 'text-success' : 'text-error'}`}>
                    <Icon name={holding.dayChange >= 0 ? "ArrowUp" : "ArrowDown"} size={14} />
                    <span className="font-medium">{Math.abs(holding.dayChange).toFixed(2)}%</span>
                  </div>
                </td>
                
                <td className="py-4 px-4">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getRecommendationColor(holding.recommendation)}`}>
                    {holding.recommendation}
                  </div>
                </td>
                
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="TrendingUp"
                      onClick={() => onRebalance(holding.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreHorizontal"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedHoldings.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No holdings found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {selectedHoldings.length > 0 && (
        <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">
              {selectedHoldings.length} asset{selectedHoldings.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Target"
                iconPosition="left"
                onClick={() => onRebalance(selectedHoldings)}
              >
                Rebalance Selected
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedHoldings([])}
              >
                Clear Selection
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;