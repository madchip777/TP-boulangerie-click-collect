import type { Produit } from '../../../domain/types';
import type { ProduitRepository } from '../../../application/ports/ProduitRepository';
import type { JsonFileDb } from './JsonFileDb';

// Adapter secondaire : implémente le port ProduitRepository avec un fichier JSON.
export class JsonProduitRepository implements ProduitRepository {
    constructor(private readonly db: JsonFileDb) {}

    async tous(): Promise<Produit[]> {
        return this.db.lire().produits;
    }

    async trouverParId(id: string): Promise<Produit | undefined> {
        return this.db.lire().produits.find((p: Produit) => p.id === id);
    }

    async enregistrer(produit: Produit): Promise<void> {
        const data = this.db.lire();
        data.produits = data.produits.map((p: Produit) => (p.id === produit.id ? produit : p));
        this.db.ecrire(data);
    }
}