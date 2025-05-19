"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "../../../interface/Product";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`http://localhost:5000/api/product`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Errore nel fetch dei prodotti:", error);
      }
    }

    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const alreadyInCart = cart.some((item: Product) => item.id === product.id);

    if (alreadyInCart) {
      alert("Questo prodotto è già nel carrello!");
      return;
    }

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Prodotto aggiunto al carrello!");
  };

  if (products.length === 0) {
    return <div className="text-center text-2xl p-10 text-white">Caricamento giochi...</div>;
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <h1 className="text-5xl font-extrabold mb-12 text-white text-center drop-shadow-lg animate-pulse cursor-default">
          I nostri prodotti
        </h1>

        {/* Barra di ricerca + filtri prezzo */}
        <div className="w-full max-w-4xl mb-12 space-y-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cerca un prodotto..."
            className="w-full px-6 py-3 rounded-xl shadow-md text-lg outline-none bg-white text-black placeholder-gray-500"
          />
          <div className="flex gap-4">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="Prezzo minimo"
              className="w-1/2 px-4 py-2 rounded-lg text-black bg-green-100 placeholder-gray-600"
              min={0}
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="Prezzo massimo"
              className="w-1/2 px-4 py-2 rounded-lg text-black bg-red-100 placeholder-gray-600"
              min={0}
            />
          </div>
        </div>

        {["console", "pc", "accessorio console", "accessorio pc", "gioco"].map((category) => {
          const filtered = products
            .filter((p) => p.type.toLowerCase() === category)
            .filter((p) =>
              p.name_product.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter((p) => {
              const price = p.price;
              const minOk = minPrice === "" || price >= minPrice;
              const maxOk = maxPrice === "" || price <= maxPrice;
              return minOk && maxOk;
            });

          if (filtered.length === 0) return null;

          return (
            <section key={category} className="w-full max-w-7xl mb-16">
              <h2 className="text-4xl font-extrabold text-yellow-300 underline underline-offset-4 text-center mb-10 capitalize tracking-wide cursor-default">
                {category === "console" && "🎮 Console"}
                {category === "pc" && "🖥️ PC"}
                {category === "accessorio console" && "🧩 Accessori Console"}
                {category === "accessorio pc" && "🧩 Accessori PC"}
                {category === "gioco" && "🎮 Giochi"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filtered.map((product) => (
                  <div
                    key={product.id}
                    className="group border rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-300 bg-white/10 backdrop-blur-lg hover:bg-white/20"
                  >
                    <div className="relative w-full aspect-video">
                      <Image
                        src={product.image}
                        alt={product.name_product}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-300 cursor-default">
                        {product.name_product}
                      </h3>
                      <p className="text-pink-200 text-lg cursor-default">
                        {product.type} • <span className="font-semibold">{product.price.toFixed(2)}€</span>
                      </p>
                      <p className="text-white text-sm mt-2 cursor-default">
                        {product.description}
                      </p>

                      <div className="mt-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-green-400 hover:bg-green-500 text-black font-semibold py-2 px-4 rounded-xl transition cursor-pointer"
                        >
                          Aggiungi al carrello
                        </button>
                        <button
                          onClick={async () => {
                            const confirmed = confirm(`Acquistare "${product.name_product}"?`);
                            if (!confirmed) return;

                            try {
                              const res = await fetch(`http://localhost:5000/api/product/purchase/${product.id}`, {
                                method: 'POST',
                                credentials: 'include',
                              });

                              const data = await res.json();

                              if (res.ok) {
                                setProducts((prev) => prev.filter((p) => p.id !== product.id));
                                alert("Prodotto acquistato e salvato nello storico!");
                              } else if (res.status === 401) {
                                alert("Devi effettuare l'accesso per acquistare un prodotto.");
                              } else {
                                alert(`Errore: ${data.message || "Errore sconosciuto"}`);
                              }
                            } catch (err) {
                              alert("Errore durante l'acquisto. Riprova.");
                              console.error("Errore:", err);
                            }
                          }}
                          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-xl transition cursor-pointer"
                        >
                          Compra ora
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>
      <Footer />
    </>
  );
};

export default ProductsPage;