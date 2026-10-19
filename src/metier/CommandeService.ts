//┌──────────────────────────────┐
//│ Prezentation (routes HTTP)   │
//└──────────────┬───────────────┘
//               ▼
//┌──────────────────────────────┐
//│ Metier (CommandeService)     │
//└──────────────┬───────────────┘
//               ▼
//┌──────────────────────────────┐
//│ Infrastructure (JSON, SMS)   │
//└──────────────────────────────┘

import express from 'express';

export const app = express();
app.use(express.json());

total += produit.prix * ligne.quantite; // prix en centimes
}
// Retrait au moins 2 h après la commande, entre 7h et 19h30
const dateRetrait = new Date(retrait);

if (minutes < 7 * 60 || minutes > 19 * 60 + 30) {

    // Remise fidélité : -10 % dès 30 €
    if (total >= 3000) {
        total = Math.round(total * 0.9);
    }

    for (const ligne of lignes) {
        const produit = db.produits.find((p: any) => p.id === ligne.produitId);
        produit.stock -= ligne.quantite;
    }

    db.commandes.push(commande);

    if (!commande) {

        if (!commande) {


if (commande.statut !== 'EN_ATTENTE') {

    commande.statut = 'PRETE';


if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, () => console.log('Fournil de Serris sur http://localhost:3000'));
}