// Le domaine : le vocabulaire de la boulangerie. Aucun import technique ici.
export type StatutCommande = 'EN_ATTENTE' | 'PRETE' | 'RETIREE' | 'ANNULEE';
export interface Produit {
    id: string;
    nom: string;
    prix: number; // en centimes
    stock: number;
}
export interface LigneCommande {
    produitId: string;
    quantite: number;
}
export interface Commande {
    id: string;
    client: string;
    telephone: string;
    lignes: LigneCommande[];
    retrait: string; // date et heure locales, ex. 2026-10-20T08:30:00
    total: number; // en centimes
    statut: StatutCommande;
    creeLe: string;
}