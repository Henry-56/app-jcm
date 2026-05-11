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
import ExportSimulator from '@/components/ExportSimulator';
import DocumentViewer from '@/components/DocumentViewer';
import Agreements from '@/components/Agreements';

export type ContactData = {
  name: string;
  company: string;
  email: string;
  phone: string;
};

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
  currency: "USD" | "EUR";
  contact: ContactData;
};

export type SliderData = {
  id: string;
  label: string;
  value: number;
  color: string;
};

const CONTACTS: Record<string, { currency: "USD" | "EUR"; contact: ContactData }> = {
  DEU: { currency: "EUR", contact: { name: "Hans Mueller", company: "Bavarian Imports GmbH", email: "hans.mueller@bavarian-imports.de", phone: "+49 89 1234 5678" } },
  USA: { currency: "USD", contact: { name: "John Smith", company: "Global Foods USA Inc.", email: "j.smith@globalfoods-usa.com", phone: "+1 305 234 5678" } },
  ESP: { currency: "EUR", contact: { name: "Carlos García", company: "Importaciones Ibérica S.L.", email: "c.garcia@iberica-imports.es", phone: "+34 91 234 5678" } },
  NLD: { currency: "EUR", contact: { name: "Erik van der Berg", company: "Dutch Trade BV", email: "e.vdberg@dutch-trade.nl", phone: "+31 20 234 5678" } },
  FRA: { currency: "EUR", contact: { name: "Pierre Dupont", company: "Saveurs France SARL", email: "p.dupont@saveurs-france.fr", phone: "+33 1 23 45 67 89" } },
  GBR: { currency: "EUR", contact: { name: "James Wilson", company: "British Foods Ltd.", email: "j.wilson@britishfoods.co.uk", phone: "+44 20 7946 0958" } },
  CAN: { currency: "USD", contact: { name: "Michael Chen", company: "Pacific Imports Inc.", email: "m.chen@pacific-imports.ca", phone: "+1 604 234 5678" } },
  ITA: { currency: "EUR", contact: { name: "Marco Rossi", company: "Gusto Italiano S.R.L.", email: "m.rossi@gusto-italiano.it", phone: "+39 02 1234 5678" } },
  MEX: { currency: "USD", contact: { name: "Alejandro Flores", company: "ImportMex S.A. de C.V.", email: "a.flores@importmex.com.mx", phone: "+52 55 1234 5678" } },
  BRA: { currency: "USD", contact: { name: "Ricardo Santos", company: "Brasil Comércio Ltda.", email: "r.santos@brasil-comercio.com.br", phone: "+55 11 1234 5678" } },
  CHN: { currency: "USD", contact: { name: "Wei Zhang", company: "Sino Imports Co. Ltd.", email: "w.zhang@sino-imports.cn", phone: "+86 10 1234 5678" } },
  JPN: { currency: "USD", contact: { name: "Yuki Tanaka", company: "Nippon Trade Co.", email: "y.tanaka@nippon-trade.jp", phone: "+81 3 1234 5678" } },
  KOR: { currency: "USD", contact: { name: "Ji-ho Park", company: "Korea Imports Corp.", email: "j.park@korea-imports.kr", phone: "+82 2 1234 5678" } },
  CHL: { currency: "USD", contact: { name: "Rodrigo Muñoz", company: "Chile Comercio Exterior SpA", email: "r.munoz@chile-comercio.cl", phone: "+56 2 1234 5678" } },
  BOL: { currency: "USD", contact: { name: "Carlos Mamani", company: "Bolivia Trade SRL", email: "c.mamani@bolivia-trade.bo", phone: "+591 2 234 5678" } },
};

const c = (id: string) => CONTACTS[id] ?? { currency: "USD" as const, contact: { name: "N/A", company: "N/A", email: "N/A", phone: "N/A" } };

