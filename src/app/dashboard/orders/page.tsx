import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { OrderTable } from "@/components/orders/OrderTable";
import prisma from "@/lib/prisma";

interface OrdersPageProps {
  searchParams: Promise<{ status?: string; search?: string }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { status, search } = await searchParams;

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { invoiceNumber: { contains: search, mode: "insensitive" } },
      { customer: { name: { contains: search, mode: "insensitive" } } },
    ];
  }

  const orders = await prisma.order.findMany({
    where,
    include: { customer: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const stats = await prisma.groupBy({
    by: ["status"],
    _count: { status: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
        <p className="text-slate-500">{orders.length} orders found</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"].map((s) => {
          const stat = stats.find((st) => st.status === s);
          return (
            <Card key={s}>
              <div className="p-4 text-center">
                <p className="text-2xl font-bold text-slate-900">{stat?._count.status || 0}</p>
                <p className="text-xs text-slate-500 mt-1">{s}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search orders..."
          defaultValue={search || ""}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 max-w-sm"
        />
        <select
          defaultValue={status || ""}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <Suspense fallback={<div className="h-96 bg-slate-100 animate-pulse rounded-xl" />}>
        <OrderTable orders={orders.map(o => ({ ...o, customer: { name: o.customer.name } }))} />
      </Suspense>
    </div>
  );
}
