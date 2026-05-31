import React from 'react';
import { Settings, ShieldCheck, Zap, Droplet, User, Globe, HelpCircle, BellRing } from 'lucide-react';

interface SettingsTabProps {
  gridStandard: string;
  onGridStandardChange: (standard: string) => void;
  energyMultiplier: number;
  onEnergyMultiplierChange: (val: number) => void;
  waterMultiplier: number;
  onWaterMultiplierChange: (val: number) => void;
  userEmail: string;
}

const STANDARDS_LIST = [
  'Northern European Grid Standards',
  'North American IEEE 1547 Standard',
  'UK G98/G99 Regulation Standards',
  'Universal Smart Grid Protocol',
];

export default function SettingsTab({
  gridStandard,
  onGridStandardChange,
  energyMultiplier,
  onEnergyMultiplierChange,
  waterMultiplier,
  onWaterMultiplierChange,
  userEmail,
}: SettingsTabProps) {
  return (
    <div className="space-y-10 animate-in fade-in duration-300 select-none pb-8">
      {/* Settings Title */}
      <section className="space-y-2">
        <h2 className="font-headline text-4xl font-extrabold tracking-tight text-gray-950">
          Settings
        </h2>
        <p className="text-gray-450 text-xs font-semibold">
          Adjust simulation parameters and manage hardware connection definitions.
        </p>
      </section>

      {/* Grid standard and simulated quotas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Simulation Sandbox Modifiers */}
        <div className="p-6 bg-white border border-gray-105 rounded-2xl space-y-6">
          <h3 className="font-headline text-lg font-bold text-gray-950 flex items-center gap-2">
            <Zap className="w-5 h-5 text-green-700" />
            <span>Simulation Parameters</span>
          </h3>

          <div className="space-y-4">
            {/* Energy Slider */}
            <div className="space-y-1.5ClassName">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Daily Energy Used Modifier
                </span>
                <span className="text-xs font-black text-green-700 font-headline">
                  {(energyMultiplier * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={energyMultiplier}
                onChange={(e) => onEnergyMultiplierChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-700"
              />
              <p className="text-[10px] text-gray-400">
                Alters today's base simulated energy usage directly in the main centerpiece dial.
              </p>
            </div>

            {/* Water Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Daily Water Used Modifier
                </span>
                <span className="text-xs font-black text-blue-700 font-headline">
                  {(waterMultiplier * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={waterMultiplier}
                onChange={(e) => onWaterMultiplierChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-[10px] text-gray-400">
                Alters today's base simulated water consumption on the centerpiece display.
              </p>
            </div>
          </div>
        </div>

        {/* Localized Grid Protocol Definition */}
        <div className="p-6 bg-white border border-gray-105 rounded-2xl space-y-5">
          <h3 className="font-headline text-lg font-bold text-gray-950 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-750" />
            <span>Grid Sync Standards</span>
          </h3>

          <div className="space-y-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Active Grid Standard
            </span>
            <div className="space-y-2">
              {STANDARDS_LIST.map((std) => (
                <button
                  key={std}
                  onClick={() => onGridStandardChange(std)}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                    gridStandard === std
                      ? 'border-green-600 bg-green-50/20 text-green-750'
                      : 'border-gray-100 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <span>{std}</span>
                  {gridStandard === std && (
                    <ShieldCheck className="w-4 h-4 text-green-600 fill-green-50" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Profile & Accounts Info */}
      <section className="bg-gray-50/50 p-6 border border-gray-100 rounded-2xl space-y-6">
        <h3 className="font-headline text-lg font-bold text-gray-950 flex items-center gap-2">
          <User className="w-5 h-5 text-gray-700" />
          <span>User Profiles</span>
        </h3>

        <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center overflow-hidden border-2 border-green-500/10">
              <img
                alt="Account Avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjxMOnCACfRz2yL9-MeupUG2jc3soaE1lMMF0X1j54ZanW6JW8cLcHhOkSV5VKMrKgIN89XvBG1mbIAVyEHKl5Wzc1lZeXPWa9ddm3Chlk7EjZk176UR8AMqBqeS47TWRODGtA3rKIKL8j0_lCIS7I3pZb19a0A74fZ19qfRdj6nfY3Ho04BaPY7xxMz1SQzqqhgfPhIEPYn_UKl20kCOGv5iOOoJ11OpRmYeJHywfmWBO8lsRpo1XoVE9dM6S8E3BIsH520HkDOmH"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-headline text-base font-bold text-gray-900">Eco Installer profile</h4>
              <p className="text-xs text-gray-400 font-semibold">{userEmail || 'installer@ecosync.net'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-green-105 border border-green-200/50 text-green-800 font-bold px-3 py-1 rounded-full uppercase">
              Admin Integrator State
            </span>
          </div>
        </div>
      </section>

      {/* Dynamic Notifications options */}
      <section className="p-6 bg-white border border-gray-100 rounded-2xl space-y-4">
        <h3 className="font-headline text-base font-bold text-gray-950 flex items-center gap-2">
          <BellRing className="w-4 h-4 text-green-700" />
          <span>Integrator Alerts Toggle</span>
        </h3>
        <p className="text-xs text-gray-400">
          Currently, automated alert checks are synchronized. The main diagnostic routine checks sub-valves 
          every 6 hours for potential water main line pressure drops.
        </p>
      </section>
    </div>
  );
}
