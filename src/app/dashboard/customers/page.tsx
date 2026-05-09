import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import prisma from "@/lib/prisma";

interface CustomersPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function CustomersPage({ searchParams }: CustomersPageProps) {
  const { search } = await searchParams;

  const where: Record<string, unknown> = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const customers = await prisma.customer.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const totalCustomers = await prisma.customer.count();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
        <p className="text-slate-500">{totalCustomers} total customers</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Customers</CardTitle>
            <input
              type="text"
              placeholder="Search customers..."
              defaultValue={search || ""}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="h-48 bg-slate-100 animate-pulse rounded" />}>
            {customers.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No customers found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Name</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Email</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Phone</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Orders</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Total Spent</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {customers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm font-medium text-slate-900">{customer.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{customer.email}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{customer.phone || "—"}</td>
                        <td className="px-4 py-3 text-sm text-slate-900">{customer.totalOrders}</td>
                        <td className="px-4 py-3 text-sm font-medium text-slate-900">${customer.totalSpent.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-slate-500">{new Date(customer.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
