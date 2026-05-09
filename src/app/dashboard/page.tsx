import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OrdersChart } from "@/components/dashboard/OrdersChart";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { LowStockProducts } from "@/components/dashboard/LowStockProducts";
import { getDashboardStats } from "@/lib/dashboard";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Welcome back! Here&apos;s your store overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} change={stats.revenueChange} icon="dollar" />
        <StatsCard title="Total Orders" value={stats.totalOrders.toString()} change={stats.ordersChange} icon="cart" />
        <StatsCard title="Total Customers" value={stats.totalCustomers.toString()} change={stats.customersChange} icon="users" />
        <StatsCard title="Total Products" value={stats.totalProducts.toString()} change={null} icon="package" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div className="h-64 bg-slate-100 animate-pulse rounded" />}>
              <RevenueChart />
            </Suspense>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Orders by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div className="h-64 bg-slate-100 animate-pulse rounded" />}>
              <OrdersChart />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div className="h-48 bg-slate-100 animate-pulse rounded" />}>
              <RecentOrders />
            </Suspense>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div className="h-48 bg-slate-100 animate-pulse rounded" />}>
              <LowStockProducts />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
