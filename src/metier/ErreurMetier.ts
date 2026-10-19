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

function CommandCheck (){

}

if (!client || !telephone) {
    // Prez
}

if (!lignes || lignes.length === 0) {
    // Prez
}

let total = 0;
for (const ligne of lignes) {
    const produit = db.produits.find((p: any) => p.id === ligne.produitId);
    if (!produit) {
        // Prez
    }

    if (ligne.quantite < 1 || ligne.quantite > 20) {

    if (produit.stock < ligne.quantite) {

    }