const juninData: CountryData[] = [
  { id: "DEU", name: "Alemania",       demand: 92, price: 88, logistics: 75, tariffs: 95, competition: 65, risk: 90, baseScore: 0.89, ...c("DEU") },
  { id: "USA", name: "Estados Unidos", demand: 95, price: 85, logistics: 80, tariffs: 85, competition: 50, risk: 95, baseScore: 0.85, ...c("USA") },
  { id: "ESP", name: "España",         demand: 85, price: 80, logistics: 70, tariffs: 90, competition: 60, risk: 85, baseScore: 0.82, ...c("ESP") },
  { id: "NLD", name: "Países Bajos",   demand: 80, price: 75, logistics: 85, tariffs: 95, competition: 55, risk: 90, baseScore: 0.78, ...c("NLD") },
  { id: "FRA", name: "Francia",        demand: 82, price: 78, logistics: 72, tariffs: 88, competition: 62, risk: 88, baseScore: 0.75, ...c("FRA") },
  { id: "GBR", name: "Reino Unido",    demand: 88, price: 82, logistics: 65, tariffs: 70, competition: 70, risk: 85, baseScore: 0.72, ...c("GBR") },
  { id: "CAN", name: "Canadá",         demand: 75, price: 80, logistics: 60, tariffs: 85, competition: 55, risk: 92, baseScore: 0.68, ...c("CAN") },
  { id: "ITA", name: "Italia",         demand: 78, price: 70, logistics: 68, tariffs: 85, competition: 65, risk: 80, baseScore: 0.65, ...c("ITA") },
  { id: "MEX", name: "México",         demand: 70, price: 65, logistics: 85, tariffs: 90, competition: 40, risk: 70, baseScore: 0.62, ...c("MEX") },
  { id: "BRA", name: "Brasil",         demand: 85, price: 60, logistics: 50, tariffs: 60, competition: 45, risk: 65, baseScore: 0.58, ...c("BRA") },
];

const limaData: CountryData[] = [
  { id: "CHN", name: "China",          demand: 98, price: 80, logistics: 95, tariffs: 85, competition: 40, risk: 88, baseScore: 0.92, ...c("CHN") },
  { id: "USA", name: "Estados Unidos", demand: 96, price: 88, logistics: 92, tariffs: 85, competition: 45, risk: 95, baseScore: 0.90, ...c("USA") },
  { id: "JPN", name: "Japón",          demand: 88, price: 92, logistics: 85, tariffs: 90, competition: 55, risk: 92, baseScore: 0.86, ...c("JPN") },
  { id: "KOR", name: "Corea del Sur",  demand: 85, price: 90, logistics: 82, tariffs: 88, competition: 60, risk: 90, baseScore: 0.83, ...c("KOR") },
  { id: "CAN", name: "Canadá",         demand: 80, price: 85, logistics: 75, tariffs: 85, competition: 50, risk: 92, baseScore: 0.79, ...c("CAN") },
  { id: "DEU", name: "Alemania",       demand: 82, price: 88, logistics: 70, tariffs: 95, competition: 65, risk: 90, baseScore: 0.77, ...c("DEU") },
  { id: "GBR", name: "Reino Unido",    demand: 78, price: 82, logistics: 68, tariffs: 70, competition: 70, risk: 85, baseScore: 0.73, ...c("GBR") },
  { id: "NLD", name: "Países Bajos",   demand: 75, price: 78, logistics: 70, tariffs: 95, competition: 60, risk: 90, baseScore: 0.70, ...c("NLD") },
  { id: "FRA", name: "Francia",        demand: 72, price: 75, logistics: 65, tariffs: 88, competition: 65, risk: 88, baseScore: 0.66, ...c("FRA") },
  { id: "ESP", name: "España",         demand: 70, price: 72, logistics: 62, tariffs: 90, competition: 60, risk: 85, baseScore: 0.63, ...c("ESP") },
];

const arequipaData: CountryData[] = [
  { id: "USA", name: "Estados Unidos", demand: 92, price: 90, logistics: 85, tariffs: 85, competition: 50, risk: 95, baseScore: 0.88, ...c("USA") },
  { id: "CHN", name: "China",          demand: 95, price: 85, logistics: 80, tariffs: 85, competition: 45, risk: 88, baseScore: 0.85, ...c("CHN") },
  { id: "DEU", name: "Alemania",       demand: 85, price: 92, logistics: 70, tariffs: 95, competition: 60, risk: 90, baseScore: 0.81, ...c("DEU") },
  { id: "ITA", name: "Italia",         demand: 88, price: 85, logistics: 65, tariffs: 85, competition: 65, risk: 80, baseScore: 0.78, ...c("ITA") },
  { id: "JPN", name: "Japón",          demand: 82, price: 88, logistics: 75, tariffs: 90, competition: 55, risk: 92, baseScore: 0.75, ...c("JPN") },
  { id: "GBR", name: "Reino Unido",    demand: 80, price: 85, logistics: 68, tariffs: 70, competition: 60, risk: 85, baseScore: 0.72, ...c("GBR") },
  { id: "FRA", name: "Francia",        demand: 78, price: 82, logistics: 65, tariffs: 88, competition: 65, risk: 88, baseScore: 0.69, ...c("FRA") },
  { id: "CHL", name: "Chile",          demand: 85, price: 70, logistics: 90, tariffs: 95, competition: 70, risk: 85, baseScore: 0.66, ...c("CHL") },
  { id: "CAN", name: "Canadá",         demand: 72, price: 80, logistics: 60, tariffs: 85, competition: 50, risk: 92, baseScore: 0.63, ...c("CAN") },
  { id: "BOL", name: "Bolivia",        demand: 88, price: 65, logistics: 95, tariffs: 100, competition: 80, risk: 60, baseScore: 0.60, ...c("BOL") },
];

