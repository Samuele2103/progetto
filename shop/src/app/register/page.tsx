'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, passwd }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registrazione fallita');
      } else {
        setSuccess('Registrazione completata! Reindirizzamento...');
        setTimeout(() => router.push('/'), 1000);
      }
    } catch (err) {

      console.error("Errore durante la registrazione:", err);
      setError('Errore di rete. Riprovare.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 cursor-default">
          Crea un nuovo account
        </h1>

        {error && <div className="bg-red-100 text-red-700 text-sm p-3 rounded-lg text-center">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 text-sm p-3 rounded-lg text-center">{success}</div>}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition cursor-pointer"
          >
            Registrati
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 cursor-default">
          Hai già un account?{' '}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">Accedi</a>
        </p>
      </div>
    </div>
  );
}