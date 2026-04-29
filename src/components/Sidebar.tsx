"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Settings2, 
  FileText, 
  Layers,
  ChevronDown,
  MapPin
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Layers, label: "Catálogo de Productos" },
  { icon: BarChart3, label: "Ranking de Países" },
  { icon: Settings2, label: "Costos e Incoterms" },
  { icon: MapPin, label: "Seguimiento" },
  { icon: FileText, label: "Documentación" },
];

const regions = ["Junín", "Lima", "Arequipa"];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeRegion: string;
  setActiveRegion: (region: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab, activeRegion, setActiveRegion }: SidebarProps) {
  const [isRegionMenuOpen, setIsRegionMenuOpen] = useState(false);
  const regionMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (regionMenuRef.current && !regionMenuRef.current.contains(event.target as Node)) {
        setIsRegionMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside className="w-64 sidebar-gradient text-white flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <div className="relative mb-8" ref={regionMenuRef}>
          <button 
            onClick={() => setIsRegionMenuOpen(!isRegionMenuOpen)}
            className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors border border-white/20"
          >
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm shrink-0">
                <MapPin className="text-white w-4 h-4" />
              </div>
              <div className="text-left truncate">
                <p className="text-[10px] text-white/60 font-semibold uppercase tracking-wider leading-none mb-1">Región Origen</p>
                <p className="text-sm font-bold tracking-tight leading-none truncate">{activeRegion}</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${isRegionMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isRegionMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 rounded-xl border border-white/10 shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => {
                    setActiveRegion(region);
                    setIsRegionMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors hover:bg-white/10 flex items-center justify-between ${
                    activeRegion === region ? 'bg-white/10 text-white' : 'text-white/70'
                  }`}
                >
                  {region}
                  {activeRegion === region && <div className="w-1.5 h-1.5 rounded-full bg-primary-green"></div>}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            const isActive = item.label === activeTab;
            return (
              <button
                key={index}
                onClick={() => setActiveTab(item.label)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                  ? 'bg-white/15 text-white font-medium border border-white/10' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-6">
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/5">
          <p className="text-sm text-white/60 mb-2">Plan Actual</p>
          <p className="font-semibold text-white">Premium Business</p>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary-green w-3/4 h-full"></div>
          </div>
        </div>
      </div>
    </aside>
  );
}
