import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";


export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  return user;
}

export async function getUserId(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return JSON.stringify(user?.id) || null;
}

export async function getSolves(userId: string) {
  const solves = await prisma.solve.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  return solves;
}

export async function addSolve(req: Request) {
  const session = await getServerSession(authOptions);
  // Extract userId and time from the request body (assuming JSON)
  const { userId, time } = await req.json();

  const solve = await prisma.solve.create({
    data: {
      userId,
      time,
    },
  });
  return solve;
}


