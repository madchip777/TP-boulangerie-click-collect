import { Response } from 'express';

const STATUT_HTTP = { INVALIDE: 400, INTROUVABLE: 404, CONFLIT: 409 } as const;

// Réponse erreur centralisée qui pour le moment ne répond qu'en français.
/// res = Réponse ; NumCode = number or unknown, e? = Error
export function repondreErreur (res: Response, NumCode: unknown , e?: unknown ) {
    let MessageCode: unknown = "Undefined Error"
    switch (NumCode) {
        case 400.10:
            MessageCode = 'Commande vide';
            break;
        case 400.11:
            MessageCode = 'Quantité entre 1 et 20 par produit';
            break;
        case 400.12:
            MessageCode = 'Nom et téléphone obligatoires';
            break;
        case 400.13:
            MessageCode = 'Retrait possible au plus tôt 2 h après la commande';
            break;
        case 400.14:
            MessageCode = 'Retrait entre 7h et 19h30';
            break;
        case 404.10:
            MessageCode = 'Produit inconnu : ${ligne.produitId}';
            break;
        case 404.11:
            MessageCode = 'Commande introuvable';
            break;
        case 409.10:
            MessageCode = 'Stock insuffisant : ${produit.nom}';
            break;
        case 409.11:
            MessageCode = 'Seule une commande en attente peut être prête';
            break;
        case undefined :
            NumCode = STATUT_HTTP[e.code];
            MessageCode = e.message;
            break;
    }
    console.log('Error delivered with :'+ MessageCode);
    return res.status(NumCode).json({ erreur: MessageCode });
}