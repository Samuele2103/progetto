// Importa bcrypt per criptare e confrontare le password
import bcrypt from 'bcrypt';
// Importa il modulo per connettersi al database
import { db } from '../db.js';

// Funzione per registrare un nuovo utente
export const register = async (req, res) => {
  const { username, email, passwd } = req.body;

  if (!username || !email || !passwd) {
    return res.status(400).json({ message: "Tutti i campi sono obbligatori" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Errore server" });
    if (results.length > 0) return res.status(409).json({ message: "Email già registrata" });

    const hashedPassword = await bcrypt.hash(passwd, 10);

    db.query(
      "INSERT INTO users (username, email, passwd) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      (err) => {
        if (err) {
          console.error("Errore registrazione:", err);
          return res.status(500).json({ message: "Errore registrazione" });
        }
        res.status(201).json({ message: "Registrazione completata" });
      }
    );
  });
};

// Funzione per effettuare il login
export const login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) {
      console.error("Errore DB login:", err);
      return res.status(500).json({ error: "Errore server" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Email non trovata" });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.passwd); 

    if (!passwordMatch) {
      return res.status(401).json({ error: "Password errata" });
    }

    //  Salva l’utente nella sessione
    req.session.user = {
      id: user.id,
      username: user.username
    };

    res.json({ message: "Login avvenuto con successo" });
  });
};

//  Funzione per ottenere l'utente loggato
export const getMe = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Non autenticato" });
  }

  res.json({
    user: {
      id: req.session.user.id,
      username: req.session.user.username
    }
  });
};

//  Funzione per il logout
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Errore durante il logout" });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout effettuato' });
  });
};