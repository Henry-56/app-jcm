"use client";

import React, { useMemo } from 'react';
import { Globe, Award, BarChart, Calendar, RefreshCcw } from 'lucide-react';
import { CountryData } from '@/app/page';

interface KPICardsProps {
  rankingData: (CountryData & { score: number })[];
}

export default function KPICards({ rankingData }: KPICardsProps) {
  const kpis = useMemo(() => {
    const total = rankingData.length;
    const bestCountry = rankingData.length > 0 ? rankingData[0] : null;
    const avgScore = rankingData.length > 0 
      ? rankingData.reduce((acc, curr) => acc + curr.score, 0) / total 
      : 0;

    return [
      { label: "Países Analizados", value: total.toString(), icon: Globe, color: "text-blue-600", bg: "bg-blue-100" },
      { label: "Mejor Score", value: bestCountry ? bestCountry.score.toFixed(2) : "0.00", subValue: bestCountry?.name, icon: Award, color: "text-emerald-600", bg: "bg-emerald-100" },
      { label: "Promedio General", value: avgScore.toFixed(2), icon: BarChart, color: "text-amber-600", bg: "bg-amber-100" },
      { label: "Escenario Actual", value: "Personalizado", icon: Calendar, color: "text-purple-600", bg: "bg-purple-100" },
      { label: "Última Actualización", value: "Ahora", icon: RefreshCcw, color: "text-slate-600", bg: "bg-slate-100" },
    ];
  }, [rankingData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {kpis.map((kpi, index) => (
        <div key={index} className="dashboard-card p-5 hover:scale-[1.02] transition-transform cursor-default">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-2.5 rounded-xl ${kpi.bg}`}>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
          </div>
          <div>
            <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{kpi.label}</h4>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-slate-900">{kpi.value}</span>
              {kpi.subValue && <span className="text-xs font-semibold text-emerald-600 truncate max-w-[100px]">{kpi.subValue}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
