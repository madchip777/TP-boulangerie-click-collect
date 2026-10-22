import { JsonCommandeRepository } from "../adapters/secondaires/json/JsonCommandeRepository";
import {ErreurMetier} from "../domain/ErreurMetier";

export function ConsulterCommande(id: string, JCR: JsonCommandeRepository) {
    const commande = JCR.trouverParId(id);
    if (!commande) throw new ErreurMetier('Commande introuvable', 404.11);
    return commande;
}