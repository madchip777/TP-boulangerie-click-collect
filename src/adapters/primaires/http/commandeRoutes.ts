// Archi
// Couche présentation : traduit HTTP ↔ appels au métier. Aucune règle ici.
import { Router, Response } from 'express';
import { repondreErreur } from "./erreurs";
import { PasserCommande } from "../../../application/PasserCommande"
import { ConsulterCommande } from "../../../application/ConsulterCommande"
import { ConsulterCatalogue } from "../../../application/ConsulterCatalogue"
import { EtatCommande } from "../../../application/EtatCommande"
import { JsonCommandeRepository } from "../../secondaires/json/JsonCommandeRepository";
import { JsonProduitRepository } from "../../secondaires/json/JsonProduitRepository";


export function commandeRoutes(): Router {
    const router = Router();
    const JCR = new JsonCommandeRepository;
    const JPR = new JsonProduitRepository;

    router.get('/produits', (req, res) => {
        res.json(ConsulterCatalogue(JPR));
    });

    router.post('/commandes', (req, res) => {
        try {
            res.status(201).json(new PasserCommande(req.body,JCR));
        } catch (e) {
            repondreErreur(res, e);
        }
    });

    router.get('/commandes/:id', (req, res) => {
        try {
            res.json(new ConsulterCommande(req.params.id,JCR));
        } catch (e) {
            repondreErreur(res, e);
        }
    });

    router.patch('/commandes/:id/prete', (req, res) => {
        try {
            res.json(new EtatCommande(req.params.id));
        } catch (e) {
            repondreErreur(res, e);
        }
    });

    return router;
}
