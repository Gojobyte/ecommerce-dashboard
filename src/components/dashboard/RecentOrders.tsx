import prisma from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export async function RecentOrders() {
  const orders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { customer: true },
  });

  if (orders.length === 0) {
    return <p className="text-slate-500 text-sm">No orders yet.</p>;
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
          <div>
            <p className="text-sm font-medium text-slate-900">{order.invoiceNumber || `Order #${order.id.slice(0, 8)}`}</p>
            <p className="text-xs text-slate-500">{order.customer.name} · {formatDate(order.createdAt)}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-900">${order.total.toFixed(2)}</span>
            <Badge variant={
              order.status === "DELIVERED" ? "success" :
              order.status === "CANCELLED" ? "danger" :
              order.status === "SHIPPED" ? "info" :
              order.status === "CONFIRMED" ? "info" :
              "warning"
            }>{order.status}</Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
