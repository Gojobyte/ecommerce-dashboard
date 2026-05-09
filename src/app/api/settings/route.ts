import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const settings = await prisma.storeSettings.findFirst();
  return NextResponse.json(settings || {});
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const existing = await prisma.storeSettings.findFirst();
  if (existing) {
    const updated = await prisma.storeSettings.update({ where: { id: existing.id }, data: body });
    return NextResponse.json(updated);
  }
  const created = await prisma.storeSettings.create({ data: body });
  return NextResponse.json(created);
}
