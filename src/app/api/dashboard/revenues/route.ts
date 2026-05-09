import { NextResponse } from "next/server";

export async function GET() {
  // Demo data - in production, aggregate from DB
  const data = [
    { month: "Jan", revenue: 4200 },
    { month: "Feb", revenue: 5800 },
    { month: "Mar", revenue: 4900 },
    { month: "Apr", revenue: 7200 },
    { month: "May", revenue: 6100 },
    { month: "Jun", revenue: 8400 },
    { month: "Jul", revenue: 7600 },
    { month: "Aug", revenue: 9200 },
    { month: "Sep", revenue: 8100 },
    { month: "Oct", revenue: 10500 },
    { month: "Nov", revenue: 9800 },
    { month: "Dec", revenue: 12400 },
  ];
  return NextResponse.json(data);
}
