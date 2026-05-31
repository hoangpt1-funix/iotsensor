import React from 'react';
import { LayoutDashboard, BarChart2, Workflow, Settings } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

export default function BottomNavBar({ activeTab, onChangeTab }: BottomNavBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-100 py-2.5 px-6 shrink-0 transition-all duration-300">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {/* Dashboard Tab */}
        <button
          onClick={() => onChangeTab('dashboard')}
          id="tab-btn-dashboard"
          className={`flex flex-col items-center gap-1 p-1.5 transition-all outline-none focus:ring-2 focus:ring-green-500/10 rounded-lg ${
            activeTab === 'dashboard'
              ? 'text-green-700 font-bold'
              : 'text-gray-400 hover:text-gray-700 font-medium'
          }`}
        >
          <LayoutDashboard className={`w-5 h-5 transition-transform ${activeTab === 'dashboard' ? 'scale-110 stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
          <span className="text-[10px] uppercase tracking-wider">Dashboard</span>
        </button>

        {/* Usage Tab */}
        <button
          onClick={() => onChangeTab('usage')}
          id="tab-btn-usage"
          className={`flex flex-col items-center gap-1 p-1.5 transition-all outline-none focus:ring-2 focus:ring-green-500/10 rounded-lg ${
            activeTab === 'usage'
              ? 'text-green-700 font-bold'
              : 'text-gray-400 hover:text-gray-700 font-medium'
          }`}
        >
          <BarChart2 className={`w-5 h-5 transition-transform ${activeTab === 'usage' ? 'scale-110 stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
          <span className="text-[10px] uppercase tracking-wider">Usage</span>
        </button>

        {/* Automations Tab */}
        <button
          onClick={() => onChangeTab('automations')}
          id="tab-btn-automations"
          className={`flex flex-col items-center gap-1 p-1.5 transition-all outline-none focus:ring-2 focus:ring-green-500/10 rounded-lg ${
            activeTab === 'automations'
              ? 'text-green-700 font-bold'
              : 'text-gray-400 hover:text-gray-700 font-medium'
          }`}
        >
          <div className="relative">
            <Workflow className={`w-5 h-5 transition-transform ${activeTab === 'automations' ? 'scale-110 stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full" />
          </div>
          <span className="text-[10px] uppercase tracking-wider">Automations</span>
        </button>

        {/* Settings Tab */}
        <button
          onClick={() => onChangeTab('settings')}
          id="tab-btn-settings"
          className={`flex flex-col items-center gap-1 p-1.5 transition-all outline-none focus:ring-2 focus:ring-green-500/10 rounded-lg ${
            activeTab === 'settings'
              ? 'text-green-700 font-bold'
              : 'text-gray-400 hover:text-gray-700 font-medium'
          }`}
        >
          <Settings className={`w-5 h-5 transition-transform ${activeTab === 'settings' ? 'scale-110 stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
          <span className="text-[10px] uppercase tracking-wider">Settings</span>
        </button>
      </div>
    </nav>
  );
}
