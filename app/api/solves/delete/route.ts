import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/auth';
import prisma from '@/app/lib/prisma';

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

 const { solveId } = await req.json();
if (!solveId) {
  return NextResponse.json({ error: 'Missing solveId' }, { status: 400 });
}

  try {
    // Check if solve exists and belongs to the user
    const solve = await prisma.solve.findUnique({
      where: { id: solveId },
      select: { userId: true },
    });

    if (!solve) {
      return NextResponse.json({ error: 'Solve not found' }, { status: 404 });
    }

    if (solve.userId !== session.user.id) {
      return NextResponse.json({ error: 'Not authorized to delete this solve' }, { status: 403 });
    }

    // Delete solve by id
    await prisma.solve.delete({
      where: { id: solveId },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
