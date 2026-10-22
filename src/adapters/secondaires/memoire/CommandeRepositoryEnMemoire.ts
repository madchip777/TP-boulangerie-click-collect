import type { Commande } from '../../../domain/types';
import type { CommandeRepository } from '../../../application/ports/CommandeRepository';

export class CommandeRepositoryEnMemoire implements CommandeRepository {
  private readonly commandes = new Map<string, Commande>();

  constructor(initiales: Commande[] = []) {
    initiales.forEach((c) => this.commandes.set(c.id, { ...c }));
  }

  async prochainId(): Promise<string> {
    return 'C' + String(this.commandes.size + 1).padStart(4, '0');
  }

  async trouverParId(id: string): Promise<Commande | undefined> {
    return this.commandes.get(id);
  }

  async enregistrer(commande: Commande): Promise<void> {
    this.commandes.set(commande.id, { ...commande });
  }
}
