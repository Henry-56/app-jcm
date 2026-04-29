"use client";

import React from 'react';
import { Newspaper, TrendingUp, TrendingDown, AlertCircle, Globe } from 'lucide-react';

const news = [
  {
    id: 1,
    title: "Demanda de Pecanas en Alemania sube un 15%",
    source: "Bloomberg Agri",
    time: "Hace 2h",
    type: "positive",
    summary: "Nuevas tendencias de consumo saludable en Europa central impulsan la importación de frutos secos peruanos."
  },
  {
    id: 2,
    title: "Congestión en Canal de Panamá afecta rutas",
    source: "Maritime News",
    time: "Hace 5h",
    type: "warning",
    summary: "Tiempos de espera para buques portacontenedores aumentan a 4 días. Se recomienda revisar cronogramas."
  },
  {
    id: 3,
    title: "Nuevo TLC con Indonesia abre oportunidades",
    source: "MINCETUR",
    time: "Ayer",
    type: "positive",
    summary: "Se eliminan aranceles para el aguaymanto deshidratado y otros superfoods de la sierra central."
  }
];

export default function MarketNews() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-800 flex items-center">
          <Newspaper className="w-4 h-4 mr-2 text-primary-blue" />
          Market Intelligence
        </h3>
        <Globe className="w-4 h-4 text-slate-300" />
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {news.map((item) => (
          <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors group cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                item.type === 'positive' ? 'bg-emerald-100 text-emerald-700' : 
                item.type === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {item.type}
              </span>
              <span className="text-[10px] text-slate-400">{item.time}</span>
            </div>
            <h4 className="text-sm font-bold text-slate-800 mb-1 group-hover:text-primary-blue transition-colors leading-tight">
              {item.title}
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
              {item.summary}
            </p>
            <div className="mt-2 flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <span>{item.source}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
        Ver Todas las Noticias
      </button>
    </div>
  );
}
