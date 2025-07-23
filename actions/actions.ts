import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return null;
  }
  // Fetch the user from the database using the email from the session
  const user = await prisma.user.findUnique({
    where: { email: session.user.email ?? undefined },
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
  console.log("Fetched solves:", solves);
  return solves;
}

export async function addSolve(time: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("User not authenticated");
  }

  const userId = await getUserId(session.user.email ?? "");
  if (!userId) {
    throw new Error("User not found");
  }

  const solve = await prisma.solve.create({
    data: {
      time: time.toString(),
      userId,
    },
  });

  console.log("Added solve:", solve);
  revalidatePath('/'); // Revalidate the path to update the solve list
  return solve;
}


export async function fetchSolves() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return [];

  try {
    const solves = await prisma.solve.findMany({ // or db.query.solves.findMany() for Drizzle
      where: { user: { email: session.user.email } },
      orderBy: { createdAt: 'desc' },
    });
    return solves;
  } catch (err) {
    console.error('Error fetching solves:', err);
    return [];
  }
}

