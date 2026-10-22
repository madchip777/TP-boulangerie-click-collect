import { Response } from 'express';

// Reponse erreur centralisée qui pour le moment ne répond qu'en français.
export function repondreErreur (res: Response, NumCode: number ) {
    let MessageCode = "Undefined Error"
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
    }
    return res.status(NumCode | 0).json({ erreur: MessageCode });
}