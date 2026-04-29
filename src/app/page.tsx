"use client";

import React, { useState, useMemo } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import WorldMap from '@/components/WorldMap';
import RightPanel from '@/components/RightPanel';
import KPICards from '@/components/KPICards';
import BottomPanel from '@/components/BottomPanel';
import MarketNews from '@/components/MarketNews';
import ProductShowcase from '@/components/ProductShowcase';
import CostCalculator from '@/components/CostCalculator';
import LogisticsTracking from '@/components/LogisticsTracking';
import DocumentViewer from '@/components/DocumentViewer';

export type CountryData = {
  id: string;
  name: string;
  demand: number;
  price: number;
  logistics: number;
  tariffs: number;
  competition: number;
  risk: number;
  baseScore: number;
};

export type SliderData = {
  id: string;
  label: string;
  value: number;
  color: string;
};

const juninData: CountryData[] = [
  { id: "DEU", name: "Alemania", demand: 92, price: 88, logistics: 75, tariffs: 95, competition: 65, risk: 90, baseScore: 0.89 },
  { id: "USA", name: "Estados Unidos", demand: 95, price: 85, logistics: 80, tariffs: 85, competition: 50, risk: 95, baseScore: 0.85 },
  { id: "ESP", name: "España", demand: 85, price: 80, logistics: 70, tariffs: 90, competition: 60, risk: 85, baseScore: 0.82 },
  { id: "NLD", name: "Países Bajos", demand: 80, price: 75, logistics: 85, tariffs: 95, competition: 55, risk: 90, baseScore: 0.78 },
  { id: "FRA", name: "Francia", demand: 82, price: 78, logistics: 72, tariffs: 88, competition: 62, risk: 88, baseScore: 0.75 },
  { id: "GBR", name: "Reino Unido", demand: 88, price: 82, logistics: 65, tariffs: 70, competition: 70, risk: 85, baseScore: 0.72 },
  { id: "CAN", name: "Canadá", demand: 75, price: 80, logistics: 60, tariffs: 85, competition: 55, risk: 92, baseScore: 0.68 },
  { id: "ITA", name: "Italia", demand: 78, price: 70, logistics: 68, tariffs: 85, competition: 65, risk: 80, baseScore: 0.65 },
  { id: "MEX", name: "México", demand: 70, price: 65, logistics: 85, tariffs: 90, competition: 40, risk: 70, baseScore: 0.62 },
  { id: "BRA", name: "Brasil", demand: 85, price: 60, logistics: 50, tariffs: 60, competition: 45, risk: 65, baseScore: 0.58 },
];

const limaData: CountryData[] = [
  { id: "CHN", name: "China", demand: 98, price: 80, logistics: 95, tariffs: 85, competition: 40, risk: 88, baseScore: 0.92 },
  { id: "USA", name: "Estados Unidos", demand: 96, price: 88, logistics: 92, tariffs: 85, competition: 45, risk: 95, baseScore: 0.90 },
  { id: "JPN", name: "Japón", demand: 88, price: 92, logistics: 85, tariffs: 90, competition: 55, risk: 92, baseScore: 0.86 },
  { id: "KOR", name: "Corea del Sur", demand: 85, price: 90, logistics: 82, tariffs: 88, competition: 60, risk: 90, baseScore: 0.83 },
  { id: "CAN", name: "Canadá", demand: 80, price: 85, logistics: 75, tariffs: 85, competition: 50, risk: 92, baseScore: 0.79 },
  { id: "DEU", name: "Alemania", demand: 82, price: 88, logistics: 70, tariffs: 95, competition: 65, risk: 90, baseScore: 0.77 },
  { id: "GBR", name: "Reino Unido", demand: 78, price: 82, logistics: 68, tariffs: 70, competition: 70, risk: 85, baseScore: 0.73 },
  { id: "NLD", name: "Países Bajos", demand: 75, price: 78, logistics: 70, tariffs: 95, competition: 60, risk: 90, baseScore: 0.70 },
  { id: "FRA", name: "Francia", demand: 72, price: 75, logistics: 65, tariffs: 88, competition: 65, risk: 88, baseScore: 0.66 },
  { id: "ESP", name: "España", demand: 70, price: 72, logistics: 62, tariffs: 90, competition: 60, risk: 85, baseScore: 0.63 },
];

const arequipaData: CountryData[] = [
  { id: "USA", name: "Estados Unidos", demand: 92, price: 90, logistics: 85, tariffs: 85, competition: 50, risk: 95, baseScore: 0.88 },
  { id: "CHN", name: "China", demand: 95, price: 85, logistics: 80, tariffs: 85, competition: 45, risk: 88, baseScore: 0.85 },
  { id: "DEU", name: "Alemania", demand: 85, price: 92, logistics: 70, tariffs: 95, competition: 60, risk: 90, baseScore: 0.81 },
  { id: "ITA", name: "Italia", demand: 88, price: 85, logistics: 65, tariffs: 85, competition: 65, risk: 80, baseScore: 0.78 },
  { id: "JPN", name: "Japón", demand: 82, price: 88, logistics: 75, tariffs: 90, competition: 55, risk: 92, baseScore: 0.75 },
  { id: "GBR", name: "Reino Unido", demand: 80, price: 85, logistics: 68, tariffs: 70, competition: 60, risk: 85, baseScore: 0.72 },
  { id: "FRA", name: "Francia", demand: 78, price: 82, logistics: 65, tariffs: 88, competition: 65, risk: 88, baseScore: 0.69 },
  { id: "CHL", name: "Chile", demand: 85, price: 70, logistics: 90, tariffs: 95, competition: 70, risk: 85, baseScore: 0.66 },
  { id: "CAN", name: "Canadá", demand: 72, price: 80, logistics: 60, tariffs: 85, competition: 50, risk: 92, baseScore: 0.63 },
  { id: "BOL", name: "Bolivia", demand: 88, price: 65, logistics: 95, tariffs: 100, competition: 80, risk: 60, baseScore: 0.60 },
];

