// Adapter primaire (entrée) : traduit HTTP en appels aux cas d'usage.
import { Router } from 'express';
import type { PasserCommande } from '../../../application/PasserCommande';
import type { ConsulterCatalogue } from '../../../application/ConsulterCatalogue';
import type { ConsulterCommande } from '../../../application/ConsulterCommande';
import { repondreErreur } from './erreurs';

export interface CasUsages {
    passerCommande: PasserCommande;
    consulterCatalogue: ConsulterCatalogue;
    consulterCommande: ConsulterCommande;
}

export function commandeRoutes(cas: CasUsages): Router {
    const router = Router();

    router.get('/produits', async (req, res) => {
        res.json(await cas.consulterCatalogue.executer());
    });

    router.post('/commandes', async (req, res) => {
        try {
            res.status(201).json(await cas.passerCommande.executer(req.body));
        } catch (e) {
            console.error(e);
            repondreErreur(res, undefined, e);
        }
    });

    router.get('/commandes/:id', async (req, res) => {
        try {
            res.json(await cas.consulterCommande.executer(req.params.id));
        } catch (e) {
            console.error(e);
            repondreErreur(res, undefined, e);
        }
    });

    return router;
}