'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(''); // reset error

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        credentials: 'include', //  per cookie di sessione
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: passwd }), // usa 'password', non 'passwd'
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || data.message || 'Errore durante il login');
      } else {
        router.push('/'); // redirect alla home
      }
    } catch (err) {
      console.error('Errore durante il login:', err);
      setError('Errore di rete o server non raggiungibile');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 cursor-default">
          Accedi al tuo account
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="esempio@email.com"
            />
          </div>

          <div>
            <label htmlFor="passwd" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="passwd"
              type="password"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition cursor-pointer"
          >
            Accedi
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 cursor-default">
          Non hai un account?{' '}
          <Link href="/register">
          <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
            Registrati
          </span>
          </Link>
        </p>
      </div>
    </div>
  );
}