"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Delivered", value: 45, color: "#22C55E" },
  { name: "Shipped", value: 20, color: "#8B5CF6" },
  { name: "Confirmed", value: 15, color: "#3B82F6" },
  { name: "Pending", value: 12, color: "#F59E0B" },
  { name: "Cancelled", value: 8, color: "#EF4444" },
];

export function OrdersChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`${value} orders`, ""]} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
