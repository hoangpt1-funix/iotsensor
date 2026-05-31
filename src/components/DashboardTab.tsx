import React, { useState } from 'react';
import { Snowflake, Zap, Droplet, Check, RefreshCw, AlertTriangle, ChevronRight, CalendarCheck2 } from 'lucide-react';
import { Appliance, SystemNotification } from '../types';

interface DashboardTabProps {
  appliances: Appliance[];
  onToggleAppliance: (id: string) => void;
  onUpdateApplianceDraw: (id: string, draw: number) => void;
  energyUsed: number;
  waterUsed: number;
  addNotification: (title: string, message: string, type: 'alert' | 'success' | 'info') => void;
}

export default function DashboardTab({
  appliances,
  onToggleAppliance,
  onUpdateApplianceDraw,
  energyUsed,
  waterUsed,
  addNotification,
}: DashboardTabProps) {
  const [scheduled, setScheduled] = useState(false);
  const [leakAlertTest, setLeakAlertTest] = useState(false);

  // Active systems drawing power count
  const activeSystems = appliances.filter((a) => a.isActive).length;

  const gaugeRadius = 42;
  const gaugeCircumference = 2 * Math.PI * gaugeRadius; // Approx 263.89

  const maxEnergyAnchor = 25; // standard base scale
  const energyPercent = Math.min((energyUsed / maxEnergyAnchor) * 100, 100);
  const energyOffset = gaugeCircumference - (energyPercent / 100) * gaugeCircumference;

  const maxWaterAnchor = 500;
  const waterPercent = Math.min((waterUsed / maxWaterAnchor) * 100, 100);
  const waterOffset = gaugeCircumference - (waterPercent / 100) * gaugeCircumference;

  const handleScheduleToggle = () => {
    setScheduled(!scheduled);
    if (!scheduled) {
      addNotification(
        'EV Scheduled Charging Enabled',
        'Your EV Charger will now only draw power during the lowest tariff rates between 11 PM and 5 AM.',
        'success'
      );
    } else {
      addNotification(
        'EV Charge Schedule Removed',
        'EV Charger set back to immediate charging mode.',
        'info'
      );
    }
  };

  const toggleLeakAlertTest = () => {
    const nextState = !leakAlertTest;
    setLeakAlertTest(nextState);
    if (nextState) {
      addNotification(
        'Atypical Water Flow Scan',
        'Integrity tests running... We detected an abnormal water flow (8 L/m) in the sub-lines. Review alerts!',
        'alert'
      );
    } else {
      addNotification(
        'Lines Secure',
        'Scanning system reset. Main line check completed, integrity is Optimal (100%).',
        'success'
      );
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Centerpiece Display Dial */}
      <section className="flex flex-col items-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl justify-items-center">
          
          {/* Energy Gauge */}
          <div className="relative w-64 h-64 flex items-center justify-center p-4 bg-white border border-gray-100 rounded-3xl shadow-xs transition-transform hover:scale-[1.01]">
            <div className="absolute inset-0 rounded-full bg-green-500/5 blur-2xl" />
            
            <svg className="absolute w-11/12 h-11/12 -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                className="text-gray-100"
                cx="50"
                cy="50"
                fill="transparent"
                r={gaugeRadius}
                stroke="currentColor"
                strokeWidth="5.5"
              />
              <circle
                className="text-green-500 transition-all duration-1000 ease-out"
                cx="50"
                cy="50"
                fill="transparent"
                r={gaugeRadius}
                stroke="currentColor"
                strokeDasharray={gaugeCircumference}
                strokeDashoffset={energyOffset}
                strokeLinecap="round"
                strokeWidth="6"
              />
            </svg>

            <div className="z-10 text-center select-none space-y-1">
              <div className="flex items-center justify-center text-green-650 gap-1.5 mb-1 bg-green-50/50 px-3 py-1 rounded-full border border-green-100/30">
                <Zap className="w-4 h-4 fill-green-500 stroke-green-600" />
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-green-800">Energy used</span>
              </div>
              <div className="font-headline text-4xl font-extrabold text-gray-900 tracking-tight leading-none animate-pulse">
                {energyUsed.toFixed(1)}
              </div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                kWh Today
              </div>
            </div>
          </div>

          {/* Water Gauge */}
          <div className="relative w-64 h-64 flex items-center justify-center p-4 bg-white border border-gray-100 rounded-3xl shadow-xs transition-transform hover:scale-[1.01]">
            <div className="absolute inset-0 rounded-full bg-blue-500/5 blur-2xl" />
            
            <svg className="absolute w-11/12 h-11/12 -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                className="text-blue-50/50"
                cx="50"
                cy="50"
                fill="transparent"
                r={gaugeRadius}
                stroke="currentColor"
                strokeWidth="5.5"
              />
              <circle
                className="text-blue-600 transition-all duration-1000 ease-out"
                cx="50"
                cy="50"
                fill="transparent"
                r={gaugeRadius}
                stroke="currentColor"
                strokeDasharray={gaugeCircumference}
                strokeDashoffset={waterOffset}
                strokeLinecap="round"
                strokeWidth="6"
              />
            </svg>

            <div className="z-10 text-center select-none space-y-1">
              <div className="flex items-center justify-center text-blue-650 gap-1.5 mb-1 bg-blue-50/50 px-3 py-1 rounded-full border border-blue-100/30">
                <Droplet className="w-3.5 h-3.5 fill-blue-500 stroke-blue-600 animate-bounce duration-1000" />
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-805 text-blue-800">Water used</span>
              </div>
              <div className="font-headline text-4xl font-extrabold text-gray-900 tracking-tight leading-none">
                {waterUsed}
              </div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                Liters Today
              </div>
            </div>
          </div>

        </div>

        {/* Info stats block */}
        <div className="grid grid-cols-2 gap-8 mt-10 w-full max-w-md bg-white border border-gray-100 p-4 rounded-xl shadow-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Energy Efficiency
            </span>
            <div className="flex items-center gap-1">
              <span className="font-headline text-2xl font-black text-green-700">88%</span>
              <span className="flex items-center text-green-600 text-xs font-bold leading-none bg-green-50 px-1 py-0.5 rounded">
                ↑
              </span>
            </div>
          </div>
          <div className="space-y-0.5 text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Resource Health
            </span>
            <div className="flex items-center justify-end gap-1.5">
              <span className="font-headline text-2xl font-black text-gray-900">
                {leakAlertTest ? 'Atypical' : 'Optimal'}
              </span>
              <span className={`w-2.5 h-2.5 rounded-full ring-2 ${
                leakAlertTest ? 'bg-amber-500 ring-amber-200' : 'bg-green-500 ring-green-105'
              }`} />
            </div>
          </div>
        </div>
      </section>

      {/* Active Appliances Container */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-gray-950">
              Active Appliances
            </h2>
            <p className="text-xs font-medium text-gray-450 mt-0.5">
              {activeSystems} {activeSystems === 1 ? 'system' : 'systems'} drawing power
            </p>
          </div>
          <button className="text-green-705 font-bold text-xs hover:underline flex items-center gap-0.5" disabled>
            View All
          </button>
        </div>

        {/* Scroll Row */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 -mx-2 px-2 snap-x select-none">
          {appliances.map((app) => {
            const hasIcon = app.type === 'hvac' ? (
              <Snowflake className="w-5 h-5 text-green-750" />
            ) : app.type === 'ev' ? (
              <Zap className="w-5 h-5 text-green-750" />
            ) : (
              <Droplet className="w-5 h-5 text-blue-700" />
            );

            // Calculate current drawing
            const displayDraw = app.isActive ? app.currentDraw : 0;
            const progressRatio = Math.max(0, Math.min(100, (displayDraw / app.maxDraw) * 100));

            return (
              <div
                key={app.id}
                className={`snap-start shrink-0 w-64 p-5 rounded-2xl border transition-all duration-300 ${
                  app.isActive
                    ? 'bg-green-50/30 border-green-100 shadow-sm'
                    : 'bg-gray-50/50 border-gray-100 opacity-60'
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  {/* Icon Frame */}
                  <div className={`p-2.5 rounded-xl ${
                    app.type === 'sprinkler'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-green-100/55 text-green-800'
                  }`}>
                    {hasIcon}
                  </div>

                  {/* Toggle Button Switch */}
                  <button
                    onClick={() => onToggleAppliance(app.id)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      app.isActive
                        ? app.type === 'sprinkler' ? 'bg-blue-600' : 'bg-green-600'
                        : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        app.isActive ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-headline text-lg font-bold text-gray-900 leading-none">
                      {app.name}
                    </h3>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-400">
                        {app.type === 'sprinkler' ? 'Water Flow' : 'Current Draw'}
                      </span>
                      <span className="text-gray-900">
                        {app.type === 'sprinkler'
                          ? `${app.isActive ? app.waterFlow : 0} L/m`
                          : `${displayDraw.toFixed(1)} kW`}
                      </span>
                    </div>

                    {/* Progress Bar indicator */}
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          app.type === 'sprinkler' ? 'bg-blue-500' : 'bg-green-600'
                        }`}
                        style={{ width: `${app.isActive ? progressRatio : 0}%` }}
                      />
                    </div>

                    {/* Slider controller for draw/spray modification during interactive sessions */}
                    {app.isActive && (
                      <div className="pt-2">
                        <input
                          type="range"
                          min={app.type === 'sprinkler' ? 5 : 0.5}
                          max={app.type === 'sprinkler' ? app.maxWaterFlow : app.maxDraw}
                          step={app.type === 'sprinkler' ? 1 : 0.1}
                          value={app.type === 'sprinkler' ? app.waterFlow : app.currentDraw}
                          onChange={(e) =>
                            onUpdateApplianceDraw(app.id, parseFloat(e.target.value))
                          }
                          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-700"
                        />
                        <div className="flex justify-between text-[9px] text-gray-400 mt-0.5">
                          <span>Min Cap</span>
                          <span>Max Dynamic Cap</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bento Grid Insights Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Peak Savings Window */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-white border border-gray-100 shadow-xs relative overflow-hidden group">
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="space-y-2">
              <h4 className="font-headline text-lg font-bold text-gray-900">
                Peak Saving Window
              </h4>
              <p className="text-xs text-gray-450 leading-relaxed max-w-sm">
                Lower electricity tariff rates are available between 11:00 PM and 5:00 AM. 
                Schedule your EV charge routine automatically during off-peak hours.
              </p>
            </div>
            
            <button
              onClick={handleScheduleToggle}
              id="schedule-toggle-btn"
              className={`mt-6 px-5 py-2.5 font-bold text-xs rounded-xl transition-all self-start flex items-center gap-2 ${
                scheduled
                  ? 'bg-green-50 text-green-750 border border-green-200'
                  : 'bg-green-750 text-white hover:bg-green-800'
              }`}
            >
              {scheduled ? (
                <>
                  <Check className="w-4 h-4" />
                  Scheduled (11 PM - 5 AM)
                </>
              ) : (
                'Schedule Now'
              )}
            </button>
          </div>

          {/* Clock Decor in Background */}
          <div className="absolute right-0 bottom-0 text-gray-100/70 select-none group-hover:scale-110 group-hover:text-green-50/40 transition-all duration-700 pointer-events-none md:translate-x-4 md:translate-y-4">
            <CalendarCheck2 className="w-36 h-36 stroke-[0.8]" />
          </div>
        </div>

        {/* Water Leak Alert status */}
        <div
          onClick={toggleLeakAlertTest}
          className={`p-6 rounded-2xl text-white flex flex-col justify-between cursor-pointer select-none transition-all hover:scale-[1.01] ${
            leakAlertTest 
              ? 'bg-amber-600 shadow-md animate-pulse' 
              : 'bg-blue-600 shadow-sm'
          }`}
          title="Click to run system line leaks simulation tests!"
        >
          <div className="flex justify-between items-start">
            <span className="p-2 bg-white/10 rounded-xl">
              <Droplet className={`w-6 h-6 fill-white ${leakAlertTest ? 'animate-bounce' : ''}`} />
            </span>
            <div className="text-[9px] bg-white/15 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Line diagnostics
            </div>
          </div>
          
          <div className="space-y-1">
            <h4 className="font-headline text-base font-bold">
              {leakAlertTest ? 'Atypical Flow Scan' : 'Water Leak Alert'}
            </h4>
            <p className="text-xs opacity-90 leading-tight">
              {leakAlertTest
                ? 'Abnormal continuous flow identified inside bathroom sub-valves!'
                : 'No abnormal flow detected in the main line today.'}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="font-headline text-2xl font-black uppercase tracking-wide">
              {leakAlertTest ? 'Warning' : 'Secure'}
            </span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-medium">
              Simulation Test
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
