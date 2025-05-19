"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Faq } from "../interface/Faq";
import Link from "next/link";

export default function Home() {
  const [faqs, setFaqs] = useState<Faq[]>([]); 

  useEffect(() => {
    fetch("http://localhost:5000/api/faq") 
      .then((res) => res.json())
      .then((data: Faq[]) => setFaqs(data))
      .catch((err) => console.error("Errore nel recupero FAQ:", err));
  }, []);

  return (
    <div className="flex flex-col gap-24 px-6 md:px-16 py-16 bg-gradient-to-b from-white via-gray-50 to-gray-100">
      {/* Hero Section */}
      <motion.section
        className="flex flex-col items-center text-center gap-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight cursor-default">
          Benvenuto su <span className="text-blue-600">GameStore</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed cursor-default">
          Il tuo punto di riferimento per videogiochi di ultima generazione, offerte imperdibili e tutte le novità del mondo gaming.
        </p>
        <Link href="/products">
          <button className="px-8 py-3 text-white font-semibold bg-blue-600 rounded-full hover:bg-blue-700 shadow-md transition cursor-pointer">
            Inizia a Esplorare
          </button>
        </Link>
      </motion.section>

      {/* About Section */}
      <motion.section
        className="flex flex-col items-center text-center gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 cursor-default">Chi siamo</h2>
        <p className="text-lg text-gray-600 max-w-2xl leading-relaxed cursor-default">
          Siamo una community di gamer appassionati. Su GameStore trovi i migliori titoli per PlayStation, Xbox, Nintendo e PC, sempre aggiornati e in promozione.
        </p>
      </motion.section>

      {/* Esplora GameStore Section */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="col-span-full text-3xl md:text-4xl font-bold text-gray-900 mb-4 cursor-default">
          Esplora GameStore
        </h2>

        {[
          {
            title: "Prodotti",
            description: "Scopri il nostro catalogo completo di giochi per ogni piattaforma.",
            href: "/products",
          },
          {
            title: "I miei ordini",
            description: "Visualizza lo storico dei tuoi acquisti.",
            href: "/orders",
          },
          {
            title: "Recensioni",
            description: "Leggi e condividi opinioni sui servizi che offriamo.",
            href: "/reviews",
          },
          {
            title: "Contatti",
            description: "Hai bisogno di supporto? Siamo qui per aiutarti.",
            href: "/contact",
          },
          {
            title: "Accedi",
            description: "Accedi al tuo profilo per acquistare e gestire il tuo account.",
            href: "/login",
          },
        ].map((item, index) => (
          <Link href={item.href} key={index}>
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg ring-1 ring-gray-200 hover:ring-blue-500 transition-all cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          </Link>
        ))}
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="flex flex-col items-center text-center gap-6 bg-blue-600 text-white p-10 md:p-14 rounded-3xl shadow-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold cursor-default">Non perdere le novità!</h2>
        <p className="text-lg max-w-xl leading-relaxed cursor-default">
          Iscriviti alla nostra newsletter per ricevere sconti esclusivi e l’accesso anticipato ai giochi in uscita.
        </p>
        <Link href="/register">
          <button className="px-8 py-3 font-semibold bg-white text-blue-600 rounded-full hover:bg-gray-100 shadow transition cursor-pointer">
            Registrati Ora
          </button>
        </Link>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="flex flex-col items-center text-center gap-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 cursor-default">Domande Frequenti</h2>

        {faqs.length === 0 ? (
          <p className="text-gray-500 text-lg cursor-default">Nessuna FAQ disponibile al momento.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl cursor-pointer">
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg ring-1 ring-gray-200 hover:ring-blue-500 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{faq.title}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
}