"use client";

import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart,
} from "recharts";
import {
  LayoutDashboard, ShoppingCart, Package, Users, Settings, TrendingUp,
  DollarSign, Eye, ShoppingBag, ArrowUpRight, ArrowDownRight,
  Search, Bell, Menu, X, ChevronDown, Star, Filter,
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────
const revenueData = [
  { month: "Jan", revenue: 4200, orders: 120, visitors: 2400 },
  { month: "Fév", revenue: 5100, orders: 145, visitors: 2800 },
  { month: "Mar", revenue: 4800, orders: 132, visitors: 2600 },
  { month: "Avr", revenue: 6200, orders: 178, visitors: 3200 },
  { month: "Mai", revenue: 5800, orders: 165, visitors: 3000 },
  { month: "Jun", revenue: 7100, orders: 198, visitors: 3800 },
  { month: "Jul", revenue: 6800, orders: 185, visitors: 3600 },
  { month: "Aoû", revenue: 7500, orders: 210, visitors: 4100 },
  { month: "Sep", revenue: 8200, orders: 235, visitors: 4500 },
  { month: "Oct", revenue: 7800, orders: 220, visitors: 4200 },
  { month: "Nov", revenue: 9100, orders: 265, visitors: 5100 },
  { month: "Déc", revenue: 10200, orders: 298, visitors: 5800 },
];

const categoryData = [
  { name: "Électronique", value: 35, color: "#3b82f6" },
  { name: "Vêtements", value: 25, color: "#22c55e" },
  { name: "Maison", value: 20, color: "#f59e0b" },
  { name: "Sport", value: 12, color: "#ef4444" },
  { name: "Autres", value: 8, color: "#8b5cf6" },
];

const ordersData = [
  { id: "#ORD-7829", client: "Amadou Ibrahim", product: "MacBook Pro M3", amount: 2499, status: "Livré", date: "2026-05-10", avatar: "AI" },
  { id: "#ORD-7828", client: "Fatima Hassan", product: "iPhone 15 Pro", amount: 1199, status: "En cours", date: "2026-05-09", avatar: "FH" },
  { id: "#ORD-7827", client: "Youssouf Ali", product: "AirPods Pro 2", amount: 279, status: "Livré", date: "2026-05-09", avatar: "YA" },
  { id: "#ORD-7826", client: "Marie Dubois", product: "Samsung S24 Ultra", amount: 1299, status: "En attente", date: "2026-05-08", avatar: "MD" },
  { id: "#ORD-7825", client: "Jean-Pierre", product: "iPad Air M2", amount: 799, status: "Livré", date: "2026-05-08", avatar: "JP" },
  { id: "#ORD-7824", client: "Amina Oumar", product: "Watch Ultra 2", amount: 899, status: "En cours", date: "2026-05-07", avatar: "AO" },
  { id: "#ORD-7823", client: "Brahim Saleh", product: "PS5 Pro", amount: 699, status: "Livré", date: "2026-05-07", avatar: "BS" },
  { id: "#ORD-7822", client: "Zeinab Abakar", product: "Sony WH-1000XM5", amount: 399, status: "Annulé", date: "2026-05-06", avatar: "ZA" },
];

const topProducts = [
  { name: "MacBook Pro M3", sales: 234, revenue: 584766, growth: 12.5, image: "💻" },
  { name: "iPhone 15 Pro", sales: 189, revenue: 226611, growth: 8.3, image: "📱" },
  { name: "AirPods Pro 2", sales: 156, revenue: 43524, growth: -2.1, image: "🎧" },
  { name: "Samsung S24 Ultra", sales: 134, revenue: 174066, growth: 15.7, image: "📱" },
  { name: "iPad Air M2", sales: 98, revenue: 78302, growth: 5.4, image: "📟" },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: ShoppingCart, label: "Commandes", badge: 24 },
  { icon: Package, label: "Produits", badge: 156 },
  { icon: Users, label: "Clients", badge: 12 },
  { icon: TrendingUp, label: "Analytics" },
  { icon: Settings, label: "Paramètres" },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Livré": "bg-green-500/15 text-green-400",
    "En cours": "bg-blue-500/15 text-blue-400",
    "En attente": "bg-yellow-500/15 text-yellow-400",
    "Annulé": "bg-red-500/15 text-red-400",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-500/15 text-gray-400"}`}>
      {status}
    </span>
  );
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Sidebar */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed top-0 left-0 z-50 h-full w-[260px] bg-[#1e293b] border-r border-[#334155] flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-3 px-6 py-5 border-b border-[#334155]">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm">EC</div>
          <div>
            <h1 className="text-white font-bold text-sm">E-Commerce</h1>
            <p className="text-[#64748b] text-xs">Dashboard Pro</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-[#64748b] hover:text-white"><X size={20} /></button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button key={item.label} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${item.active ? "bg-blue-500/15 text-blue-400 font-medium" : "text-[#94a3b8] hover:text-white hover:bg-white/5"}`}>
              <item.icon size={18} />
              <span>{item.label}</span>
              {item.badge && <span className="ml-auto bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full">{item.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-[#334155]">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">AS</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">Adoum Salah</p>
              <p className="text-[#64748b] text-xs truncate">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-[260px] min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#0f172a]/80 backdrop-blur-xl border-b border-[#1e293b]">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[#94a3b8] hover:text-white"><Menu size={22} /></button>
              <div>
                <h2 className="text-white font-semibold text-lg">Dashboard</h2>
                <p className="text-[#64748b] text-xs">Bienvenue, Adoum 👋</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-[#1e293b] border border-[#334155] rounded-lg px-3 py-2">
                <Search size={16} className="text-[#64748b]" />
                <input type="text" placeholder="Rechercher..." className="bg-transparent text-sm text-white placeholder-[#64748b] outline-none w-40" />
              </div>
              <button className="relative text-[#94a3b8] hover:text-white">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-[10px] text-white flex items-center justify-center">3</span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { title: "Revenue Total", value: "82 600 €", change: 12.5, icon: DollarSign, color: "bg-blue-500/15 text-blue-400", subtitle: "Ce mois: 10 200 €" },
              { title: "Commandes", value: "2 390", change: 8.2, icon: ShoppingCart, color: "bg-green-500/15 text-green-400", subtitle: "En attente: 24" },
              { title: "Visiteurs", value: "46 100", change: 15.3, icon: Eye, color: "bg-purple-500/15 text-purple-400", subtitle: "Taux conv: 5.2%" },
              { title: "Panier Moyen", value: "89 €", change: -2.1, icon: ShoppingBag, color: "bg-yellow-500/15 text-yellow-400", subtitle: "Objectif: 100 €" },
            ].map((stat) => (
              <div key={stat.title} className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 hover:border-[#475569] transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[#94a3b8] text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    <p className="text-[#64748b] text-xs mt-1">{stat.subtitle}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}><stat.icon size={20} /></div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  {stat.change >= 0 ? <ArrowUpRight size={16} className="text-green-400" /> : <ArrowDownRight size={16} className="text-red-400" />}
                  <span className={`text-sm font-medium ${stat.change >= 0 ? "text-green-400" : "text-red-400"}`}>{stat.change >= 0 ? "+" : ""}{stat.change}%</span>
                  <span className="text-[#64748b] text-xs ml-1">vs mois dernier</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-[#1e293b] border border-[#334155] rounded-xl p-5">
              <h3 className="text-white font-semibold">Revenue Mensuel</h3>
              <p className="text-[#64748b] text-sm mt-1 mb-6">Évolution sur 12 mois</p>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#f1f5f9" }} />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5">
              <h3 className="text-white font-semibold">Catégories</h3>
              <p className="text-[#64748b] text-sm mt-1">Répartition des ventes</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                    {categoryData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#f1f5f9" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-[#94a3b8] text-sm">{cat.name}</span>
                    </div>
                    <span className="text-white text-sm font-medium">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Orders + Products */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-[#1e293b] border border-[#334155] rounded-xl p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-white font-semibold">Commandes Récentes</h3>
                  <p className="text-[#64748b] text-sm mt-1">Dernières transactions</p>
                </div>
                <button className="flex items-center gap-1 text-[#94a3b8] hover:text-white text-sm"><Filter size={14} />Filtrer</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#334155]">
                      <th className="text-left text-[#64748b] font-medium py-3 px-2">Commande</th>
                      <th className="text-left text-[#64748b] font-medium py-3 px-2">Client</th>
                      <th className="text-left text-[#64748b] font-medium py-3 px-2 hidden md:table-cell">Produit</th>
                      <th className="text-left text-[#64748b] font-medium py-3 px-2">Montant</th>
                      <th className="text-left text-[#64748b] font-medium py-3 px-2">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersData.slice(0, 6).map((order) => (
                      <tr key={order.id} className="border-b border-[#1e293b] hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-2 text-white font-medium">{order.id}</td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[10px] font-bold">{order.avatar}</div>
                            <span className="text-[#94a3b8]">{order.client}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-[#94a3b8] hidden md:table-cell">{order.product}</td>
                        <td className="py-3 px-2 text-white font-medium">{order.amount} €</td>
                        <td className="py-3 px-2"><StatusBadge status={order.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5">
              <h3 className="text-white font-semibold">Top Produits</h3>
              <p className="text-[#64748b] text-sm mt-1 mb-5">Meilleurs ventes</p>
              <div className="space-y-4">
                {topProducts.map((product, i) => (
                  <div key={product.name} className="flex items-center gap-3">
                    <span className="text-[#64748b] text-sm font-medium w-5">{i + 1}</span>
                    <div className="w-10 h-10 rounded-lg bg-[#0f172a] flex items-center justify-center text-xl">{product.image}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{product.name}</p>
                      <p className="text-[#64748b] text-xs">{product.sales} ventes</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-sm font-medium">{product.revenue.toLocaleString()} €</p>
                      <p className={`text-xs flex items-center gap-0.5 justify-end ${product.growth >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {product.growth >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {Math.abs(product.growth)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
