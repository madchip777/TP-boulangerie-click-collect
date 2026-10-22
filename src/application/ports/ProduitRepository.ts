import type { Produit } from '../../domain/types';
// Port secondaire (sortie) : ce dont le métier a besoin, pas comment c'est stocké.
export interface ProduitRepository {
    tous(): Promise<Produit[]>;
    trouverParId(id: string): Promise<Produit | undefined>;
    enregistrer(produit: Produit): Promise<void>;
}