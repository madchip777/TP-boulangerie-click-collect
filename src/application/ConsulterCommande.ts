import type { Commande } from '../domain/types';
import { ErreurMetier } from '../domain/ErreurMetier';
import type { CommandeRepository } from './ports/CommandeRepository';

export class ConsulterCommande {
    constructor(private readonly commandes: CommandeRepository) {}

    async executer(id: string): Promise<Commande> {
        const commande = await this.commandes.trouverParId(id);
        if (!commande) throw new ErreurMetier('Commande introuvable', 'INTROUVABLE');
        return commande;
    }
}