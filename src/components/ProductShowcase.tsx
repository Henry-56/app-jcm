"use client";

import React from 'react';
import { Package, ShieldCheck, Droplets, Ruler, Info } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Nueces de Nogal Premium",
    variety: "Chandler",
    origin: "Valle del Mantaro, Junín",
    description: "Nueces de cáscara delgada, color claro y sabor suave. Procesadas bajo estándares internacionales de calidad.",
    image: "/walnuts.png",
    specs: [
      { label: "Humedad", value: "< 5%" },
      { label: "Calibre", value: "32-34mm" },
      { label: "Color", value: "Extra Light" },
      { label: "Empaque", value: "Cajas de 10kg" }
    ]
  },
  {
    id: 2,
    name: "Aguaymanto Deshidratado",
    variety: "Golden Berry",
    origin: "Selva Central, Junín",
    description: "Superfood peruano deshidratado a baja temperatura para preservar sus propiedades nutricionales y su característico sabor agridulce.",
    image: "/aguaymanto.png",
    specs: [
      { label: "Humedad", value: "12-15%" },
      { label: "Pureza", value: "99.9%" },
      { label: "Certificación", value: "Orgánica" },
      { label: "Empaque", value: "Bolsas Doypack" }
    ]
  }
];

export default function ProductShowcase() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Catálogo Técnico de Exportación</h2>
          <p className="text-slate-500 text-sm">Productos de alta calidad listos para mercados internacionales</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-primary-green/10 text-primary-green text-xs font-bold rounded-full border border-primary-green/20 uppercase tracking-wider">
            Calidad Exportación
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-xs font-bold rounded-full border border-amber-500/20 uppercase tracking-wider">
            Cosecha 2026
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 group hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/5 relative h-64 lg:h-auto overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <div className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-sm text-[10px] font-bold text-slate-700 uppercase">
                    {product.variety}
                  </div>
                </div>
              </div>
              
              <div className="lg:w-3/5 p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{product.name}</h3>
                  <div className="flex items-center text-xs text-slate-400">
                    <Package className="w-3 h-3 mr-1" />
                    {product.origin}
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold mb-0.5">{spec.label}</p>
                      <p className="text-sm font-bold text-slate-700">{spec.value}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center">
                        <ShieldCheck className="w-3 h-3 text-primary-green" />
                      </div>
                    ))}
                    <div className="w-7 h-7 rounded-full bg-primary-blue border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">
                      +
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 text-xs font-bold text-primary-blue hover:underline">
                    <Info className="w-4 h-4" />
                    <span>Ver Ficha Técnica Completa</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certification Badge Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
            <ShieldCheck className="w-8 h-8 text-primary-green" />
          </div>
          <div>
            <h4 className="text-lg font-bold">Garantía de Inocuidad</h4>
            <p className="text-white/60 text-sm max-w-md">Todos nuestros productos cuentan con trazabilidad completa y certificaciones HACCP, SENASA y GlobalG.A.P.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-white text-slate-900 rounded-2xl font-bold text-sm cursor-pointer hover:bg-slate-100 transition-colors">
            Solicitar Muestra
          </div>
          <div className="px-6 py-3 bg-white/10 text-white border border-white/20 rounded-2xl font-bold text-sm cursor-pointer hover:bg-white/20 transition-colors">
            Contactar Especialista
          </div>
        </div>
      </div>
    </div>
  );
}
