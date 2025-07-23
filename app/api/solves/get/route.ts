import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { authOptions } from "@/app/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const solves = await prisma.solve.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(solves);
  } catch (error) {
    console.error("Error fetching solves:", error);
    return NextResponse.json({ error: "Failed to fetch solves" }, { status: 500 });
  }
}
