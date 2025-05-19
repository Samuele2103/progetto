import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Rotta POST per acquistare tutti i prodotti presenti nel carrello
router.post("/purchase-cart", async (req, res) => {
  const userId = req.session?.user?.id; 
  const products = req.body.products;

  if (!userId) {
    return res.status(401).json({ message: "Utente non autenticato" });
  }

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Nessun prodotto nel carrello" });
  }

  try {
    const tasks = products.map((product) => {
      return new Promise((resolve, reject) => {
        const orderNumber = `ORD-${Date.now()}-${userId}-${product.id}`;
        const total = product.price;

        db.query(
          "INSERT INTO order_histories (order_number, total, purchase_date, user_id) VALUES (?, ?, NOW(), ?)",
          [orderNumber, total, userId],
          (err) => {
            if (err) return reject(`Errore inserimento ordine per ID ${product.id}`);

            db.query("DELETE FROM product WHERE id = ?", [product.id], (err2) => {
              if (err2) return reject(`Errore rimozione prodotto ID ${product.id}`);
              resolve();
            });
          }
        );
      });
    });

    await Promise.all(tasks);

    res.status(200).json({ message: "Carrello acquistato con successo" });

  } catch (error) {
    console.error("❌ Errore durante acquisto carrello:", error);
    res.status(500).json({ message: "Errore durante l'acquisto", detail: error });
  }
});

export default router;