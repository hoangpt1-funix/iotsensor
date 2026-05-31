import React, { useState } from 'react';
import {
  INITIAL_APPLIANCES,
  INITIAL_AUTOMATIONS,
  INITIAL_USAGE_HISTORY,
  INITIAL_CONSUMERS,
  INITIAL_NOTIFICATIONS,
} from './data';
import { Appliance, Automation, SystemNotification } from './types';
import TopAppBar from './components/TopAppBar';
import BottomNavBar from './components/BottomNavBar';
import DashboardTab from './components/DashboardTab';
import UsageTab from './components/UsageTab';
import AutomationsTab from './components/AutomationsTab';
import SettingsTab from './components/SettingsTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [appliances, setAppliances] = useState<Appliance[]>(INITIAL_APPLIANCES);
  const [automations, setAutomations] = useState<Automation[]>(INITIAL_AUTOMATIONS);
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);
  const [consumers, setConsumers] = useState(INITIAL_CONSUMERS);
  
  // Settings & Sandbox State
  const [gridStandard, setGridStandard] = useState<string>('Northern European Grid Standards');
  const [energyMultiplier, setEnergyMultiplier] = useState<number>(1.0);
  const [waterMultiplier, setWaterMultiplier] = useState<number>(1.0);
  const [isTipAutomated, setIsTipAutomated] = useState<boolean>(false);

  const userEmail = 'phan@marioeducation.com';

  // State-wide helper to push notifications
  const addNotification = (
    title: string,
    message: string,
    type: 'alert' | 'success' | 'info'
  ) => {
    const newNotif: SystemNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type,
      time: 'Just now',
      isRead: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Mark single as read
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // Clear all notifications
  const handleClearNotifications = () => {
    setNotifications([]);
  };

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // Toggle single appliance (HVAC, EV Charger, Sprinkler)
  const handleToggleAppliance = (id: string) => {
    setAppliances((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          const nextActive = !app.isActive;
          addNotification(
            `${app.name} State Altered`,
            `${app.name} system was successfully toggled ${nextActive ? 'ON' : 'OFF'} details updated in real-time.`,
            nextActive ? 'success' : 'info'
          );
          return { ...app, isActive: nextActive };
        }
        return app;
      })
    );
  };

  // Adapt draw capacity manually
  const handleUpdateApplianceDraw = (id: string, draw: number) => {
    setAppliances((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          if (app.type === 'sprinkler') {
            return { ...app, waterFlow: draw };
          }
          return { ...app, currentDraw: draw };
        }
        return app;
      })
    );
  };

  // Toggle automatons
  const handleToggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((flow) => {
        if (flow.id === id) {
          const nextState = !flow.isActive;
          addNotification(
            `Flow State Adjusted`,
            `The rule "${flow.name}" has been ${nextState ? 'activated' : 'deactivated'} safely.`,
            nextState ? 'success' : 'info'
          );
          return { ...flow, isActive: nextState };
        }
        return flow;
      })
    );
  };

  // Create customized flow rule
  const handleAddAutomation = (newFlow: Omit<Automation, 'id'>) => {
    const newlyCreated: Automation = {
      ...newFlow,
      id: `flow-${Date.now()}`,
    };
    setAutomations((prev) => [...prev, newlyCreated]);
    addNotification(
      'New Automation Rule Saved',
      `"${newFlow.name}" flow was registered and optimized to Northern European guidelines!`,
      'success'
    );
  };

  // Trigger from Usage tips "Automate Now"
  const handleAutomateTip = () => {
    setIsTipAutomated(true);
    
    // Create new dishwasher automation rule
    const dishwasherRule: Automation = {
      id: 'dishwasher-flow',
      name: 'Off-Peak Dishwashing',
      description: 'Defers dishwashing cycles to 11:00 PM for maximum off-peak rate utilization.',
      isActive: true,
      type: 'eco',
      influenceCount: 1,
      savingEstimate: '-20% rate',
      badgeText: 'ESTIMATED -$14.50',
    };

    setAutomations((prev) => [...prev, dishwasherRule]);
    addNotification(
      'Smart Dishwasher Configured',
      'Awesome! Shifting dishwasher operations to 11 PM configured. Estimated $14.50 monthly fee savings locked in!',
      'success'
    );
  };

  // Calculate dynamic today metric counters based on active appliances state & settings multiplier
  // Base Energy consumption = 12.4 kWh, Base Water consumption = 240 L
  let dynamicEnergy = 12.4 * energyMultiplier;
  let dynamicWater = 240 * waterMultiplier;

  // Let's make the math incredibly interactive!
  // If HVAC is turned OFF, reduce energy count!
  const isHvacActive = appliances.find((a) => a.id === 'hvac')?.isActive;
  const isEvActive = appliances.find((a) => a.id === 'ev-charger')?.isActive;
  const isSprinklerActive = appliances.find((a) => a.id === 'smart-sprinkler')?.isActive;

  if (!isHvacActive) {
    dynamicEnergy -= 2.8; 
  }
  if (!isEvActive) {
    dynamicEnergy -= 5.1;
  }
  if (isSprinklerActive) {
    dynamicWater += 85; 
  }

  // Ensure they don't fall behind zero
  dynamicEnergy = Math.max(1.8, dynamicEnergy);
  dynamicWater = Math.max(60, dynamicWater);

  return (
    <div className="bg-[#fcfdff] min-h-screen text-gray-800 font-sans flex flex-col transition-colors duration-300">
      {/* Top Main App Header bar */}
      <TopAppBar
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onClearAll={handleClearNotifications}
        onMarkAllAsRead={handleMarkAllAsRead}
      />

      {/* Main Screen Layout frame */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 pt-6 pb-28 md:pt-10">
        {activeTab === 'dashboard' && (
          <DashboardTab
            appliances={appliances}
            onToggleAppliance={handleToggleAppliance}
            onUpdateApplianceDraw={handleUpdateApplianceDraw}
            energyUsed={dynamicEnergy}
            waterUsed={dynamicWater}
            addNotification={addNotification}
          />
        )}

        {activeTab === 'usage' && (
          <UsageTab
            usageHistory={INITIAL_USAGE_HISTORY}
            consumers={consumers}
            onAutomateTip={handleAutomateTip}
            isTipAutomated={isTipAutomated}
          />
        )}

        {activeTab === 'automations' && (
          <AutomationsTab
            automations={automations}
            onToggleAutomation={handleToggleAutomation}
            onAddAutomation={handleAddAutomation}
            gridStandard={gridStandard}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsTab
            gridStandard={gridStandard}
            onGridStandardChange={setGridStandard}
            energyMultiplier={energyMultiplier}
            onEnergyMultiplierChange={setEnergyMultiplier}
            waterMultiplier={waterMultiplier}
            onWaterMultiplierChange={setWaterMultiplier}
            userEmail={userEmail}
          />
        )}
      </main>

      {/* Universal Floating Bottom Bar controller */}
      <BottomNavBar activeTab={activeTab} onChangeTab={setActiveTab} />
    </div>
  );
}
