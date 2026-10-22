// Cas d'usage (port primaire) : « Passer une commande ».
// Il ne connaît que des interfaces (ports) : aucun fichier, aucun Express.
import type { Commande, LigneCommande } from '../domain/types';
import { ErreurMetier } from '../domain/ErreurMetier';
import type { ProduitRepository } from './ports/ProduitRepository';
import type { CommandeRepository } from './ports/CommandeRepository';
import type { Horloge } from './ports/Horloge';

export interface DemandeCommande {
    client: string;
    telephone: string;
    lignes: LigneCommande[];
    retrait: string;
}

const DEUX_HEURES = 2 * 60 * 60 * 1000;

export class PasserCommande {
    constructor(
        private readonly produits: ProduitRepository,
        private readonly commandes: CommandeRepository,
        private readonly horloge: Horloge,
    ) {}

    async executer(demande: DemandeCommande): Promise<Commande> {
        const { client, telephone, lignes, retrait } = demande;
        if (!client || !telephone) throw new ErreurMetier('Nom et téléphone obligatoires', 'INVALIDE');
        if (!lignes || lignes.length === 0) throw new ErreurMetier('Commande vide', 'INVALIDE');

        let total = 0;
        for (const ligne of lignes) {
            const produit = await this.produits.trouverParId(ligne.produitId);
            if (!produit) throw new ErreurMetier(`Produit inconnu : ${ligne.produitId}`, 'INTROUVABLE');
            if (ligne.quantite < 1 || ligne.quantite > 20) {
                throw new ErreurMetier('Quantité entre 1 et 20 par produit', 'INVALIDE');
            }
            if (produit.stock < ligne.quantite) {
                throw new ErreurMetier(`Stock insuffisant : ${produit.nom}`, 'CONFLIT');
            }
            total += produit.prix * ligne.quantite;
        }

        const maintenant = this.horloge.maintenant();
        const dateRetrait = new Date(retrait);
        if (dateRetrait.getTime() - maintenant.getTime() < DEUX_HEURES) {
            throw new ErreurMetier('Retrait possible au plus tôt 2 h après la commande', 'INVALIDE');
        }
        const minutes = dateRetrait.getHours() * 60 + dateRetrait.getMinutes();
        if (minutes < 7 * 60 || minutes > 19 * 60 + 30) {
            throw new ErreurMetier('Retrait entre 7h et 19h30', 'INVALIDE');
        }

        if (total >= 3000) total = Math.round(total * 0.9); // remise fidélité -10 % dès 30 €

        for (const ligne of lignes) {
            const produit = (await this.produits.trouverParId(ligne.produitId))!;
            await this.produits.enregistrer({ ...produit, stock: produit.stock - ligne.quantite });
        }

        const commande: Commande = {
            id: await this.commandes.prochainId(),
            client,
            telephone,
            lignes,
            retrait,
            total,
            statut: 'EN_ATTENTE',
            creeLe: maintenant.toISOString(),
        };
        await this.commandes.enregistrer(commande);
        return commande;
    }
}