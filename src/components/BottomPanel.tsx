"use client";

import React, { useState } from 'react';
import { Settings2, Info } from 'lucide-react';
import { SliderData } from '@/app/page';

interface BottomPanelProps {
  sliders: SliderData[];
  setSliders: React.Dispatch<React.SetStateAction<SliderData[]>>;
}

const scenarios = [
  { label: "Mayor Rentabilidad", values: { producto: 80, precio: 100, plaza: 60, promocion: 50, riesgo: 70 } },
  { label: "Menor Riesgo", values: { producto: 60, precio: 50, plaza: 80, promocion: 40, riesgo: 10 } },
  { label: "Mayor Demanda", values: { producto: 100, precio: 80, plaza: 90, promocion: 90, riesgo: 50 } },
  { label: "Equilibrado", values: { producto: 85, precio: 70, plaza: 65, promocion: 60, riesgo: 30 } },
];

export default function BottomPanel({ sliders, setSliders }: BottomPanelProps) {
  const [activeScenario, setActiveScenario] = useState("Equilibrado");

  const handleSliderChange = (id: string, newValue: number) => {
    setSliders(prev => prev.map(s => s.id === id ? { ...s, value: newValue } : s));
    setActiveScenario("Personalizado"); // Switch to custom if manually changed
  };

  const applyScenario = (label: string, values: Record<string, number>) => {
    setActiveScenario(label);
    setSliders(prev => prev.map(s => ({
      ...s,
      value: values[s.id] !== undefined ? values[s.id] : s.value
    })));
  };

  return (
    <div className="dashboard-card p-6 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
      <div className="flex-1 w-full">
        <div className="flex items-center space-x-2 mb-6">
          <Settings2 className="w-5 h-5 text-slate-400" />
          <h3 className="font-bold text-slate-800">Ajuste de Mix de Marketing & Riesgo</h3>
          <Info className="w-4 h-4 text-slate-300 cursor-help" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {sliders.map((slider) => (
            <div key={slider.id} className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-600">{slider.label}</label>
                <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700">{slider.value}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={slider.value}
                onChange={(e) => handleSliderChange(slider.id, parseInt(e.target.value))}
                className={`w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer ${slider.color}`}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="w-px h-16 bg-slate-200 hidden md:block"></div>
      
      <div className="flex flex-wrap justify-center gap-3">
        {scenarios.map((scenario, idx) => (
          <button 
            key={idx}
            onClick={() => applyScenario(scenario.label, scenario.values)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeScenario === scenario.label 
              ? 'bg-primary-blue text-white shadow-lg shadow-primary-blue/30 ring-2 ring-primary-blue ring-offset-2' 
              : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-blue hover:text-primary-blue hover:bg-slate-50'
            }`}
          >
            {scenario.label}
          </button>
        ))}
        <button 
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeScenario === "Personalizado" 
              ? 'bg-primary-blue text-white shadow-lg shadow-primary-blue/30 ring-2 ring-primary-blue ring-offset-2' 
              : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-blue hover:text-primary-blue hover:bg-slate-50'
            }`}
          >
            Personalizado
        </button>
      </div>
    </div>
  );
}
