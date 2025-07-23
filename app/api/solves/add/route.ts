// app/api/solves/add/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache'; // Only works in app routes, not pages

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { time } = await req.json();

  if (!user.id) {
    return NextResponse.json({ error: 'User ID missing' }, { status: 400 });
  }

  // check to see if the time has already been added
  const existingSolve = await prisma.solve.findFirst({
    where: {
      userId: user.id,
      time,
      createdAt: {
        gte: new Date(Date.now() - 0.01 * 60 * 60 * 1000), // within the last minute
      },
    },
  });

  if (existingSolve) {
    return NextResponse.json({ error: 'Solve already added recently' });
  }

  await prisma.solve.create({
    data: {
      time,
      userId: user.id,
    },
  });

  // ✅ This revalidates the homepage or whichever path shows solves
  revalidatePath('/');

  return NextResponse.json({ success: true });
}
