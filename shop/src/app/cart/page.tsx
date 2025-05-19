"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Image from "next/image";

type CartItem = {
  id: number;
  name_product: string;
  price: number;
  image: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const handlePurchase = async () => {
    const confirmed = confirm("Confermi l'acquisto di tutti i prodotti?");
    if (!confirmed) return;

    try {
      const res = await fetch("http://localhost:5000/api/purchase-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // fondamentale per il cookie di sessione
        body: JSON.stringify({ products: cart }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.removeItem("cart");
        setCart([]);
        alert("Acquisto completato con successo!");
      } else if (res.status === 401) {
        alert("Devi effettuare il login per acquistare.");
      } else {
        alert(`Errore durante l'acquisto: ${data.message}`);
      }
    } catch (err) {
      console.error("Errore durante la richiesta:", err);
      alert("Errore durante l'acquisto. Riprova.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white">
        <h1 className="text-4xl font-extrabold mb-8 text-center cursor-default">Il tuo carrello</h1>

        {cart.length === 0 ? (
          <p className="text-center text-lg cursor-default">Il carrello è vuoto.</p>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white/10 backdrop-blur-lg p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.image}
                      alt={item.name_product}
                      fill
                      className="rounded-xl object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold cursor-default">{item.name_product}</h2>
                    <p className="text-yellow-300 font-semibold cursor-default">
                      {item.price.toFixed(2)}€
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  Rimuovi
                </button>
              </div>
            ))}

            <div className="text-right mt-6">
              <h3 className="text-2xl font-bold cursor-default">Totale: {total}€</h3>
              <button
                onClick={handlePurchase}
                disabled={cart.length === 0}
                className="mt-4 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold text-black transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Acquista
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}