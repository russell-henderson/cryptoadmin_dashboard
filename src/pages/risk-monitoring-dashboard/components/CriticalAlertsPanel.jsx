import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CriticalAlertsPanel = ({ alerts, onDismiss, onViewDetails }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-error/10 border-error text-error';
      case 'high':
        return 'bg-warning/10 border-warning text-warning';
      case 'medium':
        return 'bg-primary/10 border-primary text-primary';
      default:
        return 'bg-muted/10 border-muted text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return 'AlertTriangle';
      case 'high':
        return 'AlertCircle';
      case 'medium':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 text-center">
        <Icon name="Shield" size={48} className="text-success mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">All Systems Normal</h3>
        <p className="text-muted-foreground">No critical alerts at this time</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border crypto-elevation-1">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} className="text-error" />
            <h3 className="text-lg font-semibold text-foreground">Critical Alerts</h3>
            <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full">
              {alerts.length}
            </span>
          </div>
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={16} className="mr-2" />
            Configure
          </Button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted/50 crypto-transition">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                <Icon name={getSeverityIcon(alert.severity)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground mb-1">{alert.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{alert.timestamp}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Target" size={12} />
                        <span>{alert.source}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(alert.id)}
                    >
                      Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDismiss(alert.id)}
                    >
                      <Icon name="X" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
          <Button variant="outline" size="sm">
            View All Alerts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CriticalAlertsPanel;