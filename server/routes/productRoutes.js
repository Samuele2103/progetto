import express from "express";
import { db } from "../db.js";

const router = express.Router();

//  Recupera tutti i prodotti
router.get("/", (req, res) => {
  db.query(
    "SELECT id, name_product, type, price, image, description FROM product",
    (err, results) => {
      if (err) {
        console.error("Errore query:", err);
        res.status(500).json({ message: "Errore server" });
      } else {
        res.json(results);
      }
    }
  );
});

//  Recupera un prodotto per ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT id, name_product, type, price, image, description FROM product WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Errore query:", err);
        res.status(500).json({ message: "Errore server" });
      } else if (results.length === 0) {
        res.status(404).json({ message: "Prodotto non trovato" });
      } else {
        res.json(results[0]);
      }
    }
  );
});

//  Acquisto prodotto e registrazione ordine
router.post("/purchase/:productId", (req, res) => {
  const productId = req.params.productId;
  const userId = req.session?.user?.id; 

  if (!userId) {
    return res.status(401).json({ message: "Utente non autenticato" });
  }

  db.query("SELECT * FROM product WHERE id = ?", [productId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "Prodotto non trovato" });
    }

    const product = results[0];
    const orderNumber = `ORD-${Date.now()}-${userId}`;
    const total = product.price;

    db.query(
      "INSERT INTO order_histories (order_number, total, purchase_date, user_id) VALUES (?, ?, NOW(), ?)",
      [orderNumber, total, userId],
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Errore inserimento ordine" });
        }

        db.query("DELETE FROM product WHERE id = ?", [productId], (err) => {
          if (err) {
            console.error("Errore nella rimozione:", err);
            return res.status(500).json({ message: "Errore nella rimozione del prodotto" });
          }

          res.status(200).json({ message: "Prodotto acquistato e registrato nello storico" });
        });
      }
    );
  });
});

//  Storico ordini utente
router.get("/orders/:userId", (req, res) => {
  const userId = req.params.userId;

  db.query(
    "SELECT order_number, total, purchase_date FROM order_histories WHERE user_id = ? ORDER BY purchase_date DESC",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Errore fetch ordini:", err);
        return res.status(500).json({ message: "Errore server" });
      }

      res.json(results);
    }
  );
});

export default router;