// Le Fournil de Serris - Click & Collect
// Version « historique » : tout le code est dans ce fichier.
// Elle fonctionne... mais personne n'ose plus y toucher.
import express from 'express';
import fs from 'node:fs';

const DB_FILE = process.env.DB_FILE ?? 'data/db.json';

export const app = express();
app.use(express.json());

app.get('/produits', (req, res) => {
  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  res.json(db.produits);
});

app.post('/commandes', (req, res) => {
  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  const { client, telephone, lignes, retrait } = req.body;

  if (!client || !telephone) {
    return res.status(400).json({ erreur: 'Nom et téléphone obligatoires' });
  }
  if (!lignes || lignes.length === 0) {
    return res.status(400).json({ erreur: 'Commande vide' });
  }

  let total = 0;
  for (const ligne of lignes) {
    const produit = db.produits.find((p: any) => p.id === ligne.produitId);
    if (!produit) {
      return res.status(404).json({ erreur: `Produit inconnu : ${ligne.produitId}` });
    }
    if (ligne.quantite < 1 || ligne.quantite > 20) {
      return res.status(400).json({ erreur: 'Quantité entre 1 et 20 par produit' });
    }
    if (produit.stock < ligne.quantite) {
      return res.status(409).json({ erreur: `Stock insuffisant : ${produit.nom}` });
    }
    total += produit.prix * ligne.quantite; // prix en centimes
  }

  // Retrait au moins 2 h après la commande, entre 7h et 19h30
  const dateRetrait = new Date(retrait);
  if (dateRetrait.getTime() - Date.now() < 2 * 60 * 60 * 1000) {
    return res.status(400).json({ erreur: 'Retrait possible au plus tôt 2 h après la commande' });
  }
  const minutes = dateRetrait.getHours() * 60 + dateRetrait.getMinutes();
  if (minutes < 7 * 60 || minutes > 19 * 60 + 30) {
    return res.status(400).json({ erreur: 'Retrait entre 7h et 19h30' });
  }

  // Remise fidélité : -10 % dès 30 €
  if (total >= 3000) {
    total = Math.round(total * 0.9);
  }

  for (const ligne of lignes) {
    const produit = db.produits.find((p: any) => p.id === ligne.produitId);
    produit.stock -= ligne.quantite;
  }

  const commande = {
    id: 'C' + String(db.commandes.length + 1).padStart(4, '0'),
    client,
    telephone,
    lignes,
    retrait,
    total,
    statut: 'EN_ATTENTE',
    creeLe: new Date().toISOString(),
  };
  db.commandes.push(commande);
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

  res.status(201).json(commande);
});

app.get('/commandes/:id', (req, res) => {
  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  const commande = db.commandes.find((c: any) => c.id === req.params.id);
  if (!commande) return res.status(404).json({ erreur: 'Commande introuvable' });
  res.json(commande);
});

app.patch('/commandes/:id/prete', (req, res) => {
  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  const commande = db.commandes.find((c: any) => c.id === req.params.id);
  if (!commande) return res.status(404).json({ erreur: 'Commande introuvable' });
  if (commande.statut !== 'EN_ATTENTE') {
    return res.status(409).json({ erreur: 'Seule une commande en attente peut être prête' });
  }
  commande.statut = 'PRETE';
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  console.log(`[SMS] ${commande.telephone} : votre commande ${commande.id} est prête !`);
  res.json(commande);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => console.log('Fournil de Serris sur http://localhost:3000'));
}
