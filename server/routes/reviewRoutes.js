import express from "express";
import { db } from "../db.js";

const router = express.Router();

//  GET tutte le recensioni
router.get("/", (req, res) => {
  db.query(
    "SELECT id, evaluation, description, user_id FROM reviews",
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

//  GET recensione per id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT id, evaluation, description, user_id FROM reviews WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Errore query:", err);
        res.status(500).json({ message: "Errore server" });
      } else if (results.length === 0) {
        res.status(404).json({ message: "Recensione non trovata" });
      } else {
        res.json(results[0]);
      }
    }
  );
});

//  Verifica se l'utente ha almeno un ordine (non richiede status)
router.get("/orders/completed", (req, res) => {
  const userId = req.session?.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Utente non autenticato" });
  }

  const sql = `
    SELECT COUNT(*) AS count
    FROM order_histories
    WHERE user_id = ?
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Errore query:", err);
      return res.status(500).json({ error: "Errore nel database" });
    }

    const hasCompletedOrders = result[0].count > 0;
    res.json({ hasCompletedOrders });
  });
});

//  Inserisci una nuova recensione
router.post("/", (req, res) => {
  const userId = req.session?.user?.id;
  const { description, evaluation } = req.body;

  if (!userId) {
    return res.status(401).json({ error: "Utente non autenticato" });
  }

  if (!description || !evaluation || evaluation < 1 || evaluation > 5) {
    return res.status(400).json({ error: "Dati mancanti o non validi" });
  }

  const sql = `
    INSERT INTO reviews (user_id, description, evaluation)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [userId, description, evaluation], (err, result) => {
    if (err) {
      console.error("Errore nel salvataggio recensione:", err);
      return res.status(500).json({ error: "Errore nel database" });
    }

    res.status(201).json({
      id: result.insertId,
      user_id: userId,
      description,
      evaluation,
    });
  });
});

export default router;