
// Couche présentation : traduit HTTP <-> appels au métier. Aucune règle ici.
import { Router, Response } from 'express';
import { CommandeService } from '../metier/CommandeService';
import { repondreErreur} from "./erreurRoutes";

export function commandeRoutes(): Router {
    const router = Router();
    const service = new CommandeService();

    router.get('/produits', (req, res) => {
        res.json(service.listerProduits());
    });

    router.post('/commandes', (req, res) => {
        try {
            res.status(201).json(service.passerCommande(req.body));
        } catch (e) {
            repondreErreur(res, e);
        }
    });

    router.get('/commandes/:id', (req, res) => {
        try {
            res.json(service.consulterCommande(req.params.id));
        } catch (e) {
            repondreErreur(res, e);
        }
    });

    router.patch('/commandes/:id/prete', (req, res) => {
        try {
            res.json(service.marquerPrete(req.params.id));
        } catch (e) {
            repondreErreur(res, e);
        }
    });

    return router;
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