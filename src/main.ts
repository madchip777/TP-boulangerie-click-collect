// Le Fournil de Serris - Click & Collect
// Version « historique » : tout le code est dans ce fichier.
// Elle fonctionne... mais personne n'ose plus y toucher.

import express from 'express';
import fs from 'node:fs';

// Infra
const DB_FILE = process.env.DB_FILE ?? 'data/db.json';

// Metier
export const app = express();
app.use(express.json());

// Infra
app.get('/produits', (req, res) => {
  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  res.json(db.produits);
});

// Infra
app.post('/commandes', (req, res) => {
  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  const { client, telephone, lignes, retrait } = req.body;

// Metier
  if (!client || !telephone) {
    // Prez
    return res.status(400).json({ erreur: 'Nom et téléphone obligatoires' });
  }
// Metier
  if (!lignes || lignes.length === 0) {
    // Prez
    return res.status(400).json({ erreur: 'Commande vide' });
  }

  // Metier
  let total = 0;
  for (const ligne of lignes) {
    const produit = db.produits.find((p: any) => p.id === ligne.produitId);
    if (!produit) {
      // Prez
      return res.status(404).json({ erreur: `Produit inconnu : ${ligne.produitId}` });
    }
    // Metier
    if (ligne.quantite < 1 || ligne.quantite > 20) {
      // Prez
      return res.status(400).json({ erreur: 'Quantité entre 1 et 20 par produit' });
    }
    // Metier
    if (produit.stock < ligne.quantite) {
      // Prez
      return res.status(409).json({ erreur: `Stock insuffisant : ${produit.nom}` });
    }
    // Metier
    total += produit.prix * ligne.quantite; // prix en centimes
  }

  // Retrait au moins 2 h après la commande, entre 7h et 19h30
  // Metier
  const dateRetrait = new Date(retrait);
  if (dateRetrait.getTime() - Date.now() < 2 * 60 * 60 * 1000) { // Infra
    // Prez
    return res.status(400).json({ erreur: 'Retrait possible au plus tôt 2 h après la commande' });
  }
  // Metier
  const minutes = dateRetrait.getHours() * 60 + dateRetrait.getMinutes(); // Infra
  if (minutes < 7 * 60 || minutes > 19 * 60 + 30) {
    // Prez
    return res.status(400).json({ erreur: 'Retrait entre 7h et 19h30' });
  }

  // Metier
  // Remise fidélité : -10 % dès 30 €
  if (total >= 3000) {
    total = Math.round(total * 0.9);
  }

  // Metier
  for (const ligne of lignes) {
    const produit = db.produits.find((p: any) => p.id === ligne.produitId);
    produit.stock -= ligne.quantite;
  }

  // Prez
  const commande = {
    id: 'C' + String(db.commandes.length + 1).padStart(4, '0'),
    client,
    telephone,
    lignes,
    retrait,
    total,
    statut: 'EN_ATTENTE',
    creeLe: new Date().toISOString(), // Infra
  };
  // Metier
  db.commandes.push(commande);
  // Infra
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  // Prez
  res.status(201).json(commande);
});

// Infra
app.get('/commandes/:id', (req, res) => {
  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  // Metier
  const commande = db.commandes.find((c: any) => c.id === req.params.id);
  if (!commande) {
    // Prez
    return res.status(404).json({ erreur: 'Commande introuvable' });
  }
  res.json(commande);
});

// Infra
app.patch('/commandes/:id/prete', (req, res) => {
  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  // Metier
  const commande = db.commandes.find((c: any) => c.id === req.params.id);
  if (!commande) {
    // Prez
    return res.status(404).json({ erreur: 'Commande introuvable' });
  }
  // Metier
  if (commande.statut !== 'EN_ATTENTE') {
    // Prez
    return res.status(409).json({ erreur: 'Seule une commande en attente peut être prête' });
  }
  // Metier
  commande.statut = 'PRETE';
  // Infra
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  // Infra
  console.log(`[SMS] ${commande.telephone} : votre commande ${commande.id} est prête !`);
  res.json(commande);
});

// Metier
if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => console.log('Fournil de Serris sur http://localhost:3000'));
}