const initialSliders: SliderData[] = [
  { id: 'producto',  label: 'Producto',     value: 85, color: 'accent-primary-blue' },
  { id: 'precio',    label: 'Precio',       value: 70, color: 'accent-emerald-500' },
  { id: 'plaza',     label: 'Plaza',        value: 65, color: 'accent-amber-500' },
  { id: 'promocion', label: 'Promoción',    value: 60, color: 'accent-purple-500' },
  { id: 'riesgo',    label: 'Riesgo País',  value: 30, color: 'accent-red-500' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab]         = useState("Dashboard");
  const [activeRegion, setActiveRegion]   = useState("Junín");
  const [searchQuery, setSearchQuery]     = useState("");
  const [sliders, setSliders]             = useState<SliderData[]>(initialSliders);
  const [selectedCountryId, setSelectedCountryId] = useState<string>("DEU");

  const currentData = useMemo(() => {
    if (activeRegion === "Lima")     return limaData;
    if (activeRegion === "Arequipa") return arequipaData;
    return juninData;
  }, [activeRegion]);

  const rankingData = useMemo(() => {
    return currentData.map(country => {
      const productoW  = sliders.find(s => s.id === 'producto')?.value  || 0;
      const precioW    = sliders.find(s => s.id === 'precio')?.value    || 0;
      const plazaW     = sliders.find(s => s.id === 'plaza')?.value     || 0;
      const promocionW = sliders.find(s => s.id === 'promocion')?.value || 0;
      const riesgoW    = sliders.find(s => s.id === 'riesgo')?.value    || 0;
      const totalW = productoW + precioW + plazaW + promocionW + riesgoW;

      let dynamicScore = country.baseScore;
      if (totalW > 0) {
        const ws = (
          (country.demand     * productoW) +
          (country.price      * precioW) +
          (country.logistics  * plazaW) +
          (country.tariffs    * promocionW) +
          (country.risk       * (100 - riesgoW))
        ) / (totalW * 100);
        dynamicScore = Math.min(1, Math.max(0, ws));
      }

      const level = dynamicScore >= 0.8 ? "Alto" : dynamicScore >= 0.7 ? "Medio" : "Bajo";
      const trend = dynamicScore >= country.baseScore
        ? (dynamicScore > country.baseScore + 0.05 ? "up" : "same")
        : "down";

      return { ...country, score: dynamicScore, level, trend };
    })
      .sort((a, b) => b.score - a.score)
      .map((cc, i) => ({ ...cc, rank: i + 1 }));
  }, [currentData, sliders]);

  const filteredRankingData = useMemo(() => {
    if (!searchQuery.trim()) return rankingData;
    return rankingData.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [rankingData, searchQuery]);

  const selectedCountry = useMemo(
    () => rankingData.find(c => c.id === selectedCountryId) || rankingData[0],
    [rankingData, selectedCountryId],
  );

  React.useEffect(() => {
    if (!rankingData.find(c => c.id === selectedCountryId) && rankingData.length > 0) {
      setSelectedCountryId(rankingData[0].id);
    }
  }, [rankingData, selectedCountryId]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeRegion={activeRegion}
        setActiveRegion={setActiveRegion}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          {activeTab === "Dashboard" ? (
            <>
              <KPICards rankingData={filteredRankingData} />

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
            <ExportSimulator rankingData={filteredRankingData} />
          ) : activeTab === "Convenios" ? (
            <Agreements />
          ) : (
            <DocumentViewer selectedCountry={selectedCountry} />
          )}
        </main>
      </div>
    </div>
  );
}
