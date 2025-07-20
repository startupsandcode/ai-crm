'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (!error) {
      // Get redirect path from URL
      const searchParams = new URLSearchParams(window.location.search);
      const redirectedFrom = searchParams.get('redirectedFrom');

      // Only redirect to safe internal paths
      const redirectPath = redirectedFrom?.startsWith('/') ? redirectedFrom : '/dashboard';
      router.push(redirectPath);
    } else {
      alert(error.message);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4 pt-20 text-white text-center relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-purple-800/10 z-0" />
      <div className="absolute top-24 left-1/3 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-1/3 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-2000" />

      <div className="relative z-10 w-full max-w-md glass-effect p-8 rounded-xl shadow-xl border border-white/10">
        <h2 className="text-3xl font-bold mb-6">Welcome Back</h2>

        <input
          className="w-full px-4 py-3 mb-4 rounded bg-white/10 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full px-4 py-3 mb-6 rounded bg-white/10 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="btn-primary w-full py-3 rounded-lg font-bold text-lg"
        >
          Log In
        </button>

        <p className="text-white/60 text-sm mt-6">
          Don’t have an account?{' '}
          <Link className="underline text-blue-400" href="/auth/signup">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
