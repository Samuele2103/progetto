"use client";

import { useEffect, useState } from "react";
import { Review } from "../../../interface/Review";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function Page() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [canReview, setCanReview] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [description, setDescription] = useState("");
  const [evaluation, setEvaluation] = useState(5);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("http://localhost:5000/api/review");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Errore nel fetch delle recensioni:", error);
      } finally {
        setLoading(false);
      }
    }

    async function checkLoginAndEligibility() {
      try {
        const res = await fetch("http://localhost:5000/api/review/orders/completed", {
          credentials: "include",
        });

        if (res.status === 401) {
          setIsLoggedIn(false);
          return;
        }

        const data = await res.json();
        setIsLoggedIn(true);
        setCanReview(data.hasCompletedOrders);
      } catch (error) {
        console.error("Errore nel controllo login/ordini:", error);
      }
    }

    fetchReviews();
    checkLoginAndEligibility();
  }, []);

  async function submitReview(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ description, evaluation }),
      });

      if (!res.ok) throw new Error("Errore nel salvataggio");

      const newReview = await res.json();
      setReviews([...reviews, newReview]);
      setMessage("Recensione inviata con successo!");
      setDescription("");
      setEvaluation(5);
    } catch (error) {
      console.error("Errore nell'invio della recensione:", error);
      setMessage("Errore nell'invio della recensione.");
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <h1 className="text-5xl font-extrabold mb-12 text-white text-center drop-shadow-lg animate-pulse cursor-default">
          Le nostre Recensioni
        </h1>

        {isLoggedIn && canReview && (
          <form
            onSubmit={submitReview}
            className="bg-white/20 p-6 rounded-2xl shadow-xl mb-12 w-full max-w-xl text-white backdrop-blur-lg"
          >
            <h2 className="text-2xl font-semibold mb-4 cursor-default">Lascia una recensione</h2>
            <textarea
              className="w-full p-3 rounded bg-white/30 text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Scrivi la tua esperienza..."
              required
            />
            <div className="mt-4 flex items-center gap-4">
              <label className="text-white">Valutazione (1-5):</label>
              <input
                type="number"
                min="1"
                max="5"
                value={evaluation}
                onChange={(e) => setEvaluation(Number(e.target.value))}
                className="w-16 p-1 rounded text-black"
              />
            </div>
            <button
              type="submit"
              className="mt-6 px-4 py-2 bg-indigo-800 hover:bg-indigo-900 rounded-xl text-white font-bold transition cursor-pointer"
            >
              Invia Recensione
            </button>
            {message && <p className="mt-4">{message}</p>}
          </form>
        )}

        {isLoggedIn && !canReview && (
          <div className="text-white text-xl mb-12 bg-white/10 p-6 rounded-xl">
            Puoi lasciare una recensione solo dopo aver completato un ordine.
          </div>
        )}

        {!isLoggedIn && (
          <div className="text-white text-xl mb-12 bg-white/10 p-6 rounded-xl">
            Devi <strong>accedere</strong> per lasciare una recensione.
          </div>
        )}

        {loading ? (
          <div className="text-center text-2xl p-10 text-white">Caricamento recensioni...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-2xl p-10 text-white">Nessuna recensione disponibile</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl cursor-default">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 hover:bg-white/20 transition"
              >
                <h2 className="text-2xl font-bold text-white mb-4">
                  ⭐ {review.evaluation} / 5
                </h2>
                <p className="text-pink-200 text-lg">{review.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}