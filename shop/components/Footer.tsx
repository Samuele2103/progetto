"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full p-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 backdrop-blur-lg text-white text-center mt-12">
      <p className="text-sm cursor-default">&copy; {new Date().getFullYear()} GameStore. Tutti i diritti riservati.</p>
      <div className="flex justify-center space-x-6 mt-4">
        <Link href="/privacy-policy" className="hover:text-yellow-300 transition">
            Privacy Policy
        </Link>
        <Link href="/terms-of-service" className="hover:text-yellow-300 transition">
            Termini di Servizio
        </Link>
        <Link href="/contact" className="hover:text-yellow-300 transition">
            Contattaci
        </Link>
      </div>
    </footer>
  );
}