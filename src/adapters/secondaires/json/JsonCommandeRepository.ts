import type { Commande } from '../../../domain/types';
import type { CommandeRepository } from '../../../application/ports/CommandeRepository';
import type { JsonFileDb } from './JsonFileDb';

export class JsonCommandeRepository implements CommandeRepository {
  constructor(private readonly db: JsonFileDb) {}

  async prochainId(): Promise<string> {
    return 'C' + String(this.db.lire().commandes.length + 1).padStart(4, '0');
  }

  async trouverParId(id: string): Promise<Commande | undefined> {
    return this.db.lire().commandes.find((c: Commande) => c.id === id);
  }

  async enregistrer(commande: Commande): Promise<void> {
    const data = this.db.lire();
    const index = data.commandes.findIndex((c: Commande) => c.id === commande.id);
    if (index === -1) data.commandes.push(commande);
    else data.commandes[index] = commande;
    this.db.ecrire(data);
  }
}