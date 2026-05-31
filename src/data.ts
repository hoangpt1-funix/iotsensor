import { Appliance, Automation, UsageDay, Consumer, SystemNotification } from './types';

export const INITIAL_APPLIANCES: Appliance[] = [
  {
    id: 'hvac',
    name: 'HVAC',
    type: 'hvac',
    isActive: true,
    currentDraw: 1.2,
    waterFlow: 0,
    maxDraw: 2.0,
    maxWaterFlow: 0,
  },
  {
    id: 'ev-charger',
    name: 'EV Charger',
    type: 'ev',
    isActive: true,
    currentDraw: 7.4,
    waterFlow: 0,
    maxDraw: 10.0,
    maxWaterFlow: 0,
  },
  {
    id: 'smart-sprinkler',
    name: 'Smart Sprinkler',
    type: 'sprinkler',
    isActive: false,
    currentDraw: 0,
    waterFlow: 0,
    maxDraw: 0.1,
    maxWaterFlow: 20.0,
  },
];

export const INITIAL_AUTOMATIONS: Automation[] = [
  {
    id: 'peak-eco',
    name: 'Peak Hours Eco Mode',
    description: 'Automatically dims lights and adjusts HVAC when energy demand is highest.',
    isActive: true,
    type: 'eco',
    influenceCount: 12,
    savingEstimate: '-15% kWh',
    badgeText: 'OPTIMIZED',
  },
  {
    id: 'smart-sprinkler-flow',
    name: 'Smart Sprinkler Mode',
    description: 'Based on local rain forecast. Skips cycles when precipitation is predicted.',
    isActive: true,
    type: 'sprinkler',
    influenceCount: 4,
    savingEstimate: 'Idle',
    badgeText: '80% Rain Chance',
  },
];

export const INITIAL_USAGE_HISTORY: UsageDay[] = [
  { day: 'MON', energy: 10.5, water: 250 },
  { day: 'TUE', energy: 12.2, water: 310 },
  { day: 'WED', energy: 14.8, water: 420 },
  { day: 'THU', energy: 18.1, water: 240 }, // Peak day example in screenshot highlights THU
  { day: 'FRI', energy: 11.2, water: 290 },
  { day: 'SAT', energy: 8.4, water: 180 },
  { day: 'SUN', energy: 9.6, water: 210 },
];

export const INITIAL_CONSUMERS: Consumer[] = [
  {
    id: 'con-hvac',
    name: 'HVAC System',
    value: 84.2,
    unit: 'kWh',
    type: 'hvac',
    changeLabel: '+4% vs LW',
    changeType: 'up',
    progressPercent: 75,
  },
  {
    id: 'con-dishwasher',
    name: 'Dishwasher',
    value: 156,
    unit: 'Liters',
    type: 'laundry',
    changeLabel: '-12% vs LW',
    changeType: 'down',
    progressPercent: 45,
  },
  {
    id: 'con-ev',
    name: 'EV Charger',
    value: 52.0,
    unit: 'kWh',
    type: 'ev',
    changeLabel: 'Stable',
    changeType: 'stable',
    progressPercent: 60,
  },
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'notif-1',
    title: 'Water Leak Check',
    message: 'Main line scan completed successfully. Total Integrity: 100%. No leak detected.',
    type: 'success',
    time: 'Just now',
    isRead: false,
  },
  {
    id: 'notif-2',
    title: 'Peak Savings Available',
    message: 'Lower tariff window starts soon (11:00 PM). Schedule high demand devices.',
    type: 'info',
    time: '2 hours ago',
    isRead: false,
  },
  {
    id: 'notif-3',
    title: 'Eco Mode Engaged',
    message: 'Peak Saving mode reduced current HVAC draft by 0.4kW during grid peak load.',
    type: 'success',
    time: '4 hours ago',
    isRead: true,
  },
];
