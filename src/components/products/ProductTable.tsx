"use client";

import { Edit2, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface Product {
  id: string;
  name: string;
  price: number;
  salePrice: number | null;
  stock: number;
  sku: string | null;
  isActive: boolean;
  category: { name: string } | null;
}

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
        <p className="text-slate-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50">
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">{product.name}</p>
                  <p className="text-xs text-slate-500">SKU: {product.sku || "N/A"}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <Badge>{product.category?.name || "Uncategorized"}</Badge>
              </td>
              <td className="px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">${product.price.toFixed(2)}</p>
                  {product.salePrice && (
                    <p className="text-xs text-green-600">Sale: ${product.salePrice.toFixed(2)}</p>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`text-sm font-medium ${product.stock <= 10 ? "text-red-600" : "text-slate-900"}`}>
                  {product.stock}
                </span>
              </td>
              <td className="px-6 py-4">
                <Badge variant={product.isActive ? "success" : "default"}>
                  {product.isActive ? "Active" : "Inactive"}
                </Badge>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <Link href={`/dashboard/products/${product.id}`}>
                    <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                  </Link>
                  <Link href={`/dashboard/products/${product.id}/edit`}>
                    <Button variant="ghost" size="sm"><Edit2 className="w-4 h-4" /></Button>
                  </Link>
                  <Button variant="ghost" size="sm"><Trash2 className="w-4 h-4 text-red-500" /></Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
