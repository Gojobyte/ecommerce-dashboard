import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  const [totalRevenue, totalOrders, totalCustomers, totalProducts] = await Promise.all([
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: "CANCELLED" } } }),
    prisma.order.count(),
    prisma.customer.count(),
    prisma.product.count({ where: { isActive: true } }),
  ]);

  return NextResponse.json({
    totalRevenue: totalRevenue._sum.total || 0,
    totalOrders,
    totalCustomers,
    totalProducts,
  });
}
