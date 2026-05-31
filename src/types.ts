export type SystemType = 'hvac' | 'ev' | 'sprinkler' | 'custom' | 'laundry';

export interface Appliance {
  id: string;
  name: string;
  type: SystemType;
  isActive: boolean;
  currentDraw: number; // in kW if energy, or 0
  waterFlow: number; // in L/m if water, or 0
  maxDraw: number;
  maxWaterFlow: number;
}

export type AutomationType = 'eco' | 'sprinkler' | 'ev' | 'custom';

export interface Automation {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  type: AutomationType;
  influenceCount: number;
  savingEstimate: string;
  extraIcon?: string;
  statusText?: string;
  badgeText?: string;
}

export interface UsageDay {
  day: string; // e.g. "MON", "TUE"
  energy: number; // kWh
  water: number; // Liters
}

export interface Consumer {
  id: string;
  name: string;
  value: number; // total amount
  unit: string;  // e.g. "kWh" or "Liters"
  type: SystemType;
  changeLabel: string; // e.g. "+4% vs LW", "-12% vs LW"
  changeType: 'up' | 'down' | 'stable';
  progressPercent: number; // e.g. 75
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'info' | 'success';
  time: string;
  isRead: boolean;
}
