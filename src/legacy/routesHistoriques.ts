// CODE HISTORIQUE, pas encore migré dans l'hexagone.
// Ajouté en urgence par un collègue pendant la migration :
// accès direct au fichier JSON, SMS écrits dans la console, date système en dur.
import { Router } from 'express';
import type { JsonFileDb } from '../adapters/secondaires/json/JsonFileDb';

export function routesHistoriques(db: JsonFileDb): Router {
  const router = Router();

  router.patch('/commandes/:id/prete', (req, res) => {
    const data = db.lire();
    const commande = data.commandes.find((c: any) => c.id === req.params.id);
    if (!commande) return res.status(404).json({ erreur: 'Commande introuvable' });
    if (commande.statut !== 'EN_ATTENTE') {
      return res.status(409).json({ erreur: 'Seule une commande en attente peut être prête' });
    }
    commande.statut = 'PRETE';
    db.ecrire(data);
    console.log(`[SMS] ${commande.telephone} : votre commande ${commande.id} est prête !`);
    res.json(commande);
  });

  router.patch('/commandes/:id/annulation', (req, res) => {
    const data = db.lire();
    const commande = data.commandes.find((c: any) => c.id === req.params.id);
    if (!commande) return res.status(404).json({ erreur: 'Commande introuvable' });
    if (commande.statut !== 'EN_ATTENTE') {
      return res.status(409).json({ erreur: 'Seule une commande en attente peut être annulée' });
    }
    // On remet les produits en stock
    for (const ligne of commande.lignes) {
      const produit = data.produits.find((p: any) => p.id === ligne.produitId);
      if (produit) produit.stock += ligne.quantite;
    }
    commande.statut = 'ANNULEE';
    db.ecrire(data);
    console.log(`[SMS] ${commande.telephone} : votre commande ${commande.id} est annulée.`);
    res.json(commande);
  });

  router.patch('/commandes/:id/retrait', (req, res) => {
    const data = db.lire();
    const commande = data.commandes.find((c: any) => c.id === req.params.id);
    if (!commande) return res.status(404).json({ erreur: 'Commande introuvable' });
    if (commande.statut !== 'PRETE') {
      return res.status(409).json({ erreur: 'Seule une commande prête peut être retirée' });
    }
    commande.statut = 'RETIREE';
    commande.retireeLe = new Date().toISOString();
    db.ecrire(data);
    res.json(commande);
  });

  return router;
}
