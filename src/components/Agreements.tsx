"use client";

import React, { useState, useMemo } from 'react';
import { Globe, Search, ChevronDown, ChevronUp } from 'lucide-react';

interface ProductTariff {
  product: string;
  tariff: string;
}

interface Agreement {
  id: string;
  name: string;
  shortName: string;
  type: "TLC" | "CAN" | "ACE";
  status: "vigente" | "negociacion";
  yearSigned: number;
  yearInForce: number;
  countries: string[];
  countryIds: string[];
  flags: string[];
  tariffGeneral: string;
  tariffAgro: string;
  keyProducts: string[];
  description: string;
  productTariffs: ProductTariff[];
}

const AGREEMENTS: Agreement[] = [
  {
    id: "usa", name: "Acuerdo de Promoción Comercial Perú – EE.UU.", shortName: "TLC Perú - EE.UU.",
    type: "TLC", status: "vigente", yearSigned: 2006, yearInForce: 2009,
    countries: ["Estados Unidos"], countryIds: ["USA"], flags: ["🇺🇸"],
    tariffGeneral: "0%", tariffAgro: "0%",
    keyProducts: ["Espárragos", "Pecanas", "Quinua", "Arándanos", "Café", "Pisco"],
    description: "Eliminación total de aranceles para productos agropecuarios. Principal mercado de destino para exportaciones peruanas con acceso preferencial inmediato.",
    productTariffs: [
      { product: "Espárragos", tariff: "0%" }, { product: "Quinua", tariff: "0%" },
      { product: "Arándanos", tariff: "0%" }, { product: "Pisco", tariff: "0%" },
    ],
  },
  {
    id: "ue", name: "Acuerdo Comercial Perú – Unión Europea", shortName: "TLC Perú - UE",
    type: "TLC", status: "vigente", yearSigned: 2012, yearInForce: 2013,
    countries: ["Alemania", "España", "Francia", "Italia", "Países Bajos"],
    countryIds: ["DEU", "ESP", "FRA", "ITA", "NLD"],
    flags: ["🇩🇪", "🇪🇸", "🇫🇷", "🇮🇹", "🇳🇱"],
    tariffGeneral: "0%", tariffAgro: "0%",
    keyProducts: ["Café", "Cacao", "Quinua", "Espárragos", "Paprika", "Arándanos"],
    description: "Acceso preferencial a 27 países de la Unión Europea. Abarca más del 80% de los productos agrícolas con arancel 0% de forma inmediata.",
    productTariffs: [
      { product: "Café Orgánico", tariff: "0%" }, { product: "Espárragos", tariff: "0%" },
      { product: "Cacao", tariff: "0%" }, { product: "Paprika", tariff: "0%" },
    ],
  },
  {
    id: "gbr", name: "Acuerdo de Continuidad Comercial Perú – Reino Unido", shortName: "TLC Perú - RU",
    type: "TLC", status: "vigente", yearSigned: 2021, yearInForce: 2021,
    countries: ["Reino Unido"], countryIds: ["GBR"], flags: ["🇬🇧"],
    tariffGeneral: "0%", tariffAgro: "0-5%",
    keyProducts: ["Café", "Quinua", "Cacao", "Espárragos", "Arándanos"],
    description: "Acuerdo post-Brexit que preserva los beneficios del TLC con la UE para mantener el comercio bilateral sin interrupciones.",
    productTariffs: [
      { product: "Café", tariff: "0%" }, { product: "Quinua", tariff: "0%" },
      { product: "Espárragos", tariff: "0%" }, { product: "Arándanos", tariff: "0%" },
    ],
  },
  {
    id: "china", name: "Tratado de Libre Comercio Perú – China", shortName: "TLC Perú - China",
    type: "TLC", status: "vigente", yearSigned: 2009, yearInForce: 2010,
    countries: ["China"], countryIds: ["CHN"], flags: ["🇨🇳"],
    tariffGeneral: "0-10%", tariffAgro: "0-5%",
    keyProducts: ["Harina de Pescado", "Espárragos", "Arándanos", "Palta", "Uvas"],
    description: "China es el principal socio comercial de Perú. El TLC facilita exportaciones de materias primas y productos agrícolas con aranceles preferenciales.",
    productTariffs: [
      { product: "Espárragos", tariff: "0%" }, { product: "Arándanos", tariff: "0%" },
      { product: "Pecanas", tariff: "5%" }, { product: "Quinua", tariff: "3%" },
    ],
  },
  {
    id: "japan", name: "Acuerdo de Asociación Económica Perú – Japón", shortName: "TLC Perú - Japón",
    type: "TLC", status: "vigente", yearSigned: 2011, yearInForce: 2012,
    countries: ["Japón"], countryIds: ["JPN"], flags: ["🇯🇵"],
    tariffGeneral: "0-5%", tariffAgro: "0-5%",
    keyProducts: ["Espárragos", "Café", "Cacao", "Quinua", "Pisco", "Mango"],
    description: "Acceso preferencial a uno de los mercados más exigentes del mundo. Eliminación progresiva de aranceles en un período de 10 años.",
    productTariffs: [
      { product: "Espárragos", tariff: "0%" }, { product: "Café", tariff: "0%" },
      { product: "Quinua", tariff: "0%" }, { product: "Pisco", tariff: "0%" },
    ],
  },
  {
    id: "korea", name: "Tratado de Libre Comercio Perú – Corea del Sur", shortName: "TLC Perú - Corea",
    type: "TLC", status: "vigente", yearSigned: 2011, yearInForce: 2011,
    countries: ["Corea del Sur"], countryIds: ["KOR"], flags: ["🇰🇷"],
    tariffGeneral: "0-5%", tariffAgro: "0-5%",
    keyProducts: ["Arándanos", "Quinua", "Palta", "Espárragos", "Café", "Pecanas"],
    description: "Acceso preferencial para 2,200 productos peruanos. Mercado en crecimiento con alta demanda de superalimentos andinos.",
    productTariffs: [
      { product: "Arándanos", tariff: "0%" }, { product: "Quinua", tariff: "0%" },
      { product: "Espárragos", tariff: "0%" }, { product: "Pecanas", tariff: "0%" },
    ],
  },
  {
    id: "canada", name: "Acuerdo de Libre Comercio Perú – Canadá", shortName: "TLC Perú - Canadá",
    type: "TLC", status: "vigente", yearSigned: 2008, yearInForce: 2009,
    countries: ["Canadá"], countryIds: ["CAN"], flags: ["🇨🇦"],
    tariffGeneral: "0%", tariffAgro: "0%",
    keyProducts: ["Espárragos", "Quinua", "Café", "Arándanos", "Pisco", "Cacao"],
    description: "Libre acceso inmediato para la gran mayoría de productos peruanos. Canadá es mercado creciente para productos orgánicos certificados.",
    productTariffs: [
      { product: "Espárragos", tariff: "0%" }, { product: "Quinua", tariff: "0%" },
      { product: "Café", tariff: "0%" }, { product: "Pisco", tariff: "0%" },
    ],
  },
  {
    id: "mexico", name: "Acuerdo de Integración Comercial Perú – México", shortName: "TLC Perú - México",
    type: "TLC", status: "vigente", yearSigned: 2011, yearInForce: 2012,
    countries: ["México"], countryIds: ["MEX"], flags: ["🇲🇽"],
    tariffGeneral: "0-5%", tariffAgro: "0-5%",
    keyProducts: ["Quinua", "Café", "Pisco", "Paprika", "Espárragos", "Cacao"],
    description: "Liberalización progresiva del comercio bilateral. México es la puerta de entrada a mercados de América del Norte.",
    productTariffs: [
      { product: "Quinua", tariff: "0%" }, { product: "Café", tariff: "0%" },
      { product: "Espárragos", tariff: "0%" }, { product: "Pisco", tariff: "5%" },
    ],
  },
  {
    id: "chile", name: "Acuerdo de Libre Comercio Perú – Chile", shortName: "TLC Perú - Chile",
    type: "TLC", status: "vigente", yearSigned: 2006, yearInForce: 2009,
    countries: ["Chile"], countryIds: ["CHL"], flags: ["🇨🇱"],
    tariffGeneral: "0%", tariffAgro: "0%",
    keyProducts: ["Uvas", "Paltas", "Mandarinas", "Pisco", "Quinua", "Textiles"],
    description: "Eliminación total de aranceles para el comercio bilateral. Chile es hub de distribución regional para Sudamérica.",
    productTariffs: [
      { product: "Pisco", tariff: "0%" }, { product: "Quinua", tariff: "0%" },
      { product: "Uvas", tariff: "0%" }, { product: "Textiles", tariff: "0%" },
    ],
  },
  {
    id: "mercosur", name: "Acuerdo de Complementación Económica Nº 58", shortName: "ACE 58 – Mercosur",
    type: "ACE", status: "vigente", yearSigned: 2005, yearInForce: 2005,
    countries: ["Brasil"], countryIds: ["BRA"], flags: ["🇧🇷"],
    tariffGeneral: "0-25%", tariffAgro: "5-15%",
    keyProducts: ["Café", "Cacao", "Quinua", "Textiles", "Espárragos"],
    description: "Acuerdo de complementación entre el Mercosur y la Comunidad Andina. Preferencias arancelarias variables según la partida arancelaria.",
    productTariffs: [
      { product: "Café", tariff: "6%" }, { product: "Quinua", tariff: "5%" },
      { product: "Espárragos", tariff: "8%" }, { product: "Textiles", tariff: "10%" },
    ],
  },
  {
    id: "can", name: "Comunidad Andina de Naciones (CAN)", shortName: "Comunidad Andina",
    type: "CAN", status: "vigente", yearSigned: 1969, yearInForce: 1988,
    countries: ["Bolivia"], countryIds: ["BOL"], flags: ["🇧🇴"],
    tariffGeneral: "0%", tariffAgro: "0%",
    keyProducts: ["Todos los productos agrícolas", "Manufacturas", "Textiles", "Alimentos procesados"],
    description: "Zona de libre comercio entre Bolivia, Colombia, Ecuador y Perú. Libre circulación de bienes, servicios, capitales y personas.",
    productTariffs: [
      { product: "Productos Agrícolas", tariff: "0%" }, { product: "Textiles", tariff: "0%" },
      { product: "Alimentos", tariff: "0%" }, { product: "Manufacturas", tariff: "0%" },
    ],
  },
];

