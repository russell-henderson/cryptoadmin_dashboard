import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const RiskControlPanel = ({ 
  riskTolerance, 
  onRiskToleranceChange, 
  alertSeverity, 
  onAlertSeverityChange,
  compliancePeriod,
  onCompliancePeriodChange,
  onEmergencyStop,
  onExportReport
}) => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  const riskToleranceOptions = [
    { value: 'conservative', label: 'Conservative (Low Risk)' },
    { value: 'moderate', label: 'Moderate (Medium Risk)' },
    { value: 'aggressive', label: 'Aggressive (High Risk)' },
    { value: 'custom', label: 'Custom Settings' }
  ];

  const alertSeverityOptions = [
    { value: 'all', label: 'All Alerts' },
    { value: 'critical', label: 'Critical Only' },
    { value: 'high', label: 'High & Critical' },
    { value: 'medium', label: 'Medium & Above' }
  ];

  const compliancePeriodOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const handleEmergencyStop = () => {
    setIsEmergencyMode(true);
    onEmergencyStop();
    
    // Reset emergency mode after 5 seconds
    setTimeout(() => {
      setIsEmergencyMode(false);
    }, 5000);
  };

  return (
    <div className="bg-card rounded-lg border border-border crypto-elevation-1">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Settings" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Risk Controls</h3>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Risk Tolerance */}
        <div className="space-y-2">
          <Select
            label="Risk Tolerance Level"
            description="Set the overall risk appetite for the portfolio"
            options={riskToleranceOptions}
            value={riskTolerance}
            onChange={onRiskToleranceChange}
          />
        </div>

        {/* Alert Severity Filter */}
        <div className="space-y-2">
          <Select
            label="Alert Severity Filter"
            description="Choose which alert levels to display"
            options={alertSeverityOptions}
            value={alertSeverity}
            onChange={onAlertSeverityChange}
          />
        </div>

        {/* Compliance Period */}
        <div className="space-y-2">
          <Select
            label="Compliance Reporting Period"
            description="Set the frequency for compliance reports"
            options={compliancePeriodOptions}
            value={compliancePeriod}
            onChange={onCompliancePeriodChange}
          />
        </div>

        {/* Quick Actions */}
        <div className="space-y-3 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground">Quick Actions</h4>
          
          <div className="grid grid-cols-1 gap-3">
            {/* Emergency Stop */}
            <Button
              variant={isEmergencyMode ? "destructive" : "outline"}
              onClick={handleEmergencyStop}
              disabled={isEmergencyMode}
              className="justify-start"
            >
              <Icon 
                name={isEmergencyMode ? "StopCircle" : "AlertTriangle"} 
                size={16} 
                className="mr-2" 
              />
              {isEmergencyMode ? "Emergency Mode Active" : "Emergency Stop All Trading"}
            </Button>

            {/* Export Report */}
            <Button
              variant="outline"
              onClick={onExportReport}
              className="justify-start"
            >
              <Icon name="Download" size={16} className="mr-2" />
              Export Risk Report
            </Button>

            {/* Refresh Data */}
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="justify-start"
            >
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Refresh All Data
            </Button>
          </div>
        </div>

        {/* System Status */}
        <div className="space-y-3 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground">System Status</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Risk Engine</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-success">Online</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Data Feed</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-success">Connected</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Compliance Monitor</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span className="text-sm text-warning">Checking</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Update</span>
              <span className="text-sm text-muted-foreground">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        {isEmergencyMode && (
          <div className="p-3 bg-error/10 border border-error rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-error">Emergency Mode Active</h5>
                <p className="text-xs text-error/80 mt-1">
                  All trading has been halted. Contact risk management immediately.
                </p>
                <p className="text-xs text-error/80 mt-1">
                  Emergency Hotline: +1-800-RISK-911
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskControlPanel;