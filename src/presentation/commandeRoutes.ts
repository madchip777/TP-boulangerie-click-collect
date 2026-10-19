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

function HtmlCode (NumCode: number) {
    let MessageCode = "???"
    switch (NumCode) {
        case 40010:
            MessageCode = 'Commande vide';
            break;
        case 40011:
            MessageCode = 'Quantité entre 1 et 20 par produit';
            break;
        case 40012:
            MessageCode = 'Nom et téléphone obligatoires';
            break;
        case 40013:
            MessageCode = 'Retrait possible au plus tôt 2 h après la commande';
            break;
        case 40014:
            MessageCode = 'Retrait entre 7h et 19h30';
            break;
        case 40410:
            MessageCode = 'Produit inconnu : ${ligne.produitId}';
            break;
        case 40411:
            MessageCode = 'Commande introuvable';
            break;
        case 40910:
            MessageCode = 'Stock insuffisant : ${produit.nom}';
            break;
        case 40911:
            MessageCode = 'Seule une commande en attente peut être prête';
            break;
    }
    return res.status(NumCode).json({ erreur: MessageCode });
}



const commande = {
    id: 'C' + String(db.commandes.length + 1).padStart(4, '0'),
    client,
    telephone,
    lignes,
    retrait,
    total,
    statut: 'EN_ATTENTE',
    creeLe:  // Infra
};
res.status(201).json(commande);