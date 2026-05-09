"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Eye } from "lucide-react";

interface Order {
  id: string;
  invoiceNumber: string | null;
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: Date;
  customer: { name: string };
}

interface OrderTableProps {
  orders: Order[];
}

const statusVariant: Record<string, "warning" | "info" | "success" | "danger" | "default"> = {
  PENDING: "warning",
  CONFIRMED: "info",
  SHIPPED: "info",
  DELIVERED: "success",
  CANCELLED: "danger",
  REFUNDED: "default",
};

export function OrderTable({ orders }: OrderTableProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
        <p className="text-slate-500">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50">
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Order</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Customer</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Total</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
            <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <p className="text-sm font-medium text-blue-600">
                  {order.invoiceNumber || `#${order.id.slice(0, 8)}`}
                </p>
              </td>
              <td className="px-6 py-4 text-sm text-slate-900">{order.customer.name}</td>
              <td className="px-6 py-4 text-sm font-medium text-slate-900">${order.total.toFixed(2)}</td>
              <td className="px-6 py-4">
                <Badge variant={statusVariant[order.status] || "default"}>{order.status}</Badge>
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-right">
                <Link href={`/dashboard/orders/${order.id}`}>
                  <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
