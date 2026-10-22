import type { Produit } from '../domain/types';
import type { ProduitRepository } from './ports/ProduitRepository';

export class ConsulterCatalogue {
    constructor(private readonly produits: ProduitRepository) {}

    executer(): Promise<Produit[]> {
        return this.produits.tous();
    }
}