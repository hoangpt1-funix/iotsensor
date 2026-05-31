import React, { useState } from 'react';
import { Leaf, Droplet, Zap, Filter, Plus, Check, Verified, Settings, X } from 'lucide-react';
import { Automation } from '../types';

interface AutomationsTabProps {
  automations: Automation[];
  onToggleAutomation: (id: string) => void;
  onAddAutomation: (newFlow: Omit<Automation, 'id'>) => void;
  gridStandard: string;
}

export default function AutomationsTab({
  automations,
  onToggleAutomation,
  onAddAutomation,
  gridStandard,
}: AutomationsTabProps) {
  const [showNewFlowModal, setShowNewFlowModal] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  // New flow form states
  const [newFlowName, setNewFlowName] = useState('');
  const [newFlowDesc, setNewFlowDesc] = useState('');
  const [newFlowType, setNewFlowType] = useState<'eco' | 'sprinkler' | 'ev' | 'custom'>('eco');
  const [newFlowSavings, setNewFlowSavings] = useState('-10% kWh');
  const [newFlowDevices, setNewFlowDevices] = useState(4);

  const activeFlowCount = automations.filter((a) => a.isActive).length;

  const handleSubmitFlow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFlowName.trim()) return;

    onAddAutomation({
      name: newFlowName,
      description: newFlowDesc || 'Automated smart optimization logic run by EcoSync.',
      isActive: true,
      type: newFlowType,
      influenceCount: newFlowDevices,
      savingEstimate: newFlowSavings,
    });

    // Reset Form
    setNewFlowName('');
    setNewFlowDesc('');
    setNewFlowType('eco');
    setNewFlowSavings('-12% kWh');
    setNewFlowDevices(2);
    setShowNewFlowModal(false);
  };

  const filteredAutomations = automations.filter((a) => {
    if (filterType === 'all') return true;
    return a.type === filterType;
  });

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* Editorial Header Section */}
      <section className="space-y-4 select-none">
        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-[10px] font-bold uppercase tracking-widest">
          Optimized
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <h2 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter text-gray-950">
              Automations
            </h2>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed font-normal">
              The Luminous Engine is currently managing{' '}
              <span className="font-bold text-green-700 italic">
                {activeFlowCount} active flows
              </span>{' '}
              to reduce your carbon footprint while maximizing grid efficiency.
            </p>
          </div>

          <div className="flex items-center gap-2 relative">
            {/* Filter flow control */}
            <button
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              id="btn-filter-flows"
              className="px-4 py-2.5 bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-25/50 rounded-xl font-bold text-xs flex items-center gap-2 transition-all"
            >
              <Filter className="w-4 h-4" />
              <span>Filter: {filterType.toUpperCase()}</span>
            </button>

            {isFilterDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setIsFilterDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-40 p-1 divide-y divide-gray-50 animate-in fade-in slide-in-from-top-1">
                  {['all', 'eco', 'sprinkler', 'ev', 'custom'].map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setFilterType(t);
                        setIsFilterDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-green-50/50 rounded-lg transition-colors font-medium flex items-center justify-between text-gray-700"
                    >
                      <span>{t.toUpperCase()}</span>
                      {filterType === t && <Check className="w-3.5 h-3.5 text-green-600" />}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* New Flow Trigger */}
            <button
              onClick={() => setShowNewFlowModal(true)}
              id="btn-new-flow"
              className="px-4 py-2.5 bg-green-750 text-white hover:bg-green-800 rounded-xl font-bold text-xs flex items-center gap-2 transition-all hover:shadow-md active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>New Flow</span>
            </button>
          </div>
        </div>
      </section>

      {/* Asymmetric Bento Grid for Automations */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {filteredAutomations.map((flow) => {
          const isFeatured = flow.type === 'eco';
          const icon =
            flow.type === 'eco' ? (
              <Leaf className="w-5 h-5 text-green-750" />
            ) : flow.type === 'sprinkler' ? (
              <Droplet className="w-5 h-5 text-blue-750" />
            ) : (
              <Zap className="w-5 h-5 text-green-700" />
            );

          return (
            <div
              key={flow.id}
              className={`editorial-shadow flex flex-col justify-between p-6 md:p-8 rounded-2xl relative overflow-hidden transition-all ${
                isFeatured
                  ? 'md:col-span-8 bg-white border border-gray-150 min-h-[280px]'
                  : 'md:col-span-4 bg-gray-50/50 border border-gray-100 min-h-[280px]'
              }`}
            >
              {/* Abs circular gradients behind */}
              {isFeatured && (
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-300/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
              )}

              <div className="flex justify-between items-start z-10">
                <div className="space-y-4">
                  {/* Icon Tile */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      flow.type === 'sprinkler' ? 'bg-blue-105' : 'bg-green-105'
                    }`}
                  >
                    {icon}
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-headline text-xl font-bold text-gray-950">
                      {flow.name}
                    </h3>
                    <p className="text-xs text-gray-450 leading-relaxed max-w-sm">
                      {flow.description}
                    </p>
                  </div>
                </div>

                {/* Automation Active Switch */}
                <button
                  onClick={() => onToggleAutomation(flow.id)}
                  id={`switch-flow-${flow.id}`}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    flow.isActive ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      flow.isActive ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Bottom detail stats */}
              <div className="mt-8 pt-6 border-t border-gray-100 z-10 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  {flow.badgeText && (
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-green-50 text-green-800 px-2.5 py-0.5 rounded-full">
                      {flow.badgeText}
                    </span>
                  )}
                  <span className="text-[11px] font-bold text-gray-400">
                    Influences {flow.influenceCount} devices
                  </span>
                </div>

                <div className="flex items-center gap-1 font-bold text-green-705 text-sm md:text-base font-headline">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{flow.savingEstimate}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* EV Charger Schedule Card - Bottom Wide */}
        <div className="md:col-span-12 bg-gray-900 rounded-3xl p-6 md:p-8 relative overflow-hidden select-none shadow-lg">
          {/* BG Image overlay with opacity */}
          <div
            className="absolute inset-0 opacity-15 hover:opacity-20 transition-opacity bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCm2Yb6C5b8Pg21lDgFnJrwBr6VQ7Ba2Pr7rf_16s-_dEIJ2RgvH-aH6qox-w0or5-UZXInT67oSrC15ujc4oqt73eJXdMDN5kXpy9LLB1EbFxvHN4LYepa0PGvgUeT12vtDR_ljtoqDHqngfSE9-nKtGizjXTmYXyML7cJ_wtvrjx75C5gjIuT8D-dW6tp-ClwOOa5c6X6VxJsxQwb24Q0QZUmSHo91_u8OcowPZRPbp4zUXX_osms8_3E6iI7HMq2Ns5h0N0t_SuT')`,
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex gap-4 items-center flex-col md:flex-row text-center md:text-left">
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-white stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-headline text-2xl font-black text-gray-50 leading-tight">
                  EV Scheduled Charging
                </h3>
                <p className="text-gray-400 text-xs md:text-sm max-w-md">
                  Charges during lowest electricity tariff rates on the power grid between 12:00 AM and 5:00 AM.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t border-white/5 pt-4 md:border-0 md:pt-0">
              <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">
                  Next Active Cycle
                </p>
                <p className="text-white font-headline text-sm font-bold">Today, 11:45 PM</p>
              </div>
              <span className="px-3 py-1 bg-green-500/15 text-green-400 rounded-full border border-green-500/10 text-xs font-bold uppercase">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Stats Row summary widgets */}
        <div className="md:col-span-12 pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 select-none">
            <div className="p-5 bg-gray-50/50 border border-gray-100 rounded-xl text-center md:text-left">
              <p className="text-[9px] font-bold text-gray-450 uppercase tracking-widest mb-1">
                Daily Savings
              </p>
              <p className="font-headline text-3xl font-black text-gray-900">$4.15</p>
            </div>
            <div className="p-5 bg-gray-50/50 border border-gray-100 rounded-xl text-center md:text-left">
              <p className="text-[9px] font-bold text-gray-450 uppercase tracking-widest mb-1">
                Carbon Offset
              </p>
              <p className="font-headline text-3xl font-black text-gray-900">12.4kg</p>
            </div>
            <div className="p-5 bg-gray-50/50 border border-gray-100 rounded-xl text-center md:text-left">
              <p className="text-[9px] font-bold text-gray-450 uppercase tracking-widest mb-1">
                Efficiency Score
              </p>
              <p className="font-headline text-3xl font-black text-green-700">94/100</p>
            </div>
            <div className="p-5 bg-gray-50/50 border border-gray-100 rounded-xl text-center md:text-left">
              <p className="text-[9px] font-bold text-gray-450 uppercase tracking-widest mb-1">
                Grid Health
              </p>
              <p className="font-headline text-3xl font-black text-gray-900">Stable</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Visual Section */}
      <section className="mt-16 flex flex-col items-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />
        <p className="font-sans text-xs text-gray-400 flex items-center gap-1.5 leading-none">
          <Verified className="w-4 h-4 text-green-600 fill-green-50" />
          <span>System algorithms are optimized for {gridStandard}</span>
        </p>
      </section>

      {/* New Flow Dialog modal */}
      {showNewFlowModal && (
        <div className="fixed inset-0 bg-gray-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-gray-100 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowNewFlowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Close modal dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-headline text-xl font-bold text-gray-950 mb-1 flex items-center gap-2">
              <Settings className="w-5 h-5 text-green-700" />
              <span>Create New Flow</span>
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Add a new automated rule to control devices optimization routine.
            </p>

            <form onSubmit={handleSubmitFlow} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">
                  Flow Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., HVAC Eco Boost"
                  value={newFlowName}
                  onChange={(e) => setNewFlowName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-green-600 text-gray-800"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">
                  Description
                </label>
                <textarea
                  placeholder="Summarize the action or trigger of this flow automation."
                  rows={2}
                  value={newFlowDesc}
                  onChange={(e) => setNewFlowDesc(e.target.value)}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-green-600 text-gray-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">
                    Flow Type
                  </label>
                  <select
                    value={newFlowType}
                    onChange={(e) => setNewFlowType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:border-green-600"
                  >
                    <option value="eco">♻ Eco Mode</option>
                    <option value="sprinkler">💧 Sprinkler</option>
                    <option value="ev">⚡ EV Station</option>
                    <option value="custom">🛠 Custom Rule</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">
                    Savings Target
                  </label>
                  <input
                    type="text"
                    required
                    value={newFlowSavings}
                    onChange={(e) => setNewFlowSavings(e.target.value)}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-green-600 text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">
                  Target Influenced Devices
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={newFlowDevices}
                  onChange={(e) => setNewFlowDevices(parseInt(e.target.value) || 1)}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-green-600 text-gray-800"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-6 px-4 py-2.5 bg-green-755 text-white bg-green-700 hover:bg-green-800 rounded-xl font-bold text-xs font-semibold transition-all shadow"
              >
                Create Automation Rule
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
