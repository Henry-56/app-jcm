"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, User, ChevronDown, LogOut, Settings as SettingsIcon } from 'lucide-react';

export default function Header({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (q: string) => void }) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div>
        <h1 className="text-xl font-bold text-slate-900 leading-tight">
          Sistema Inteligente de Recomendación de Mercados de Exportación
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Análisis Multicriterio (AHP + TOPSIS) & Visualización Geoespacial
        </p>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="relative group hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 transition-colors group-focus-within:text-primary-blue" />
          <input 
            type="text" 
            placeholder="Buscar mercado..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all w-64"
          />
        </div>
        
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className={`relative p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors ${isNotifOpen ? 'bg-slate-50' : ''}`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <span className="font-bold text-sm text-slate-800">Notificaciones</span>
                <span className="text-xs text-primary-blue font-semibold cursor-pointer hover:underline">Marcar leídas</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors flex items-start space-x-3">
                  <div className="w-2 h-2 mt-1.5 bg-red-500 rounded-full shrink-0"></div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Alerta de Aranceles</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">La Unión Europea ajustará aranceles en 30 días.</p>
                  </div>
                </div>
                <div className="p-3 hover:bg-slate-50 cursor-pointer transition-colors flex items-start space-x-3">
                  <div className="w-2 h-2 mt-1.5 bg-amber-500 rounded-full shrink-0"></div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Actualización de Riesgo</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">El nivel de riesgo para Brasil ha cambiado a 'Medio'.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="h-8 w-px bg-slate-200"></div>
        
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center space-x-3 hover:bg-slate-50 p-1.5 rounded-xl transition-colors ${isProfileOpen ? 'bg-slate-50' : ''}`}
          >
            <div className="w-9 h-9 bg-gradient-to-br from-primary-blue to-primary-green rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
              H
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-semibold text-slate-900 leading-none">Henry G.</p>
              <p className="text-xs text-slate-500 mt-1">Export Manager</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
          
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-2">
                <button className="w-full text-left px-3 py-2 text-sm text-slate-700 font-medium hover:bg-slate-50 hover:text-primary-blue rounded-lg transition-colors flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Mi Perfil</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-slate-700 font-medium hover:bg-slate-50 hover:text-primary-blue rounded-lg transition-colors flex items-center space-x-2">
                  <SettingsIcon className="w-4 h-4" />
                  <span>Configuración</span>
                </button>
                <div className="h-px bg-slate-100 my-1"></div>
                <button className="w-full text-left px-3 py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors flex items-center space-x-2">
                  <LogOut className="w-4 h-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
