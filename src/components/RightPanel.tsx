"use client";

import React, { useState } from 'react';
import { ChevronRight, ExternalLink, Info, TrendingUp, TrendingDown, Minus, X } from 'lucide-react';
import { CountryData } from '@/app/page';

interface RightPanelProps {
  rankingData: (CountryData & { rank: number, trend: string, score: number, level: string })[];
  selectedCountry: CountryData & { rank: number, trend: string, score: number, level: string };
  setSelectedCountryId: (id: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function RightPanel({ rankingData, selectedCountry, setSelectedCountryId, setActiveTab }: RightPanelProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6 flex flex-col h-full relative">
      {/* Ranking Section */}
      <div className="dashboard-card flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800 flex items-center">
            Top 10 Mercados
            <span className="ml-2 px-2 py-0.5 bg-primary-blue/10 text-primary-blue text-[10px] rounded-full">Actualizado</span>
          </h3>
          <button 
            onClick={() => setActiveTab("Ranking de Países")}
            className="text-primary-blue text-xs font-bold hover:underline"
          >
            Ver todos
          </button>
        </div>
        
        <div className="overflow-y-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-slate-400 uppercase tracking-wider sticky top-0 bg-white z-10 border-b border-slate-50">
              <tr>
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">País</th>
                <th className="px-4 py-3 font-semibold text-right">Score</th>
                <th className="px-4 py-3 font-semibold text-center">Nivel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {rankingData.slice(0, 10).map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => setSelectedCountryId(item.id)}
                  className={`hover:bg-slate-50/80 transition-colors group cursor-pointer ${selectedCountry.id === item.id ? 'bg-primary-blue/5' : ''}`}
                >
                  <td className="px-4 py-3.5 font-medium text-slate-400">
                    <div className="flex items-center space-x-1">
                      <span>{item.rank}</span>
                      {item.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-500" />}
                      {item.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-500" />}
                      {item.trend === 'same' && <Minus className="w-3 h-3 text-slate-400" />}
                    </div>
                  </td>
                  <td className={`px-4 py-3.5 font-bold transition-colors ${selectedCountry.id === item.id ? 'text-primary-blue' : 'text-slate-700 group-hover:text-primary-blue'}`}>
                    {item.name}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono font-bold text-slate-900">{item.score.toFixed(2)}</td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                      item.level === "Alto" ? 'bg-emerald-100 text-emerald-700' : 
                      item.level === "Medio" ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Detail Section */}
      <div className="dashboard-card p-5 bg-gradient-to-br from-white to-slate-50">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-6 bg-blue-900 rounded-sm flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
              {selectedCountry.id.substring(0, 2)}
            </div>
            <h3 className="font-bold text-slate-900 text-lg">{selectedCountry.name}</h3>
          </div>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
            selectedCountry.level === "Alto" ? 'bg-emerald-100 text-emerald-700' : 
            selectedCountry.level === "Medio" ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
          }`}>
            {selectedCountry.trend === 'up' && <TrendingUp className="w-3 h-3" />}
            {selectedCountry.trend === 'down' && <TrendingDown className="w-3 h-3" />}
            {selectedCountry.trend === 'same' && <Minus className="w-3 h-3" />}
            <span className="text-xs font-bold">{selectedCountry.score.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {[
            { label: "Demanda", value: selectedCountry.demand, color: "bg-primary-blue" },
            { label: "Precio", value: selectedCountry.price, color: "bg-emerald-500" },
            { label: "Costo Logístico", value: selectedCountry.logistics, color: "bg-amber-500" },
            { label: "Aranceles", value: selectedCountry.tariffs, color: "bg-purple-500" },
            { label: "Competencia", value: selectedCountry.competition, color: "bg-indigo-500" },
            { label: "Riesgo País", value: selectedCountry.risk, color: "bg-red-500" },
          ].map((stat, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-500">{stat.label}</span>
                <span className="text-slate-900">{stat.value}%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`${stat.color} h-full transition-all duration-500`} 
                  style={{ width: `${stat.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="w-full mt-6 bg-slate-900 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center space-x-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95"
        >
          <span>Ver ficha completa</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Simulated Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="font-bold text-lg text-slate-800">Ficha Técnica: {selectedCountry.name}</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-12 bg-blue-900 rounded-md flex items-center justify-center text-white font-bold text-xl">
                  {selectedCountry.id.substring(0, 2)}
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Score AHP Total</p>
                  <p className="text-3xl font-bold text-slate-900">{selectedCountry.score.toFixed(2)}</p>
                </div>
              </div>
              
              <p className="text-sm text-slate-600 mb-6">
                Esta es una vista previa de la ficha técnica. En la versión final, aquí se mostrarán gráficos de tendencia de importaciones, barreras no arancelarias específicas y contactos comerciales para <strong>{selectedCountry.name}</strong>.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500 font-semibold mb-1">Volumen Importado</p>
                  <p className="text-lg font-bold text-slate-800">$1.2M USD</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500 font-semibold mb-1">Crecimiento Anual</p>
                  <p className="text-lg font-bold text-emerald-600">+14.5%</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