export default function Agreements() {
  const [filter, setFilter] = useState<"all" | "TLC" | "CAN" | "ACE">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return AGREEMENTS.filter(a => {
      const matchesType = filter === "all" || a.type === filter;
      const matchesSearch = search === "" ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.countries.some(c => c.toLowerCase().includes(search.toLowerCase())) ||
        a.keyProducts.some(p => p.toLowerCase().includes(search.toLowerCase()));
      return matchesType && matchesSearch;
    });
  }, [filter, search]);

  const stats = useMemo(() => ({
    total: AGREEMENTS.length,
    tlc: AGREEMENTS.filter(a => a.type === "TLC").length,
    vigente: AGREEMENTS.filter(a => a.status === "vigente").length,
    countries: AGREEMENTS.reduce((acc, a) => acc + a.countries.length, 0),
  }), []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Convenios y Acuerdos Comerciales del Perú</h2>
          <p className="text-slate-500 text-sm">Tratados vigentes que facilitan el acceso preferencial a mercados internacionales</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por país o producto..."
              className="pl-10 pr-4 py-2 text-sm focus:outline-none w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Acuerdos Totales", value: stats.total, bg: "bg-blue-50", text: "text-blue-700" },
          { label: "TLC Vigentes", value: stats.tlc, bg: "bg-emerald-50", text: "text-emerald-700" },
          { label: "Países Cubiertos", value: stats.countries, bg: "bg-purple-50", text: "text-purple-700" },
          { label: "Exportaciones Libres", value: "75%", bg: "bg-amber-50", text: "text-amber-700" },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} ${s.text} rounded-3xl p-5 text-center`}>
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="text-xs font-semibold mt-1 opacity-80">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {([
          { key: "all", label: "Todos" },
          { key: "TLC", label: "TLC" },
          { key: "CAN", label: "Comunidad Andina" },
          { key: "ACE", label: "Acuerdos Marco" },
        ] as const).map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              filter === tab.key
                ? "bg-primary-blue text-white border-primary-blue shadow-sm"
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map(a => <AgreementCard key={a.id} agreement={a} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <Globe className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="font-bold text-lg">No se encontraron acuerdos</p>
          <p className="text-sm">Intenta con otro término de búsqueda</p>
        </div>
      )}
    </div>
  );
}

function AgreementCard({ agreement }: { agreement: Agreement }) {
  const [expanded, setExpanded] = useState(false);

  const typeColors: Record<string, string> = {
    TLC: "bg-blue-100 text-blue-700",
    CAN: "bg-emerald-100 text-emerald-700",
    ACE: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center flex-wrap gap-2">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${typeColors[agreement.type]}`}>
            {agreement.type}
          </span>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
            ✓ Vigente desde {agreement.yearInForce}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-3 mb-3">
        <div className="flex -space-x-1">
          {agreement.flags.map((flag, i) => (
            <span key={i} className="text-2xl leading-none">{flag}</span>
          ))}
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-sm leading-tight">{agreement.shortName}</h3>
          <p className="text-xs text-slate-400">{agreement.countries.join(", ")}</p>
        </div>
      </div>

      <p className="text-xs text-slate-600 mb-4 leading-relaxed">{agreement.description}</p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-emerald-50 rounded-2xl p-3 text-center">
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">Arancel General</p>
          <p className="text-xl font-bold text-emerald-700">{agreement.tariffGeneral}</p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-3 text-center">
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">Agropecuario</p>
          <p className="text-xl font-bold text-blue-700">{agreement.tariffAgro}</p>
        </div>
      </div>

      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Productos Clave</p>
        <div className="flex flex-wrap gap-1.5">
          {agreement.keyProducts.slice(0, expanded ? undefined : 4).map((p, i) => (
            <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-[11px] font-medium">
              {p}
            </span>
          ))}
          {!expanded && agreement.keyProducts.length > 4 && (
            <button
              onClick={() => setExpanded(true)}
              className="px-2.5 py-1 bg-primary-blue/10 text-primary-blue rounded-full text-[11px] font-medium hover:bg-primary-blue/20"
            >
              +{agreement.keyProducts.length - 4} más
            </button>
          )}
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Aranceles por Producto</p>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {agreement.productTariffs.map((pt, i) => (
              <div key={i} className="flex justify-between items-center bg-slate-50 rounded-xl px-3 py-2">
                <span className="text-xs text-slate-600">{pt.product}</span>
                <span className={`text-xs font-bold ${pt.tariff === "0%" ? "text-emerald-600" : "text-amber-600"}`}>
                  {pt.tariff}
                </span>
              </div>
            ))}
          </div>
          <button onClick={() => setExpanded(false)} className="text-xs text-slate-400 hover:text-slate-600 font-medium flex items-center space-x-1">
            <ChevronUp className="w-3 h-3" />
            <span>Ver menos</span>
          </button>
        </div>
      )}

      {!expanded && (
        <button onClick={() => setExpanded(true)} className="mt-4 text-xs text-primary-blue hover:underline font-medium flex items-center space-x-1">
          <ChevronDown className="w-3 h-3" />
          <span>Ver aranceles por producto</span>
        </button>
      )}
    </div>
  );
}
