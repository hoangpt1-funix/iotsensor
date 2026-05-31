import React, { useState } from 'react';
import { Bolt, ArrowUpRight, Lightbulb, Snowflake, WashingMachine, Zap, ArrowDownRight, TrendingUp } from 'lucide-react';
import { UsageDay, Consumer } from '../types';

interface UsageTabProps {
  usageHistory: UsageDay[];
  consumers: Consumer[];
  onAutomateTip: () => void;
  isTipAutomated: boolean;
}

export default function UsageTab({
  usageHistory,
  consumers,
  onAutomateTip,
  isTipAutomated,
}: UsageTabProps) {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  // Constants
  const maxEnergyInHistory = Math.max(...usageHistory.map((u) => u.energy), 1);
  const maxWaterInHistory = Math.max(...usageHistory.map((u) => u.water), 1);

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Hero Section: Weekly Dynamic Insight */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 select-none">
        {/* Left Insight text */}
        <div className="md:col-span-8 p-6 md:p-8 rounded-2xl bg-green-50/50 border border-green-100 flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10 space-y-4">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-[10px] font-bold uppercase tracking-widest">
              Weekly Insight
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Your efficiency rose by <span className="text-green-650">12%</span> since last Monday.
            </h2>
          </div>

          <div className="mt-8 flex gap-8 relative z-10">
            <div>
              <p className="text-xs font-semibold text-gray-400">Avg. Daily Energy</p>
              <p className="font-headline text-xl font-bold text-gray-900">14.2 kWh</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400">Avg. Daily Water</p>
              <p className="font-headline text-xl font-bold text-gray-900">420 L</p>
            </div>
          </div>

          {/* Abstract Gradient Background Decors */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-300/10 to-transparent rounded-full -mr-20 -mt-20 blur-2xl group-hover:from-green-300/20 transition-all duration-550" />
        </div>

        {/* Right monthly metrics */}
        <div className="md:col-span-4 p-6 md:p-8 rounded-2xl bg-green-750 text-white flex flex-col justify-between shadow-xl shadow-green-950/10 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="p-2 bg-white/10 rounded-xl select-none">
              <Bolt className="w-6 h-6 fill-white" />
            </span>
            <span className="text-white/40 hover:text-white transition-colors cursor-pointer">
              <ArrowUpRight className="w-5 h-5" />
            </span>
          </div>
          <div className="space-y-1 mt-8">
            <p className="font-headline text-4xl font-black">-$42.00</p>
            <p className="text-xs text-green-100 font-medium">Estimated savings this month</p>
          </div>
        </div>
      </section>

      {/* Usage Trends charts */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            <h3 className="font-headline text-xl font-bold text-gray-950">Usage Trends</h3>
            <p className="text-xs font-medium text-gray-450 mt-0.5">7-Day Resource Comparison</p>
          </div>
          
          {/* Legend */}
          <div className="flex items-center gap-4 text-xs font-semibold select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-600 block" />
              <span className="text-gray-500">Energy (kWh)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600 block" />
              <span className="text-gray-500">Water (L)</span>
            </div>
          </div>
        </div>

        {/* Interactive Custom Bar chart */}
        <div className="p-6 md:p-8 rounded-2xl bg-white border border-gray-100 shadow-xs flex flex-col justify-between relative">
          
          {hoveredDay && (
            <div className="absolute top-4 left-6 bg-gray-950 text-white rounded-lg px-3 py-1.5 text-[10px] space-y-0.5 shadow-md z-10 transition-all">
              <p className="font-bold border-b border-white/10 pb-0.5">Day: {hoveredDay}</p>
              {usageHistory.filter(uh => uh.day === hoveredDay).map(dayObj => (
                <div key={dayObj.day} className="flex gap-4">
                  <span>Energy: <b>{dayObj.energy.toFixed(1)} kWh</b></span>
                  <span>Water: <b>{dayObj.water} L</b></span>
                </div>
              ))}
            </div>
          )}

          <div className="h-64 flex items-end gap-1.5 md:gap-4 select-none pt-4">
            {usageHistory.map((uh) => {
              // Scale heights to matching percentages
              const energyHeightPercent = (uh.energy / maxEnergyInHistory) * 90;
              const waterHeightPercent = (uh.water / maxWaterInHistory) * 90;

              return (
                <div
                  key={uh.day}
                  onMouseEnter={() => setHoveredDay(uh.day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={`flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer transition-all ${
                    hoveredDay === uh.day ? 'scale-[1.03]' : ''
                  }`}
                >
                  {/* Two Double Bars */}
                  <div className="w-full flex justify-center items-end gap-1 h-full pb-1 border-b border-gray-100">
                    {/* Energy Bar */}
                    <div
                      style={{ height: `${energyHeightPercent}%` }}
                      className={`w-2.5 md:w-5 bg-green-500/30 rounded-t group-hover:bg-green-600 transition-all duration-300 ${
                        uh.day === 'THU' ? 'bg-green-600' : ''
                      }`}
                    />
                    {/* Water Bar */}
                    <div
                      style={{ height: `${waterHeightPercent}%` }}
                      className={`w-2.5 md:w-5 bg-blue-500/30 rounded-t group-hover:bg-blue-600 transition-all duration-300 ${
                        uh.day === 'THU' ? 'bg-blue-600' : ''
                      }`}
                    />
                  </div>
                  <span className={`text-[9px] font-bold tracking-wider leading-none transition-colors ${
                    uh.day === 'THU' ? 'text-green-700' : 'text-gray-400 group-hover:text-gray-700'
                  }`}>
                    {uh.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Consumers list mapping */}
      <section className="space-y-4">
        <h3 className="font-headline text-xl font-bold text-gray-950">Top Consumers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {consumers.map((con) => {
            const hasIcon = con.type === 'hvac' ? (
              <Snowflake className="w-5 h-5 text-green-700" />
            ) : con.type === 'ev' ? (
              <Zap className="w-5 h-5 text-green-750" />
            ) : (
              <WashingMachine className="w-5 h-5 text-blue-700" />
            );

            // Change badge class mapping
            const badgeColorMap =
              con.changeType === 'up'
                ? 'bg-red-50 text-red-700'
                : con.changeType === 'down'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-500';

            return (
              <div
                key={con.id}
                className="bg-white border border-gray-100 p-5 rounded-2xl flex flex-col justify-between transition-all hover:shadow-xs group hover:border-gray-200 select-none"
              >
                <div className="flex justify-between items-start">
                  <div className="w-11 h-11 rounded-xl bg-gray-55/60 flex items-center justify-center border border-gray-100">
                    {hasIcon}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColorMap}`}>
                    {con.changeLabel}
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  <h4 className="font-headline text-base font-bold text-gray-900 group-hover:text-green-850 transition-colors">
                    {con.name}
                  </h4>
                  
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline text-2xl font-black text-gray-900">
                        {con.value.toFixed(1)}
                      </span>
                      <span className="text-[11px] font-bold text-gray-400">
                        {con.unit}
                      </span>
                    </div>

                    {/* Progress tracking bar */}
                    <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          con.type === 'laundry' ? 'bg-blue-500' : 'bg-green-600'
                        }`}
                        style={{ width: `${con.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Smart Optimization Advisor */}
      <section className="bg-blue-50 border border-blue-105 p-6 rounded-2xl flex flex-col md:flex-row gap-5 items-center justify-between shadow-xs">
        <div className="flex gap-4 items-center md:items-start">
          <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
            <Lightbulb className="w-6 h-6 fill-blue-100" />
          </div>
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-headline text-lg font-bold text-blue-900 leading-tight">
              Smart Optimization Tip
            </h4>
            <p className="text-xs text-blue-700 leading-relaxed max-w-xl">
              Your hot water usage peaks between 7 AM and 8 AM. Shifting your dishwasher cycle 
              to 11 PM could save you up to $14.50/month on off-peak rates.
            </p>
          </div>
        </div>

        <button
          onClick={onAutomateTip}
          disabled={isTipAutomated}
          className={`px-5 py-2.5 font-bold text-xs rounded-xl whitespace-nowrap transition-all outline-none ${
            isTipAutomated
              ? 'bg-blue-200 text-blue-800 opacity-75 cursor-not-allowed border border-blue-300'
              : 'bg-blue-900 text-white hover:bg-blue-950 active:scale-[0.98]'
          }`}
        >
          {isTipAutomated ? 'Automated ✓' : 'Automate Now'}
        </button>
      </section>
    </div>
  );
}
