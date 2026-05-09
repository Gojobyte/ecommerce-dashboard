import { Suspense } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductTable } from "@/components/products/ProductTable";
import prisma from "@/lib/prisma";

interface ProductsPageProps {
  searchParams: Promise<{ search?: string; category?: string; page?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { search, category, page: pageStr } = await searchParams;
  const page = parseInt(pageStr || "1");
  const pageSize = 10;

  const where: Record<string, unknown> = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { sku: { contains: search, mode: "insensitive" } },
    ];
  }
  if (category) {
    where.categoryId = category;
  }

  const [products, total, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-500">{total} products in your store</p>
        </div>
        <Link href="/dashboard/products/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search products..."
          defaultValue={search || ""}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 max-w-sm"
        />
        <select
          defaultValue={category || ""}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <Suspense fallback={<div className="h-96 bg-slate-100 animate-pulse rounded-xl" />}>
        <ProductTable products={products.map(p => ({ ...p, category: p.category ? { name: p.category.name } : null }))} />
      </Suspense>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i}
              href={`/dashboard/products?page=${i + 1}${search ? `&search=${search}` : ""}${category ? `&category=${category}` : ""}`}
            >
              <Button variant={page === i + 1 ? "primary" : "outline"} size="sm">
                {i + 1}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
