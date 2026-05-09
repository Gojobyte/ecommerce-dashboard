import { DollarSign, ShoppingCart, Users, Package, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/Card";

const icons = {
  dollar: DollarSign,
  cart: ShoppingCart,
  users: Users,
  package: Package,
};

interface StatsCardProps {
  title: string;
  value: string;
  change: number | null;
  icon: keyof typeof icons;
}

export function StatsCard({ title, value, change, icon }: StatsCardProps) {
  const Icon = icons[icon];

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          {change !== null && (
            <div className={`flex items-center gap-1 text-sm font-medium ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
              {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(change)}%
            </div>
          )}
        </div>
        <div className="mt-4">
          <p className="text-sm text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        </div>
      </div>
    </Card>
  );
}
