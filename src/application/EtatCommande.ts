import { JsonCommandeRepository } from "../adapters/secondaires/json/JsonCommandeRepository";
import {ErreurMetier} from "../domain/ErreurMetier";

export function MarquerPrete(id: string, JCR: JsonCommandeRepository)  {
    const commande = JCR.MarquerPrete(id);
    if (commande.statut !== 'EN_ATTENTE') {
        throw new ErreurMetier('Seule une commande en attente peut être prête', 409.11);
    }
    commande.statut = 'PRETE';
    JCR.enregistrer(commande);
    this.sms.envoyer(commande.telephone, `votre commande ${commande.id} est prête !`);
    return commande;
}