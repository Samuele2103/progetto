import express from "express";
import { db } from "../db.js"; // Importa la connessione al database

const router = express.Router(); // Crea un nuovo router Express per gestire le rotte relative alle FAQ

// ======================
// GET /api/faq
// Restituisce tutte le FAQ dal database
// ======================
router.get("/", (req, res) => {
  db.query(
    'SELECT id, title, answer FROM faqs', // Query SQL per selezionare tutte le FAQ
    (err, results) => {
      if (err) {
        console.error('Errore query:', err); // Stampa errore su console
        res.status(500).json({ message: "Errore server" }); // Risponde con errore 500
      } else {
        res.json(results); // Risponde con l'elenco delle FAQ
      }
    }
  );
});

// ======================
// GET /api/faq/:id
// Restituisce una singola FAQ specifica per ID
// ======================
router.get("/:id", (req, res) => {
  const { id } = req.params; // Prende l'ID dai parametri URL
  db.query(
    'SELECT id, title, answer FROM faqs WHERE id = ?', // Query SQL per trovare la FAQ
    [id],
    (err, results) => {
      if (err) {
        console.error('Errore query:', err);
        res.status(500).json({ message: "Errore server" });
      } else if (results.length === 0) {
        res.status(404).json({ message: "FAQ non trovata" }); // Nessuna FAQ trovata
      } else {
        res.json(results[0]); // Restituisce la FAQ trovata
      }
    }
  );
});

// ======================
// POST /api/faq
// Crea una nuova FAQ nel database
// ======================
router.post("/", (req, res) => {
  const { title, answer } = req.body; // Prende title e answer dal corpo della richiesta

  // Verifica che i dati obbligatori siano presenti
  if (!title || !answer) {
    return res.status(400).json({ message: "Title e answer sono obbligatori" });
  }

  // Inserisce la nuova FAQ nel database
  db.query(
    'INSERT INTO faqs (title, answer) VALUES (?, ?)',
    [title, answer],
    (err, result) => {
      if (err) {
        console.error('Errore inserimento:', err);
        res.status(500).json({ message: "Errore server" });
      } else {
        // Risponde con la nuova FAQ appena creata
        res.status(201).json({ id: result.insertId, title, answer });
      }
    }
  );
});

// ======================
// PUT /api/faq/:id
// Aggiorna una FAQ esistente in base all'ID
// ======================
router.put("/:id", (req, res) => {
  const { id } = req.params; // Prende l'ID dalla URL
  const { title, answer } = req.body; // Prende i nuovi dati dal corpo della richiesta

  // Esegue la query SQL per aggiornare la FAQ
  db.query(
    'UPDATE faqs SET title = ?, answer = ? WHERE id = ?',
    [title, answer, id],
    (err, result) => {
      if (err) {
        console.error('Errore aggiornamento:', err);
        res.status(500).json({ message: "Errore server" });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: "FAQ non trovata" }); // Nessuna riga aggiornata
      } else {
        res.json({ id, title, answer }); // Risponde con i nuovi dati
      }
    }
  );
});

// ======================
// DELETE /api/faq/:id
// Elimina una FAQ dal database
// ======================
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    'DELETE FROM faqs WHERE id = ?', // Query SQL per eliminare la FAQ
    [id],
    (err, result) => {
      if (err) {
        console.error('Errore eliminazione:', err);
        res.status(500).json({ message: "Errore server" });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: "FAQ non trovata" });
      } else {
        res.status(204).send(); // 204 = No Content → successo senza corpo di risposta
      }
    }
  );
});

export default router; // Esporta il router per essere usato nel server