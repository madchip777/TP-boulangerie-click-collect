// Couche métier : les règles de la boulangerie.
// Problème à voir en séance 1 : ce fichier IMPORTE l'infrastructure.
import { JsonProduitRepository } from '../infrastructure/JsonProduitRepository';
import { JsonCommandeRepository } from '../infrastructure/JsonCommandeRepository';
import { SmsConsole } from '../infrastructure/SmsConsole';
import { ErreurMetier } from './ErreurMetier';

export class CommandeService {
    private produits = new JsonProduitRepository();
    private commandes = new JsonCommandeRepository();
    private sms = new SmsConsole();

    listerProduits() {
        return this.produits.tous();
    }

    passerCommande(demande: { client: string; telephone: string; lignes: any[]; retrait: string }) {
        const { client, telephone, lignes, retrait } = demande;
        if (!client || !telephone) throw new ErreurMetier('Nom et téléphone obligatoires', 400.12);
        if (!lignes || lignes.length === 0) throw new ErreurMetier('Commande vide', 400.10);

        let total = 0;
        for (const ligne of lignes) {
            const produit = this.produits.trouverParId(ligne.produitId);
            if (!produit) throw new ErreurMetier(`Produit inconnu : ${ligne.produitId}`, 404.10);
            if (ligne.quantite < 1 || ligne.quantite > 20) {
                throw new ErreurMetier('Quantité entre 1 et 20 par produit', 400.11);
            }
            if (produit.stock < ligne.quantite) {
                throw new ErreurMetier(`Stock insuffisant : ${produit.nom}`, 409.10);
            }
            total += produit.prix * ligne.quantite;
        }

        const dateRetrait = new Date(retrait);
        if (dateRetrait.getTime() - Date.now() < 2 * 60 * 60 * 1000) {
            throw new ErreurMetier('Retrait possible au plus tôt 2 h après la commande', 400.13);
        }
        const minutes = dateRetrait.getHours() * 60 + dateRetrait.getMinutes();
        if (minutes < 7 * 60 || minutes > 19 * 60 + 30) {
            throw new ErreurMetier('Retrait entre 7h et 19h30', 400.14);
        }

        if (total >= 3000) total = Math.round(total * 0.9);

        for (const ligne of lignes) {
            const produit = this.produits.trouverParId(ligne.produitId);
            produit.stock -= ligne.quantite;
            this.produits.enregistrer(produit);
        }

        const commande = {
            id: this.commandes.prochainId(),
            client,
            telephone,
            lignes,
            retrait,
            total,
            statut: 'EN_ATTENTE',
            creeLe: new Date().toISOString(),
        };
        this.commandes.enregistrer(commande);
        return commande;
    }

    consulterCommande(id: string) {
        const commande = this.commandes.trouverParId(id);
        if (!commande) throw new ErreurMetier('Commande introuvable', 404.11);
        return commande;
    }

    marquerPrete(id: string) {
        const commande = this.consulterCommande(id);
        if (commande.statut !== 'EN_ATTENTE') {
            throw new ErreurMetier('Seule une commande en attente peut être prête', 409.11);
        }
        commande.statut = 'PRETE';
        this.commandes.enregistrer(commande);
        this.sms.envoyer(commande.telephone, `votre commande ${commande.id} est prête !`);
        return commande;
    }
}

//┌──────────────────────────────┐
//│ Prezentation (routes HTTP)   │
//└──────────────┬───────────────┘
//               ▼
//┌──────────────────────────────┐
//│ Metier (CommandeService)     │
//└──────────────┬───────────────┘
//               ▼
//┌──────────────────────────────┐
//│ Infrastructure (JSON, SMS)   │
//└──────────────────────────────┘