"use client";

import React, { useState, useMemo } from 'react';
import { Ship, Plane, CheckCircle2, Clock, MapPin, ArrowRight, Anchor, Package, Truck, FileText } from 'lucide-react';
import { CountryData } from '@/app/page';

type Transport = "maritime" | "air";
type Step = 1 | 2 | 3 | 4;

interface Product {
  id: string;
  name: string;
  emoji: string;
  category: string;
  description: string;
}

interface ExportSimulatorProps {
  rankingData: (CountryData & { score: number; level: string; rank: number; trend: string })[];
}

interface TimelineStep {
  id: number;
  label: string;
  date: string;
  description: string;
  status: "active" | "upcoming";
}

const PRODUCTS: Product[] = [
  { id: "pecanas", name: "Pecanas", emoji: "🌰", category: "Frutos Secos", description: "Nueces de alta calidad, ricas en omega-3" },
  { id: "quinua", name: "Quinua Orgánica", emoji: "🌿", category: "Granos Andinos", description: "Superalimento andino certificado" },
  { id: "cafe", name: "Café Orgánico", emoji: "☕", category: "Bebidas", description: "Café de especialidad de altura" },
  { id: "esparragos", name: "Espárragos", emoji: "🌱", category: "Hortalizas", description: "Espárragos premium de exportación" },
  { id: "paprika", name: "Paprika", emoji: "🌶️", category: "Condimentos", description: "Pimiento rojo deshidratado" },
  { id: "cacao", name: "Cacao Fino", emoji: "🫘", category: "Commodities", description: "Cacao de aroma premiado" },
  { id: "arandanos", name: "Arándanos", emoji: "🫐", category: "Berries", description: "Arándanos frescos, alto BRIX" },
  { id: "alpaca", name: "Textiles Alpaca", emoji: "🧶", category: "Textiles", description: "Fibra fina para alta costura" },
  { id: "pisco", name: "Pisco Peruano", emoji: "🍶", category: "Destilados", description: "Destilado de uva, denominación de origen" },
  { id: "palta", name: "Palta Hass", emoji: "🥑", category: "Frutas", description: "Palta premium mercado gourmet" },
];

const COUNTRY_REGION: Record<string, string> = {
  DEU: "europa", ESP: "europa", FRA: "europa", ITA: "europa", NLD: "europa", GBR: "europa",
  USA: "norteamerica", CAN: "norteamerica",
  CHN: "asia", JPN: "asia", KOR: "asia",
  MEX: "latam", BRA: "latam", CHL: "latam", BOL: "latam",
};

const TRANSIT_DAYS: Record<string, { maritime: [number, number]; air: [number, number] }> = {
  europa: { maritime: [22, 28], air: [2, 3] },
  norteamerica: { maritime: [12, 18], air: [1, 2] },
  asia: { maritime: [28, 35], air: [3, 4] },
  latam: { maritime: [5, 10], air: [1, 2] },
};

const DESTINATION_PORTS: Record<string, { maritime: string; air: string }> = {
  DEU: { maritime: "Puerto de Hamburgo", air: "Aeropuerto de Frankfurt (FRA)" },
  USA: { maritime: "Puerto de Los Ángeles", air: "Aeropuerto JFK / LAX" },
  ESP: { maritime: "Puerto de Valencia", air: "Aeropuerto de Madrid Barajas (MAD)" },
  NLD: { maritime: "Puerto de Rotterdam", air: "Aeropuerto Ámsterdam Schiphol (AMS)" },
  FRA: { maritime: "Puerto de El Havre", air: "Aeropuerto Charles de Gaulle (CDG)" },
  GBR: { maritime: "Puerto de Felixstowe", air: "Aeropuerto de Heathrow (LHR)" },
  CAN: { maritime: "Puerto de Vancouver", air: "Aeropuerto de Toronto Pearson (YYZ)" },
  ITA: { maritime: "Puerto de Génova", air: "Aeropuerto de Milán Malpensa (MXP)" },
  MEX: { maritime: "Puerto de Veracruz", air: "Aeropuerto de Ciudad de México (MEX)" },
  BRA: { maritime: "Puerto de Santos", air: "Aeropuerto São Paulo Guarulhos (GRU)" },
  CHN: { maritime: "Puerto de Shanghái", air: "Aeropuerto Shanghái Pudong (PVG)" },
  JPN: { maritime: "Puerto de Yokohama", air: "Aeropuerto de Tokyo Narita (NRT)" },
  KOR: { maritime: "Puerto de Busan", air: "Aeropuerto de Incheon (ICN)" },
  CHL: { maritime: "Puerto de San Antonio", air: "Aeropuerto de Santiago (SCL)" },
  BOL: { maritime: "Terminal Seco de Desaguadero", air: "Aeropuerto de La Paz (LPB)" },
};

