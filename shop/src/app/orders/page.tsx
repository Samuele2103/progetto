"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Order } from "../../../interface/Order";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrdersForUser() {
      try {
        //  Ottieni l’utente loggato
        const userRes = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include",
        });
        const userData = await userRes.json();

        if (!userRes.ok || !userData.user) {
          setError("Non sei loggato.");
          return;
        }

        const userId = userData.user.id;

        //  Ottieni gli ordini di quell’utente
        const ordersRes = await fetch(`http://localhost:5000/api/product/orders/${userId}`);
        const ordersData = await ordersRes.json();

        if (!ordersRes.ok) {
          setError(ordersData.message || "Errore nel caricamento degli ordini");
        } else {
          setOrders(ordersData);
        }
      } catch (err) {
        console.error("Errore fetch ordini:", err);
        setError("Errore di rete");
      }
    }

    fetchOrdersForUser();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-indigo-700 to-pink-500 text-white px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-10 cursor-default">I miei ordini</h1>

          {error && <p className="text-red-200 text-center">{error}</p>}

          {orders.length === 0 && !error && (
            <p className="text-center text-white/80 cursor-default">Non hai ancora effettuato ordini.</p>
          )}

          <ul className="space-y-6">
            {orders.map((order, index) => (
              <li
                key={index}
                className="bg-white/10 backdrop-blur p-5 rounded-xl shadow-lg flex flex-col sm:flex-row sm:justify-between"
              >
                <div>
                  <p className="text-lg font-semibold cursor-default">Ordine: {order.order_number}</p>
                  <p className="text-sm text-white/80 cursor-default">
                    Data: {new Date(order.purchase_date).toLocaleString("it-IT")}
                  </p>
                </div>
                <p className="text-xl font-bold text-yellow-300 mt-3 sm:mt-0 cursor-default">
                  Totale: {order.total.toFixed(2)} €
                </p>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}