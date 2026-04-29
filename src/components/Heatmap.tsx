"use client";

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const data = [
  { region: 'Norteamérica', value: 85 },
  { region: 'Europa Occ.', value: 92 },
  { region: 'Asia Oriental', value: 78 },
  { region: 'Sudamérica', value: 65 },
  { region: 'Oceanía', value: 72 },
  { region: 'Europa Este', value: 68 },
];

export default function Heatmap() {
  return (
    <div className="dashboard-card p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 text-sm">Rentabilidad Global</h3>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Regiones</span>
      </div>
      
      <div className="flex-1 min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" hide />
            <YAxis 
              dataKey="region" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }}
              width={80}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.value > 80 ? '#10b981' : entry.value > 70 ? '#3b82f6' : '#94a3b8'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span className="text-[10px] font-bold text-slate-500">Alta</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-[10px] font-bold text-slate-500">Media</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
          <span className="text-[10px] font-bold text-slate-500">Base</span>
        </div>
      </div>
    </div>
  );
}
