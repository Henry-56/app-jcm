"use client";

import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { CountryData } from '@/app/page';

const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

interface WorldMapProps {
  mapData: (CountryData & { score: number, level: string })[];
  selectedCountryId: string;
  setSelectedCountryId: (id: string) => void;
}

const colorScale = (score: number) => {
  if (score >= 0.8) return "#10b981"; // Green
  if (score >= 0.7) return "#f59e0b"; // Yellow
  return "#ef4444"; // Red
};

export default function WorldMap({ mapData, selectedCountryId, setSelectedCountryId }: WorldMapProps) {
  const [tooltipContent, setTooltipContent] = useState("");
  const [position, setPosition] = useState({ coordinates: [-20, 30] as [number, number], zoom: 1 });

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (position: { coordinates: [number, number], zoom: number }) => {
    setPosition(position);
  };

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
      
      <div className="flex-1 bg-[#f0f4f8] relative group">
        <ComposableMap
          projectionConfig={{
            scale: 220,
            center: [-20, 30] // Focus on Europe and America
          }}
          className="w-full h-full"
        >
          <ZoomableGroup 
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const country = mapData.find(c => c.id === geo.id || c.id === geo.properties?.ISO_A3);
                  const isSelected = country && country.id === selectedCountryId;
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        if (country) {
                          setTooltipContent(`${country.name}: ${country.score.toFixed(2)} (${country.level})`);
                        } else {
                          setTooltipContent(geo.properties?.NAME || geo.properties?.name || "Sin datos");
                        }
                      }}
                      onMouseLeave={() => setTooltipContent("")}
                      onClick={() => {
                        if (country) setSelectedCountryId(country.id);
                      }}
                      style={{
                        default: {
                          fill: country ? colorScale(country.score) : "#E2E8F0",
                          outline: "none",
                          stroke: isSelected ? "#3b82f6" : "#FFFFFF",
                          strokeWidth: isSelected ? 2 : 0.5
                        },
                        hover: {
                          fill: country ? colorScale(country.score) : "#CBD5E1",
                          outline: "none",
                          cursor: "pointer",
                          stroke: "#FFFFFF",
                          strokeWidth: 1,
                          opacity: 0.8
                        },
                        pressed: {
                          fill: "#3b82f6",
                          outline: "none"
                        }
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        
        {tooltipContent && (
          <div className="absolute top-4 left-4 bg-slate-900 text-white px-3 py-2 rounded-lg text-xs font-medium shadow-xl pointer-events-none animate-in fade-in zoom-in duration-200">
            {tooltipContent}
          </div>
        )}
        
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
            <button onClick={handleZoomIn} className="w-8 h-8 bg-white shadow-md rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors font-bold border border-slate-100">+</button>
            <button onClick={handleZoomOut} className="w-8 h-8 bg-white shadow-md rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors font-bold border border-slate-100">-</button>
        </div>
      </div>
    </div>
  );
}
