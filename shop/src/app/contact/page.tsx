"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useState } from "react";
import emailjs from "emailjs-com";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!form.name || !form.email || !form.message) {
      setError("Per favore, compila tutti i campi.");
      return;
    }

    try {
      const result = await emailjs.send(
        "service_ux6drop",   //  Inserisci qui il tuo SERVICE ID
        "template_2cvjysl",  //  Inserisci qui il tuo TEMPLATE ID
        form,
        "LKVipzaZT3o2NMOmp"    //  Inserisci qui la tua chiave pubblica EmailJS
      );

      if (result.status === 200) {
        setSuccess("Messaggio inviato con successo!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setError("Errore nell'invio del messaggio. Riprova.");
      }
    } catch (err) {
      console.error("Errore EmailJS:", err);
      setError("Errore di rete o configurazione email.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-800 to-pink-700 text-white px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-10">
          <h1 className="text-4xl font-extrabold text-center cursor-default">Contattaci</h1>
          <p className="text-center text-white/90 text-lg cursor-default">
            Hai domande o bisogno di assistenza? Siamo qui per aiutarti!
            Compila il modulo o contattaci direttamente.
          </p>

          <div className="space-y-2 text-white/90 cursor-default">
            <p><strong>📧 Email:</strong> <a href="mailto:samuele.bragalini@gmail.com" className="underline hover:text-yellow-300">samuele.bragalini@gmail.com</a></p>
            <p><strong>📞 Telefono:</strong> +39 392 637 9782 / +39 340 486 1897(lun–ven, 9:00–18:00)</p>
            <p><strong>💬 Live Chat:</strong> Per contattarci in caso di problemi.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-2xl space-y-6 text-gray-800">
            {success && <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center">{success}</div>}
            {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center">{error}</div>}

            <div>
              <label className="block font-semibold mb-1">Nome</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Messaggio</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition cursor-pointer"
            >
              Invia Messaggio
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}