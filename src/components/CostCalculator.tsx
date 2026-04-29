"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, TrendingUp, Info, DollarSign, PieChart as PieChartIcon } from 'lucide-react';

interface CostCalculatorProps {
  selectedCountry: any;
}

export default function CostCalculator({ selectedCountry }: CostCalculatorProps) {
  const [quantity, setQuantity] = useState(10000); // 10,000 kg
  const [incoterm, setIncoterm] = useState("CIF");

  // Simulated costs per kg
  const costs = useMemo(() => {
    const baseProductCost = 4.5; // $4.50 per kg
    const processingJunin = 0.8;
    const inlandTransport = 0.3;
    const portHandling = 0.15;
    const oceanFreight = 0.45;
    const insurance = 0.05;
    
    const exWorks = (baseProductCost + processingJunin) * quantity;
    const fob = exWorks + (inlandTransport + portHandling) * quantity;
    const cif = fob + (oceanFreight + insurance) * quantity;
    
    return {
      exWorks,
      fob,
      cif,
      perKg: cif / quantity
    };
  }, [quantity]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Simulador de Costos e Incoterms</h2>
        <p className="text-slate-500 text-sm">Calcula la rentabilidad de tu exportación a {selectedCountry?.name || "Destino"}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Configuration Sliders */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-700">Cantidad (kg)</label>
                <span className="text-primary-blue font-bold">{quantity.toLocaleString()} kg</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="50000" 
                step="1000"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-blue"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span>1k</span>
                <span>25k</span>
                <span>50k</span>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700">Incoterm Seleccionado</label>
              <div className="grid grid-cols-3 gap-2">
                {["EXW", "FOB", "CIF"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setIncoterm(term)}
                    className={`py-3 rounded-2xl text-xs font-bold transition-all border ${
                      incoterm === term 
                      ? "bg-primary-blue text-white border-primary-blue shadow-lg shadow-primary-blue/20" 
                      : "bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100"
                    }`}
                  >
                    {term}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 italic">
                {incoterm === "CIF" ? "* Incluye Costo, Seguro y Flete hasta puerto destino." : 
                 incoterm === "FOB" ? "* Incluye gastos hasta que la mercancía está a bordo del buque." : 
                 "* Mercancía disponible en planta del vendedor."}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
               <div className="flex items-center space-x-3 text-slate-600 bg-slate-50 p-4 rounded-2xl">
                 <Calculator className="w-5 h-5 text-primary-blue" />
                 <div>
                   <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Precio Sugerido Venta</p>
                   <p className="text-lg font-bold text-slate-800">${(costs.perKg * 1.3).toFixed(2)} / kg</p>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right: Cost Breakdown Visualization */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">EXW</span>
              </div>
              <h4 className="text-2xl font-bold text-slate-800">${costs.exWorks.toLocaleString()}</h4>
              <p className="text-xs text-slate-500 mt-1">Costo en Origen (Junín)</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">FOB</span>
              </div>
              <h4 className="text-2xl font-bold text-slate-800">${costs.fob.toLocaleString()}</h4>
              <p className="text-xs text-slate-500 mt-1">Free On Board (Callao)</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm ring-2 ring-primary-blue ring-offset-2">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <PieChartIcon className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">CIF</span>
              </div>
              <h4 className="text-2xl font-bold text-slate-800">${costs.cif.toLocaleString()}</h4>
              <p className="text-xs text-slate-500 mt-1">Costo Final en Destino</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
              <Info className="w-5 h-5 mr-2 text-primary-blue" />
              Desglose Detallado de Gastos
            </h4>

            <div className="space-y-4">
              {[
                { label: "Materia Prima y Procesamiento", value: 5.30, pct: 75, color: "bg-emerald-500" },
                { label: "Logística Interna y Aduanas", value: 0.45, pct: 10, color: "bg-blue-500" },
                { label: "Flete Internacional", value: 0.45, pct: 12, color: "bg-indigo-500" },
                { label: "Seguro y Otros", value: 0.05, pct: 3, color: "bg-slate-400" },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{item.label}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-slate-400 text-xs">${item.value.toFixed(2)} / kg</span>
                      <span className="font-bold text-slate-800">${(item.value * quantity).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full`} style={{ width: `${item.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-800">Rentabilidad Estimada</p>
                <p className="text-xs text-slate-500">Basado en precios de mercado en {selectedCountry?.name}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary-green">+24.5%</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold">ROI Estimado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
