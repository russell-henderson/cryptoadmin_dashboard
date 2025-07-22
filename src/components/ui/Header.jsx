import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-success';
      case 'reconnecting':
        return 'text-warning';
      case 'disconnected':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Live';
      case 'reconnecting':
        return 'Reconnecting';
      case 'disconnected':
        return 'Offline';
      default:
        return 'Unknown';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border crypto-elevation-1">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="TrendingUp" size={20} color="white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-foreground">CryptoAdmin</h1>
            <span className="text-xs text-muted-foreground">Trading Dashboard</span>
          </div>
        </div>

        {/* Center Section - Quick Stats */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Icon name="Bitcoin" size={16} color="var(--color-warning)" />
            <span className="text-sm font-mono text-foreground">$43,250.00</span>
            <span className="text-xs text-success">+2.4%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Ethereum" size={16} color="var(--color-primary)" />
            <span className="text-sm font-mono text-foreground">$2,680.50</span>
            <span className="text-xs text-error">-1.2%</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Connection Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor().replace('text-', 'bg-')}`}></div>
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full flex items-center justify-center">
              <span className="text-xs text-accent-foreground font-bold">3</span>
            </span>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Icon name="Settings" size={20} />
          </Button>

          {/* User Profile */}
          <div className="flex items-center space-x-2 pl-2 border-l border-border">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">John Trader</p>
              <p className="text-xs text-muted-foreground">Portfolio Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;