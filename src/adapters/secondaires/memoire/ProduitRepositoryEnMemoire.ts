import type { Produit } from '../../../../../../Downloads/boulangerie-click-collect-seance3/src/domain/types';
import type { ProduitRepository } from '../../../../../../Downloads/boulangerie-click-collect-seance3/src/application/ports/ProduitRepository';

// Adapter secondaire pour les tests : tout reste en mémoire.
export class ProduitRepositoryEnMemoire implements ProduitRepository {
  private readonly produits = new Map<string, Produit>();

  constructor(initiaux: Produit[] = []) {
    initiaux.forEach((p) => this.produits.set(p.id, { ...p }));
  }

  async tous(): Promise<Produit[]> {
    return [...this.produits.values()];
  }

  async trouverParId(id: string): Promise<Produit | undefined> {
    return this.produits.get(id);
  }

  async enregistrer(produit: Produit): Promise<void> {
    this.produits.set(produit.id, { ...produit });
  }
}
