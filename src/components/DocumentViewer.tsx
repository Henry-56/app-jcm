"use client";

import React, { useState } from 'react';
import { FileText, FileCheck, FileCode, Download, Eye, Shield, Lock, ExternalLink } from 'lucide-react';

interface DocumentViewerProps {
  selectedCountry: any;
}

const docs = [
  { 
    id: "CI-9482", 
    name: "Factura Comercial", 
    type: "Commercial Invoice", 
    status: "Generado", 
    date: "25 Abr, 2026",
    icon: FileText,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  { 
    id: "PL-9482", 
    name: "Lista de Empaque", 
    type: "Packing List", 
    status: "Generado", 
    date: "25 Abr, 2026",
    icon: FileCode,
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  },
  { 
    id: "BL-MEDU-839", 
    name: "Bill of Lading", 
    type: "Documento de Transporte", 
    status: "Firmado", 
    date: "28 Abr, 2026",
    icon: FileCheck,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  { 
    id: "CP-SENASA-001", 
    name: "Certificado Fitosanitario", 
    type: "SENASA", 
    status: "Aprobado", 
    date: "26 Abr, 2026",
    icon: Shield,
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
  { 
    id: "CO-ADEX-442", 
    name: "Certificado de Origen", 
    type: "Cámara de Comercio", 
    status: "Vigente", 
    date: "27 Abr, 2026",
    icon: Lock,
    color: "text-rose-600",
    bg: "bg-rose-50"
  }
];

export default function DocumentViewer({ selectedCountry }: DocumentViewerProps) {
  const [selectedDoc, setSelectedDoc] = useState(docs[0]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Centro de Documentación</h2>
          <p className="text-slate-500 text-sm">Gestiona y visualiza los documentos legales para la exportación a {selectedCountry?.name || "Destino"}</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
          <Download className="w-4 h-4" />
          <span>Descargar Todo (ZIP)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Document List */}
        <div className="lg:col-span-1 space-y-3">
          {docs.map((doc) => (
            <div 
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                selectedDoc.id === doc.id 
                ? "bg-white border-primary-blue shadow-lg shadow-primary-blue/10 translate-x-2" 
                : "bg-white/50 border-slate-200 hover:border-slate-300 hover:bg-white"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 ${doc.bg} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <doc.icon className={`w-5 h-5 ${doc.color}`} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 leading-tight">{doc.name}</h4>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{doc.id}</p>
                </div>
              </div>
              {selectedDoc.id === doc.id && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary-blue"></div>
              )}
            </div>
          ))}
        </div>

        {/* Document Preview Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
            {/* Toolbar */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${selectedDoc.bg} rounded-lg flex items-center justify-center`}>
                  <selectedDoc.icon className={`w-4 h-4 ${selectedDoc.color}`} />
                </div>
                <h3 className="text-sm font-bold text-slate-700">{selectedDoc.name} - Vista Previa</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Content Simulation */}
            <div className="flex-1 p-12 overflow-y-auto bg-slate-200/30 flex justify-center">
              <div className="w-full max-w-[500px] bg-white shadow-2xl rounded-sm p-10 space-y-8 min-h-[600px] relative">
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none rotate-[-45deg]">
                  <p className="text-8xl font-black uppercase">PROTOTIPO</p>
                </div>

                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h1 className="text-xl font-bold text-slate-900">JCM EXPORTS PERU S.A.C.</h1>
                    <p className="text-[10px] text-slate-500">Av. La Ribera 450, Huancayo - Junín</p>
                    <p className="text-[10px] text-slate-500">RUC: 20608492812</p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-lg font-bold text-primary-blue uppercase">{selectedDoc.type}</h2>
                    <p className="text-sm font-bold text-slate-700">{selectedDoc.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Exportador</p>
                    <div className="text-xs space-y-1">
                      <p className="font-bold">JCM EXPORTS PERU</p>
                      <p>Huancayo, Junín, Perú</p>
                      <p>Contacto: export@jcmperu.com</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Consignatario (Destino)</p>
                    <div className="text-xs space-y-1">
                      <p className="font-bold">GLOBAL FRUITS IMPORTERS LTD.</p>
                      <p>Puerto de {selectedCountry?.name || "Destino"}</p>
                      <p>Tax ID: 44-092-8121</p>
                    </div>
                  </div>
                </div>

                <table className="w-full mt-10">
                  <thead className="border-b-2 border-slate-900">
                    <tr className="text-[10px] font-bold text-slate-500 text-left uppercase">
                      <th className="py-2">Descripción</th>
                      <th className="py-2 text-right">Cantidad</th>
                      <th className="py-2 text-right">Precio Unit.</th>
                      <th className="py-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    <tr className="border-b border-slate-100">
                      <td className="py-4 font-medium">Pecanas Peladas Premium - Grado A</td>
                      <td className="py-4 text-right">10,000 kg</td>
                      <td className="py-4 text-right">$8.50</td>
                      <td className="py-4 text-right font-bold">$85,000.00</td>
                    </tr>
                  </tbody>
                </table>

                <div className="mt-auto pt-20 flex justify-between items-end">
                   <div className="text-[10px] text-slate-400 max-w-[200px]">
                     <p>Este documento es una simulación generada por el prototipo de JCM Exports.</p>
                   </div>
                   <div className="text-center space-y-2">
                     <div className="w-32 h-16 bg-slate-50 border border-slate-100 flex items-center justify-center italic text-slate-300 text-xs rounded-lg">
                       Firma Digital
                     </div>
                     <p className="text-[10px] font-bold text-slate-700">Autorizado por Aduanas</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
