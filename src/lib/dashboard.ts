import prisma from "@/lib/prisma";

export async function getDashboardProps() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  const [totalRevenue, totalOrders, totalCustomers, totalProducts, recentRevenue, oldRevenue, recentOrders, oldOrders, recentCustomers, oldCustomers] = await Promise.all([
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: "CANCELLED" } } }),
    prisma.order.count(),
    prisma.customer.count(),
    prisma.product.count({ where: { isActive: true } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { createdAt: { gte: thirtyDaysAgo }, status: { not: "CANCELLED" } } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo }, status: { not: "CANCELLED" } } }),
    prisma.order.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.order.count({ where: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } } }),
    prisma.customer.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.customer.count({ where: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } } }),
  ]);

  const calcChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  return {
    totalRevenue: totalRevenue._sum.total || 0,
    totalOrders,
    totalCustomers,
    totalProducts,
    revenueChange: calcChange(recentRevenue._sum.total || 0, oldRevenue._sum.total || 0),
    ordersChange: calcChange(recentOrders, oldOrders),
    customersChange: calcChange(recentCustomers, oldCustomers),
  };
}
