'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { signIn } from 'next-auth/react';
import { RegisterForm } from '@/components/register-form';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Something went wrong.');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className='max-h-screen pt-40 flex items-center justify-center px-4'>
      <div className="min-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Card>
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold">Sign Up</h1>
                <p className="text-muted-foreground">Create your Cube Log Account</p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating...' : 'Create Account'}
              </Button>

              <div className="relative text-center text-sm">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" />
                </div>
                <span className="relative z-10 bg-white px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              <Button
                type="button"
                onClick={() => signIn('google')}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <img
                  src="https://img.icons8.com/?size=160&id=DJgXlKerU6K0&format=png"
                  width={20}
                  height={20}
                  alt="Google"
                />
                Sign Up with Google
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
