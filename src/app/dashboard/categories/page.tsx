import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import prisma from "@/lib/prisma";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  _count?: { products: number };
}

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
          <p className="text-slate-500">{categories.length} categories</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">{category.name}</h3>
                <p className="text-xs text-slate-500 mt-1">/{category.slug}</p>
                {category.description && (
                  <p className="text-sm text-slate-600 mt-2">{category.description}</p>
                )}
              </div>
              <Badge>{category._count?.products || 0} products</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