const COUNTRY_FLAGS: Record<string, string> = {
  DEU: "🇩🇪", USA: "🇺🇸", ESP: "🇪🇸", NLD: "🇳🇱", FRA: "🇫🇷", GBR: "🇬🇧",
  CAN: "🇨🇦", ITA: "🇮🇹", MEX: "🇲🇽", BRA: "🇧🇷", CHN: "🇨🇳", JPN: "🇯🇵",
  KOR: "🇰🇷", CHL: "🇨🇱", BOL: "🇧🇴",
};

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function fmtDate(date: Date): string {
  return date.toLocaleDateString("es-PE", { day: "numeric", month: "short", year: "numeric" });
}

// ─── Step Indicator ──────────────────────────────────────────────────────────

function StepIndicator({ currentStep }: { currentStep: Step }) {
  const steps = [
    { num: 1 as Step, label: "Producto" },
    { num: 2 as Step, label: "Destino" },
    { num: 3 as Step, label: "Transporte" },
    { num: 4 as Step, label: "Seguimiento" },
  ];
  return (
    <div className="flex items-center bg-white rounded-3xl p-4 border border-slate-200 shadow-sm">
      {steps.map((s, i) => (
        <React.Fragment key={s.num}>
          <div className="flex items-center space-x-2">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all ${
              currentStep === s.num ? "bg-primary-blue text-white shadow-lg shadow-primary-blue/30"
              : currentStep > s.num ? "bg-primary-green text-white"
              : "bg-slate-100 text-slate-400"
            }`}>
              {currentStep > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
            </div>
            <span className={`text-sm font-bold hidden sm:block ${
              currentStep === s.num ? "text-primary-blue"
              : currentStep > s.num ? "text-primary-green"
              : "text-slate-400"
            }`}>{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-3 transition-all ${currentStep > s.num ? "bg-primary-green" : "bg-slate-100"}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Step 1: Producto ─────────────────────────────────────────────────────────

function Step1Products({ selected, onSelect }: { selected: Product | null; onSelect: (p: Product) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-800">¿Qué producto deseas exportar?</h3>
        <p className="text-sm text-slate-500">Selecciona el producto de exportación de tu región</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {PRODUCTS.map(product => (
          <button
            key={product.id}
            onClick={() => onSelect(product)}
            className={`p-4 rounded-3xl border-2 text-left transition-all hover:shadow-md ${
              selected?.id === product.id
                ? "border-primary-blue bg-blue-50 shadow-lg shadow-blue-100"
                : "border-slate-100 bg-white hover:border-slate-200"
            }`}
          >
            <span className="text-3xl">{product.emoji}</span>
            <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wide">{product.category}</p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">{product.name}</p>
            <p className="text-xs text-slate-500 mt-1 leading-tight">{product.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Step 2: Destino ──────────────────────────────────────────────────────────

function Step2Country({
  rankingData, selectedId, onSelect,
}: {
  rankingData: ExportSimulatorProps["rankingData"];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const country = rankingData.find(c => c.id === selectedId);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-800">¿A qué país deseas exportar?</h3>
        <p className="text-sm text-slate-500">Elige el mercado de destino para tu exportación</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-2 max-h-96 overflow-y-auto pr-1">
          {rankingData.map(c => (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                selectedId === c.id ? "border-primary-blue bg-blue-50" : "border-slate-100 bg-white hover:border-slate-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{COUNTRY_FLAGS[c.id] || "🌍"}</span>
                <div>
                  <p className="text-sm font-bold text-slate-800">#{c.rank} {c.name}</p>
                  <p className="text-xs text-slate-500">{c.currency} · Score {(c.score * 100).toFixed(0)}%</p>
                </div>
              </div>
              {selectedId === c.id && <CheckCircle2 className="w-4 h-4 text-primary-blue shrink-0" />}
            </button>
          ))}
        </div>

        {country ? (
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-5xl">{COUNTRY_FLAGS[country.id] || "🌍"}</span>
                <div>
                  <h4 className="text-xl font-bold text-slate-800">{country.name}</h4>
                  <p className="text-sm text-slate-500">Moneda: {country.currency === "EUR" ? "Euro (€)" : "Dólar (US$)"}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                country.level === "Alto" ? "bg-emerald-100 text-emerald-700"
                : country.level === "Medio" ? "bg-amber-100 text-amber-700"
                : "bg-red-100 text-red-700"
              }`}>{country.level}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Demanda", value: country.demand },
                { label: "Precio Mercado", value: country.price },
                { label: "Logística", value: country.logistics },
                { label: "Aranceles", value: country.tariffs },
                { label: "Competencia", value: 100 - country.competition },
                { label: "Riesgo País", value: country.risk },
              ].map(m => (
                <div key={m.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">{m.label}</span>
                    <span className="font-bold text-slate-700">{m.value}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${m.value >= 80 ? "bg-emerald-500" : m.value >= 60 ? "bg-amber-500" : "bg-red-400"}`}
                      style={{ width: `${m.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Contacto del Importador</p>
              <p className="text-sm font-bold text-slate-800">{country.contact.name}</p>
              <p className="text-xs text-slate-500 mb-1">{country.contact.company}</p>
              <p className="text-xs text-slate-500">✉️ {country.contact.email}</p>
              <p className="text-xs text-slate-500">📱 {country.contact.phone}</p>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center min-h-64">
            <div className="text-center text-slate-400">
              <span className="text-5xl block mb-3">🌍</span>
              <p className="font-bold">Selecciona un país</p>
              <p className="text-sm">para ver su ficha completa</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Step 3: Transporte ───────────────────────────────────────────────────────

function Step3Transport({
  transport, onSelect, transitInfo,
}: {
  transport: Transport | null;
  onSelect: (t: Transport) => void;
  transitInfo: { maritime: [number, number]; air: [number, number] } | null;
}) {
  const options = [
    {
      id: "maritime" as Transport,
      Icon: Ship,
      label: "Marítimo",
      subtitle: "Puerto del Callao → Puerto Destino",
      days: transitInfo?.maritime,
      cost: "$0.45/kg",
      color: { ring: "border-blue-500", bg: "bg-blue-50", icon: "bg-blue-100", iconText: "text-blue-600", text: "text-blue-500" },
      pros: ["Ideal para grandes volúmenes", "Costo de flete reducido", "Contenedores refrigerados 40' HR"],
      cons: ["Mayor tiempo de tránsito", "Sujeto a congestión portuaria"],
    },
    {
      id: "air" as Transport,
      Icon: Plane,
      label: "Aéreo",
      subtitle: "Aeropuerto Jorge Chávez → Aeropuerto Destino",
      days: transitInfo?.air,
      cost: "$2.80/kg",
      color: { ring: "border-purple-500", bg: "bg-purple-50", icon: "bg-purple-100", iconText: "text-purple-600", text: "text-purple-500" },
      pros: ["Llegada en días hábiles", "Ideal para perecederos", "Menor riesgo de daño"],
      cons: ["Costo de flete elevado", "Limitaciones de peso/volumen"],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-800">Selecciona el medio de transporte</h3>
        <p className="text-sm text-slate-500">Compara opciones según el tipo de producto y urgencia</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`p-6 rounded-3xl border-2 text-left transition-all hover:shadow-md ${
              transport === opt.id ? `${opt.color.ring} ${opt.color.bg} shadow-lg` : "border-slate-100 bg-white"
            }`}
          >
            <div className="flex items-start justify-between mb-5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${opt.color.icon}`}>
                <opt.Icon className={`w-7 h-7 ${opt.color.iconText}`} />
              </div>
              {transport === opt.id && <CheckCircle2 className={`w-6 h-6 ${opt.color.text}`} />}
            </div>

            <h4 className="text-xl font-bold text-slate-800 mb-1">{opt.label}</h4>
            <p className="text-xs text-slate-500 mb-5">{opt.subtitle}</p>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white rounded-2xl p-3 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Tiempo Estimado</p>
                <p className="text-lg font-bold text-slate-800">
                  {opt.days ? `${opt.days[0]}-${opt.days[1]} días` : "Calculando..."}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-3 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Flete Aprox.</p>
                <p className="text-lg font-bold text-slate-800">{opt.cost}</p>
              </div>
            </div>

            <div className="space-y-1.5">
              {opt.pros.map((p, i) => (
                <p key={i} className="text-xs text-slate-600 flex items-center space-x-2">
                  <span className="text-emerald-500 font-bold">✓</span><span>{p}</span>
                </p>
              ))}
              {opt.cons.map((c, i) => (
                <p key={i} className="text-xs text-slate-400 flex items-center space-x-2">
                  <span className="font-bold">–</span><span>{c}</span>
                </p>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Step 4: Seguimiento ──────────────────────────────────────────────────────

function Step4Tracking({
  timeline, selectedProduct, selectedCountry, transport, totalDays, selectedCountryId,
}: {
  timeline: TimelineStep[];
  selectedProduct: Product | null;
  selectedCountry: ExportSimulatorProps["rankingData"][number] | null;
  transport: Transport | null;
  totalDays: { min: number; max: number } | null;
  selectedCountryId: string | null;
}) {
  const TransportIcon = transport === "maritime" ? Ship : Plane;
  const originPort = transport === "maritime" ? "Puerto del Callao, Lima" : "Aeropuerto Jorge Chávez, Lima";
  const destPort = selectedCountryId
    ? (transport === "maritime"
      ? DESTINATION_PORTS[selectedCountryId]?.maritime
      : DESTINATION_PORTS[selectedCountryId]?.air)
    : "Puerto de Destino";

  return (
    <div className="space-y-6">
      {/* Summary header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 text-white">
        <div className="flex flex-wrap items-center gap-6 justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{selectedProduct?.emoji}</span>
            <div>
              <p className="text-white/50 text-[10px] uppercase tracking-widest">Producto</p>
              <p className="font-bold text-lg">{selectedProduct?.name}</p>
              <p className="text-white/50 text-xs">{selectedProduct?.category}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-center">
              <p className="text-white/50 text-[10px] uppercase tracking-widest">Origen</p>
              <p className="text-sm font-bold">Perú 🇵🇪</p>
            </div>
            <div className="flex space-x-1 items-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < 2 ? "bg-primary-blue" : "bg-white/20"}`} />
              ))}
              <TransportIcon className="w-5 h-5 text-primary-blue mx-1" />
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
              ))}
            </div>
            <div className="text-center">
              <p className="text-white/50 text-[10px] uppercase tracking-widest">Destino</p>
              <p className="text-sm font-bold">{selectedCountry?.name} {COUNTRY_FLAGS[selectedCountryId || ""] || "🌍"}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/50 text-[10px] uppercase tracking-widest">Tiempo Total Estimado</p>
            <p className="text-2xl font-bold">{totalDays?.min}-{totalDays?.max} días</p>
            <p className="text-white/50 text-xs">{transport === "maritime" ? "Vía Marítima" : "Vía Aérea"}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-800 mb-6">Línea de Tiempo de Exportación</h4>
          <div className="relative">
            <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-slate-100" />
            <div className="space-y-6 relative">
              {timeline.map((s, i) => (
                <div key={s.id} className="flex group">
                  <div className="relative z-10 flex items-start justify-center">
                    {s.status === "active" ? (
                      <div className="w-14 h-14 bg-primary-blue rounded-2xl flex items-center justify-center border-2 border-primary-blue shadow-lg shadow-primary-blue/30 animate-pulse">
                        <TransportIcon className="w-6 h-6 text-white" />
                      </div>
                    ) : i === timeline.length - 1 ? (
                      <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center border-2 border-emerald-200">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-slate-100">
                        <Clock className="w-6 h-6 text-slate-300" />
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1 bg-slate-50 group-hover:bg-slate-100 transition-colors p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-start justify-between mb-1 gap-2">
                      <h5 className={`font-bold text-sm leading-tight ${s.status === "active" ? "text-primary-blue" : "text-slate-800"}`}>
                        {s.label}
                      </h5>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap shrink-0">{s.date}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Details sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 opacity-5">
              <TransportIcon className="w-48 h-48" />
            </div>
            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {transport === "maritime" ? "Vía Marítima" : "Vía Aérea"}
                </span>
                <TransportIcon className="w-5 h-5 text-primary-green" />
              </div>
              <div>
                <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-1">Puerto Origen</p>
                <p className="text-sm font-bold leading-tight">{originPort}</p>
              </div>
              <div>
                <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-1">Puerto / Aeropuerto Destino</p>
                <p className="text-sm font-bold leading-tight">{destPort}</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-2">Llegada Estimada</p>
                <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-2xl">
                  <MapPin className="w-5 h-5 text-primary-blue shrink-0" />
                  <div>
                    <p className="text-sm font-bold">{totalDays?.min}-{totalDays?.max} días desde Lima</p>
                    <p className="text-[10px] text-white/40">Incluyendo trámites en origen y destino</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedCountry && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-800">Contacto en {selectedCountry.name}</h4>
              <div className="space-y-2">
                <p className="text-sm font-bold text-slate-800">{selectedCountry.contact.name}</p>
                <p className="text-xs text-slate-500">{selectedCountry.contact.company}</p>
                <a
                  href={`mailto:${selectedCountry.contact.email}`}
                  className="flex items-center space-x-2 text-xs text-primary-blue hover:underline"
                >
                  <span>✉️</span><span>{selectedCountry.contact.email}</span>
                </a>
                <p className="text-xs text-slate-500">📱 {selectedCountry.contact.phone}</p>
              </div>
              <button className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition-colors">
                Descargar Informe Logístico
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ExportSimulator({ rankingData }: ExportSimulatorProps) {
  const [step, setStep] = useState<Step>(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [transport, setTransport] = useState<Transport | null>(null);

  const selectedCountry = useMemo(
    () => rankingData.find(c => c.id === selectedCountryId) ?? null,
    [rankingData, selectedCountryId],
  );

  const transitInfo = useMemo(() => {
    if (!selectedCountryId) return null;
    const region = COUNTRY_REGION[selectedCountryId] || "norteamerica";
    return TRANSIT_DAYS[region];
  }, [selectedCountryId]);

  const totalDays = useMemo(() => {
    if (!selectedCountryId || !transport) return null;
    const region = COUNTRY_REGION[selectedCountryId] || "norteamerica";
    const [min, max] = TRANSIT_DAYS[region][transport];
    const overhead = transport === "maritime" ? 8 : 4;
    return { min: min + overhead, max: max + overhead };
  }, [selectedCountryId, transport]);

  const timeline = useMemo((): TimelineStep[] => {
    if (!selectedCountryId || !transport) return [];
    const region = COUNTRY_REGION[selectedCountryId] || "norteamerica";
    const [minT, maxT] = TRANSIT_DAYS[region][transport];
    const avg = Math.round((minT + maxT) / 2);
    const today = new Date(2026, 4, 11);
    const pName = selectedProduct?.name || "el producto";
    const destName = selectedCountry?.name || "destino";
    const destPort = transport === "maritime"
      ? DESTINATION_PORTS[selectedCountryId]?.maritime || "puerto de destino"
      : DESTINATION_PORTS[selectedCountryId]?.air || "aeropuerto de destino";

    if (transport === "maritime") {
      return [
        { id: 1, label: "Procesamiento en Planta", date: fmtDate(today), status: "active", description: `Selección, limpieza y empaque de ${pName} según estándares de exportación.` },
        { id: 2, label: "Transporte Interno a Puerto Callao", date: fmtDate(addDays(today, 1)), status: "upcoming", description: "Carga en camión refrigerado hacia el Terminal Portuario del Callao." },
        { id: 3, label: "Trámites Aduaneros y SENASA", date: fmtDate(addDays(today, 2)), status: "upcoming", description: "Control fitosanitario, certificado de origen MINCETUR y despacho aduanero." },
        { id: 4, label: "Carga en Buque", date: fmtDate(addDays(today, 4)), status: "upcoming", description: `Embarque en contenedor refrigerado 40' HR. Destino: ${destName}.` },
        { id: 5, label: `Tránsito Marítimo (${minT}-${maxT} días)`, date: `${fmtDate(addDays(today, 4 + minT))} – ${fmtDate(addDays(today, 4 + maxT))}`, status: "upcoming", description: `Navegación desde Puerto Callao hasta ${destPort}.` },
        { id: 6, label: "Llegada al Puerto de Destino", date: `${fmtDate(addDays(today, 4 + avg))} (Est.)`, status: "upcoming", description: `Arribo a ${destPort} y descarga de contenedor. Inicio de despacho aduanero.` },
        { id: 7, label: "Despacho Aduanero en Destino", date: `${fmtDate(addDays(today, 4 + avg + 2))} (Est.)`, status: "upcoming", description: "Presentación de documentos, pago de aranceles y habilitación de la carga." },
        { id: 8, label: "Entrega al Cliente Final", date: `${fmtDate(addDays(today, 4 + avg + 4))} (Est.)`, status: "upcoming", description: `Entrega al importador en ${destName}. ¡Exportación completada con éxito!` },
      ];
    } else {
      return [
        { id: 1, label: "Procesamiento y Empaque Aéreo Certificado", date: fmtDate(today), status: "active", description: `Empaque especial aéreo para ${pName}. Obtención de certificado SENASA.` },
        { id: 2, label: "Transporte al Aeropuerto Jorge Chávez", date: fmtDate(today), status: "upcoming", description: "Carga en vehículo habilitado hacia el Aeropuerto Internacional Jorge Chávez, Lima." },
        { id: 3, label: "Trámites Aduaneros Aeroportuarios", date: fmtDate(addDays(today, 1)), status: "upcoming", description: "Guía aérea (AWB), declaración de exportación y control de seguridad." },
        { id: 4, label: "Vuelo Internacional", date: fmtDate(addDays(today, 2)), status: "upcoming", description: `Despacho en vuelo de carga hacia ${destName}.` },
        { id: 5, label: `Tránsito Aéreo (${minT}-${maxT} días)`, date: `${fmtDate(addDays(today, 2 + minT))} – ${fmtDate(addDays(today, 2 + maxT))}`, status: "upcoming", description: `Vuelo directo o con escala hacia ${destPort}.` },
        { id: 6, label: "Llegada al Aeropuerto de Destino", date: `${fmtDate(addDays(today, 2 + avg))} (Est.)`, status: "upcoming", description: `Arribo a ${destPort}. Inicio de despacho aduanero express.` },
        { id: 7, label: "Despacho Aduanero Express", date: `${fmtDate(addDays(today, 2 + avg + 1))} (Est.)`, status: "upcoming", description: "Despacho rápido en destino. Máximo 24 horas hábiles." },
        { id: 8, label: "Entrega al Cliente Final", date: `${fmtDate(addDays(today, 2 + avg + 2))} (Est.)`, status: "upcoming", description: `Entrega urgente al importador en ${destName}. ¡Exportación completada!` },
      ];
    }
  }, [selectedCountryId, transport, selectedProduct, selectedCountry]);

  const canProceed: Record<Step, boolean> = {
    1: !!selectedProduct,
    2: !!selectedCountryId,
    3: !!transport,
    4: true,
  };

  const handleReset = () => {
    setStep(1);
    setSelectedProduct(null);
    setSelectedCountryId(null);
    setTransport(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Simulador de Exportación</h2>
        <p className="text-slate-500 text-sm">Planifica y visualiza tu proceso exportador paso a paso desde Perú</p>
      </div>

      <StepIndicator currentStep={step} />

      <div className="min-h-96">
        {step === 1 && (
          <Step1Products selected={selectedProduct} onSelect={setSelectedProduct} />
        )}
        {step === 2 && (
          <Step2Country rankingData={rankingData} selectedId={selectedCountryId} onSelect={setSelectedCountryId} />
        )}
        {step === 3 && (
          <Step3Transport transport={transport} onSelect={setTransport} transitInfo={transitInfo} />
        )}
        {step === 4 && (
          <Step4Tracking
            timeline={timeline}
            selectedProduct={selectedProduct}
            selectedCountry={selectedCountry}
            transport={transport}
            totalDays={totalDays}
            selectedCountryId={selectedCountryId}
          />
        )}
      </div>

      <div className="flex justify-between items-center">
        {step === 4 ? (
          <>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-200 transition-colors"
            >
              Nueva Simulación
            </button>
            <button className="px-8 py-3 bg-primary-green text-white rounded-2xl text-sm font-bold hover:opacity-90 transition-opacity">
              Descargar Informe PDF
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setStep(s => Math.max(1, s - 1) as Step)}
              disabled={step === 1}
              className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl text-sm font-bold disabled:opacity-30 hover:bg-slate-200 transition-colors"
            >
              Anterior
            </button>
            <button
              onClick={() => setStep(s => Math.min(4, s + 1) as Step)}
              disabled={!canProceed[step]}
              className="px-8 py-3 bg-primary-blue text-white rounded-2xl text-sm font-bold disabled:opacity-30 hover:bg-primary-blue/90 transition-colors flex items-center space-x-2"
            >
              <span>{step === 3 ? "Ver Seguimiento" : "Siguiente"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
