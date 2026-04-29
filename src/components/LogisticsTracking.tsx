"use client";

import React, { useState, useEffect } from 'react';
import { Ship, Package, Anchor, CheckCircle2, Clock, MapPin, Search } from 'lucide-react';

interface LogisticsTrackingProps {
  selectedCountry: any;
}

const steps = [
  { id: 1, label: "Procesamiento en Planta", status: "completed", date: "24 Abr, 2026", description: "Selección, limpieza y empaque final en Junín." },
  { id: 2, label: "Salida de Almacén", status: "completed", date: "25 Abr, 2026", description: "Despacho hacia Terminal Portuario Callao." },
  { id: 3, label: "Aduanas e Inspección", status: "completed", date: "26 Abr, 2026", description: "Control SENASA y validación de aduanas completado." },
  { id: 4, label: "Carga en Buque", status: "active", date: "28 Abr, 2026", description: "Buque 'MSC AGUILA' - Contenedor refrigerado 40' HR." },
  { id: 5, label: "Tránsito Marítimo", status: "upcoming", date: "15 May, 2026 (Est.)", description: "Navegando hacia el puerto de destino." },
  { id: 6, label: "Llegada a Puerto", status: "upcoming", date: "16 May, 2026 (Est.)", description: "Descarga y nacionalización en destino." }
];

export default function LogisticsTracking({ selectedCountry }: LogisticsTrackingProps) {
  const [activeStep, setActiveStep] = useState(4);
  const [trackingNumber, setTrackingNumber] = useState("PE-EXP-2026-94821");

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Seguimiento de Exportación</h2>
          <p className="text-slate-500 text-sm">Monitoreo en tiempo real de tu carga hacia {selectedCountry?.name || "Destino"}</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="pl-10 pr-4 py-2 text-sm font-medium focus:outline-none w-64"
              placeholder="Número de Tracking..."
            />
          </div>
          <button className="px-4 py-2 bg-primary-blue text-white rounded-xl text-sm font-bold hover:bg-primary-blue/90 transition-colors">
            Rastrear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Tracking Timeline */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-slate-100"></div>

            <div className="space-y-8 relative">
              {steps.map((step) => (
                <div key={step.id} className="flex group">
                  <div className="relative z-10 flex items-center justify-center">
                    {step.status === "completed" ? (
                      <div className="w-14 h-14 bg-primary-green/10 rounded-2xl flex items-center justify-center border-2 border-primary-green">
                        <CheckCircle2 className="w-6 h-6 text-primary-green" />
                      </div>
                    ) : step.status === "active" ? (
                      <div className="w-14 h-14 bg-primary-blue rounded-2xl flex items-center justify-center border-2 border-primary-blue shadow-lg shadow-primary-blue/30 animate-pulse">
                        <Ship className="w-6 h-6 text-white" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-slate-100">
                        <Clock className="w-6 h-6 text-slate-300" />
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-6 flex-1 bg-slate-50 group-hover:bg-slate-100 transition-colors p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-bold ${step.status === "active" ? "text-primary-blue" : "text-slate-800"}`}>
                        {step.label}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{step.date}</span>
                    </div>
                    <p className="text-sm text-slate-500 leading-tight">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shipment Details Card */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 text-white overflow-hidden relative">
             {/* Abstract background map element */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-10">
              <Ship className="w-64 h-64 rotate-12" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest">En Tránsito</span>
                <Anchor className="w-5 h-5 text-primary-green" />
              </div>

              <div>
                <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-1">Carga Actual</p>
                <h4 className="text-xl font-bold">20 Toneladas de Pecanas</h4>
                <p className="text-white/70 text-sm">Contenedor: MEDU 839482-1</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-1">Puerto Origen</p>
                  <p className="text-sm font-bold">Callao, Perú</p>
                </div>
                <div>
                  <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-1">Puerto Destino</p>
                  <p className="text-sm font-bold">{selectedCountry?.name || "N/A"}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-2">Ubicación Actual</p>
                <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-2xl">
                  <MapPin className="w-5 h-5 text-primary-blue" />
                  <div>
                    <p className="text-xs font-bold">Costa de Panamá</p>
                    <p className="text-[10px] text-white/40">Velocidad: 18 Nudos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-800">Alertas de Envío</h4>
            <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-2xl border border-amber-100">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-xs text-amber-800 leading-tight">
                <strong>Demora estimada:</strong> Tránsito en Canal de Panamá presenta congestión leve (+12h).
              </p>
            </div>
            <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-sm font-bold transition-colors">
              Descargar Reporte Logístico
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