const initialSliders: SliderData[] = [
  { id: 'producto', label: 'Producto', value: 85, color: 'accent-primary-blue' },
  { id: 'precio', label: 'Precio', value: 70, color: 'accent-emerald-500' },
  { id: 'plaza', label: 'Plaza', value: 65, color: 'accent-amber-500' },
  { id: 'promocion', label: 'Promoción', value: 60, color: 'accent-purple-500' },
  { id: 'riesgo', label: 'Riesgo País', value: 30, color: 'accent-red-500' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [activeRegion, setActiveRegion] = useState("Junín");
  const [searchQuery, setSearchQuery] = useState("");
  const [sliders, setSliders] = useState<SliderData[]>(initialSliders);
  const [selectedCountryId, setSelectedCountryId] = useState<string>("DEU");

  // Get active dataset
  const currentData = useMemo(() => {
    switch (activeRegion) {
      case "Lima": return limaData;
      case "Arequipa": return arequipaData;
      case "Junín":
      default: return juninData;
    }
  }, [activeRegion]);

  // Calculate dynamic scores based on sliders (simulated formula)
  const rankingData = useMemo(() => {
    return currentData.map(country => {
      // Very simple simulated recalculation
      const productoWeight = sliders.find(s => s.id === 'producto')?.value || 0;
      const precioWeight = sliders.find(s => s.id === 'precio')?.value || 0;
      const plazaWeight = sliders.find(s => s.id === 'plaza')?.value || 0;
      const promocionWeight = sliders.find(s => s.id === 'promocion')?.value || 0;
      const riesgoWeight = sliders.find(s => s.id === 'riesgo')?.value || 0;

      const totalWeight = productoWeight + precioWeight + plazaWeight + promocionWeight + riesgoWeight;
      
      let dynamicScore = country.baseScore;
      if (totalWeight > 0) {
        // Just a dummy math to vary the score slightly based on slider values vs country base stats
        const weightedScore = (
          (country.demand * productoWeight) + 
          (country.price * precioWeight) + 
          (country.logistics * plazaWeight) + 
          (country.tariffs * promocionWeight) + 
          (country.risk * (100 - riesgoWeight)) // Lower risk is better
        ) / (totalWeight * 100);
        
        dynamicScore = Math.min(1, Math.max(0, weightedScore));
      }

      let level = "Bajo";
      if (dynamicScore >= 0.8) level = "Alto";
      else if (dynamicScore >= 0.7) level = "Medio";

      return {
        ...country,
        score: dynamicScore,
        level,
        trend: dynamicScore >= country.baseScore ? (dynamicScore > country.baseScore + 0.05 ? "up" : "same") : "down"
      };
    }).sort((a, b) => b.score - a.score).map((c, i) => ({ ...c, rank: i + 1 }));
  }, [currentData, sliders]);

  // Filter ranking data based on search query
  const filteredRankingData = useMemo(() => {
    if (!searchQuery.trim()) return rankingData;
    return rankingData.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [rankingData, searchQuery]);

  const selectedCountry = useMemo(() => {
    return rankingData.find(c => c.id === selectedCountryId) || rankingData[0];
  }, [rankingData, selectedCountryId]);

  // Update selected country when region changes if old selected is not in new data
  React.useEffect(() => {
    if (!rankingData.find(c => c.id === selectedCountryId)) {
      if (rankingData.length > 0) {
        setSelectedCountryId(rankingData[0].id);
      }
    }
  }, [rankingData, selectedCountryId]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar - Fixed width */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        activeRegion={activeRegion}
        setActiveRegion={setActiveRegion}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          {activeTab === "Dashboard" ? (
            <>
              {/* Top Section: KPI Cards */}
              <KPICards rankingData={filteredRankingData} />

              {/* Middle Section: Map + Right Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[600px]">
                <div className="lg:col-span-8 flex flex-col">
                  <WorldMap 
                    mapData={filteredRankingData} 
                    selectedCountryId={selectedCountryId} 
                    setSelectedCountryId={setSelectedCountryId} 
                  />
                </div>
                <div className="lg:col-span-4">
                  <RightPanel 
                    rankingData={filteredRankingData} 
                    selectedCountry={selectedCountry}
                    setSelectedCountryId={setSelectedCountryId}
                    setActiveTab={setActiveTab}
                  />
                </div>
              </div>

              {/* Bottom Section: Sliders + Heatmap */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-9">
                  <BottomPanel sliders={sliders} setSliders={setSliders} />
                </div>
                <div className="lg:col-span-3">
                  <MarketNews />
                </div>
              </div>
            </>
          ) : activeTab === "Catálogo de Productos" ? (
            <ProductShowcase />
          ) : activeTab === "Costos e Incoterms" ? (
            <CostCalculator selectedCountry={selectedCountry} />
          ) : activeTab === "Seguimiento" ? (
            <LogisticsTracking selectedCountry={selectedCountry} />
          ) : (
            <DocumentViewer selectedCountry={selectedCountry} />
          )}
        </main>
      </div>
    </div>
  );
}
