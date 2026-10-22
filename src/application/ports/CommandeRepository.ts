import type { Commande } from '../../domain/types';
export interface CommandeRepository {
    prochainId(): Promise<string>;
    trouverParId(id: string): Promise<Commande | undefined>;
    enregistrer(commande: Commande): Promise<void>;
}