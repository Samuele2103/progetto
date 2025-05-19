"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 

export default function Navbar() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); 

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUsername(data.user.username);
      })
      .catch(() => {
        setUsername(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    setUsername(null);
    router.push('/');
  };

  return (
    <nav className="w-full flex items-center justify-between p-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 sticky top-0 z-50 shadow-lg">
      <div className="text-2xl font-bold text-white">
        <Link href="/home">GameStore</Link>
      </div>
      <div className="flex items-center space-x-6 text-white text-lg">
        <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
        <Link href="/products" className="hover:text-yellow-300 transition">Prodotti</Link>
        <Link href="/orders" className="hover:text-yellow-300 transition">I miei ordini</Link>
        <Link href="/cart" className="hover:text-yellow-300 transition">Carrello</Link>
        <Link href="/reviews" className="hover:text-yellow-300 transition">Recensioni</Link>
        <Link href="/contact" className="hover:text-yellow-300 transition">Contatti</Link>
  
        {!loading ? (
          username ? (
            <>
              {username.endsWith("a") ? (
                <span className="ml-6 font-semibold cursor-default">Benvenuta {username}</span>
              ) : (
                <span className="ml-6 font-semibold cursor-default">Benvenuto {username}</span>
              )}
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="ml-6 bg-white text-indigo-600 font-bold py-2 px-4 rounded-xl hover:bg-yellow-300 hover:text-black transition"
            >
              Accedi
            </Link>
          )
        ) : null}
      </div>
    </nav>
  );
}