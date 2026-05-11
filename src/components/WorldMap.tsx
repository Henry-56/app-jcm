"use client";

import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { CountryData } from '@/app/page';

const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

interface WorldMapProps {
  mapData: (CountryData & { score: number; level: string })[];
  selectedCountryId: string;
  setSelectedCountryId: (id: string) => void;
}

const COUNTRY_FLAGS: Record<string, string> = {
  DEU: "🇩🇪", USA: "🇺🇸", ESP: "🇪🇸", NLD: "🇳🇱", FRA: "🇫🇷", GBR: "🇬🇧",
  CAN: "🇨🇦", ITA: "🇮🇹", MEX: "🇲🇽", BRA: "🇧🇷", CHN: "🇨🇳", JPN: "🇯🇵",
  KOR: "🇰🇷", CHL: "🇨🇱", BOL: "🇧🇴",
};

const colorScale = (score: number) => {
  if (score >= 0.8) return "#10b981";
  if (score >= 0.7) return "#f59e0b";
  return "#ef4444";
};

export default function WorldMap({ mapData, selectedCountryId, setSelectedCountryId }: WorldMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<(CountryData & { score: number; level: string }) | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ coordinates: [-20, 30] as [number, number], zoom: 1 });

  const handleZoomIn  = () => { if (position.zoom < 4)  setPosition(p => ({ ...p, zoom: p.zoom * 1.5 })); };
  const handleZoomOut = () => { if (position.zoom > 1)  setPosition(p => ({ ...p, zoom: p.zoom / 1.5 })); };
  const handleMoveEnd = (pos: { coordinates: [number, number]; zoom: number }) => setPosition(pos);

  return (
    <div className="dashboard-card h-full flex flex-col relative overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-bold text-slate-800">Visualización de Mercados Globales</h3>
        <div className="flex space-x-4 text-xs">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 bg-status-high rounded-full"></span>
            <span className="text-slate-600">Recomendación Alta</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 bg-status-medium rounded-full"></span>
            <span className="text-slate-600">Media</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 bg-status-low rounded-full"></span>
            <span className="text-slate-600">Baja</span>
          </div>
        </div>
      </div>

      <div
        className="flex-1 bg-[#f0f4f8] relative group"
        onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
      >
        <ComposableMap
          projectionConfig={{ scale: 220, center: [-20, 30] }}
          className="w-full h-full"
        >
          <ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={handleMoveEnd}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const country = mapData.find(cc => cc.id === geo.id || cc.id === geo.properties?.ISO_A3);
                  const isSelected = country && country.id === selectedCountryId;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => { if (country) setHoveredCountry(country); }}
                      onMouseLeave={() => setHoveredCountry(null)}
                      onClick={() => { if (country) setSelectedCountryId(country.id); }}
                      style={{
                        default: {
                          fill: country ? colorScale(country.score) : "#E2E8F0",
                          outline: "none",
                          stroke: isSelected ? "#3b82f6" : "#FFFFFF",
                          strokeWidth: isSelected ? 2 : 0.5,
                        },
                        hover: {
                          fill: country ? colorScale(country.score) : "#CBD5E1",
                          outline: "none",
                          cursor: "pointer",
                          stroke: "#FFFFFF",
                          strokeWidth: 1,
                          opacity: 0.8,
                        },
                        pressed: { fill: "#3b82f6", outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {/* Zoom controls */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <button onClick={handleZoomIn}  className="w-8 h-8 bg-white shadow-md rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors font-bold border border-slate-100">+</button>
          <button onClick={handleZoomOut} className="w-8 h-8 bg-white shadow-md rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors font-bold border border-slate-100">-</button>
        </div>
      </div>

      {/* Floating contact card */}
      {hoveredCountry && hoveredCountry.contact && (
        <div
          style={{
            position: "fixed",
            left: mousePos.x + 20,
            top: mousePos.y - 10,
            zIndex: 9999,
            pointerEvents: "none",
            transform: mousePos.x > 1100 ? "translateX(calc(-100% - 40px))" : "none",
          }}
          className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-64 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center space-x-3"
            style={{ backgroundColor: colorScale(hoveredCountry.score) + "18" }}
          >
            <span className="text-2xl">{COUNTRY_FLAGS[hoveredCountry.id] || "🌍"}</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-800 text-sm truncate">{hoveredCountry.name}</p>
              <p className="text-xs text-slate-500">
                {hoveredCountry.currency === "EUR" ? "Euro (€)" : "Dólar (US$)"}
              </p>
            </div>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0"
              style={{
                backgroundColor: colorScale(hoveredCountry.score) + "22",
                color: colorScale(hoveredCountry.score),
              }}
            >
              {hoveredCountry.level} · {hoveredCountry.score.toFixed(2)}
            </span>
          </div>

          {/* Contact info */}
          <div className="px-4 py-3 space-y-2.5">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contacto Importador</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{hoveredCountry.contact.name}</p>
              <p className="text-xs text-slate-500">{hoveredCountry.contact.company}</p>
            </div>

            <div className="space-y-1.5 pt-1 border-t border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="text-sm">✉️</span>
                <span className="text-xs text-primary-blue truncate">{hoveredCountry.contact.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">📱</span>
                <span className="text-xs text-slate-600">{hoveredCountry.contact.phone}</span>
              </div>
            </div>
          </div>

          {/* Score bar */}
          <div className="px-4 pb-3">
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${hoveredCountry.score * 100}%`,
                  backgroundColor: colorScale(hoveredCountry.score),
                }}
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1 text-right">
              Score exportador: {(hoveredCountry.score * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
