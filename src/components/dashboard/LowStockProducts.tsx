import prisma from "@/lib/prisma";
import { AlertTriangle } from "lucide-react";

export async function LowStockProducts() {
  const products = await prisma.product.findMany({
    where: { stock: { lte: 10, gt: 0 }, isActive: true },
    take: 5,
    orderBy: { stock: "asc" },
  });

  if (products.length === 0) {
    return <p className="text-slate-500 text-sm">All products are well stocked ✓</p>;
  }

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <div key={product.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-amber-50 rounded">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">{product.name}</p>
              <p className="text-xs text-slate-500">SKU: {product.sku || "N/A"}</p>
            </div>
          </div>
          <span className="text-sm font-semibold text-amber-600">{product.stock} left</span>
        </div>
      ))}
    </div>
  );
}
