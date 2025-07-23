
import bcrypt from 'bcrypt';
import prisma from '@/app/lib/prisma';

export async function registerUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return user;
}