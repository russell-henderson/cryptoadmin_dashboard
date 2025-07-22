import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RiskBreakdownTable = ({ data, onSort, onFilter, onExport }) => {
  const [sortField, setSortField] = useState('asset');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterText, setFilterText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
    onSort(field, direction);
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map(item => item.id));
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return 'text-error bg-error/10';
      case 'warning':
        return 'text-warning bg-warning/10';
      case 'normal':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const getThresholdStatus = (value, threshold) => {
    if (value > threshold * 1.2) return 'critical';
    if (value > threshold) return 'warning';
    return 'normal';
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    return (
      <Icon 
        name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={14} 
        className="text-primary" 
      />
    );
  };

  const filteredData = data.filter(item =>
    item.asset.toLowerCase().includes(filterText.toLowerCase()) ||
    item.type.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="bg-card rounded-lg border border-border crypto-elevation-1">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Table" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Risk Breakdown</h3>
            <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
              {filteredData.length} positions
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              disabled={selectedRows.length === 0}
            >
              <Icon name="Download" size={16} className="mr-2" />
              Export ({selectedRows.length})
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search assets or types..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {selectedRows.length} selected
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.length === data.length && data.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('asset')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary crypto-transition"
                >
                  <span>Asset</span>
                  <SortIcon field="asset" />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('type')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary crypto-transition"
                >
                  <span>Type</span>
                  <SortIcon field="type" />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('position')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary crypto-transition"
                >
                  <span>Position</span>
                  <SortIcon field="position" />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('beta')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary crypto-transition"
                >
                  <span>Beta</span>
                  <SortIcon field="beta" />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('volatility')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary crypto-transition"
                >
                  <span>Volatility</span>
                  <SortIcon field="volatility" />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('correlation')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary crypto-transition"
                >
                  <span>Correlation</span>
                  <SortIcon field="correlation" />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('stressTest')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary crypto-transition"
                >
                  <span>Stress Test</span>
                  <SortIcon field="stressTest" />
                </button>
              </th>
              <th className="p-3 text-left">
                <span className="text-sm font-medium text-foreground">Status</span>
              </th>
              <th className="p-3 text-left">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id} className={`border-t border-border hover:bg-muted/30 crypto-transition ${index % 2 === 0 ? 'bg-muted/10' : ''}`}>
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.id)}
                    onChange={() => handleSelectRow(item.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {item.asset.substring(0, 2)}
                      </span>
                    </div>
                    <span className="font-medium text-foreground">{item.asset}</span>
                  </div>
                </td>
                <td className="p-3">
                  <span className="text-sm text-muted-foreground">{item.type}</span>
                </td>
                <td className="p-3">
                  <span className="font-mono text-sm text-foreground">
                    ${item.position.toLocaleString()}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`font-mono text-sm ${
                    Math.abs(item.beta) > 1.5 ? 'text-error' : 
                    Math.abs(item.beta) > 1.2 ? 'text-warning' : 'text-foreground'
                  }`}>
                    {item.beta.toFixed(2)}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`font-mono text-sm ${
                    item.volatility > 30 ? 'text-error' : 
                    item.volatility > 20 ? 'text-warning' : 'text-foreground'
                  }`}>
                    {item.volatility.toFixed(1)}%
                  </span>
                </td>
                <td className="p-3">
                  <span className={`font-mono text-sm ${
                    Math.abs(item.correlation) > 0.8 ? 'text-warning' : 'text-foreground'
                  }`}>
                    {item.correlation.toFixed(2)}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`font-mono text-sm ${
                    item.stressTest < -20 ? 'text-error' : 
                    item.stressTest < -10 ? 'text-warning' : 'text-foreground'
                  }`}>
                    {item.stressTest.toFixed(1)}%
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm">
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Settings" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default RiskBreakdownTable;