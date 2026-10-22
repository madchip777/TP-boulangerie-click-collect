// Point de composition : le SEUL endroit qui connaît toutes les classes concrètes.
// On y branche les adapters sur les ports (injection de dépendances).
import express from 'express';
import type { Horloge } from './application/ports/Horloge';
import { PasserCommande } from './application/PasserCommande';
import { ConsulterCatalogue } from './application/ConsulterCatalogue';
import { ConsulterCommande } from './application/ConsulterCommande';
import { JsonFileDb } from './adapters/secondaires/json/JsonFileDb';
import { JsonProduitRepository } from './adapters/secondaires/json/JsonProduitRepository';
import { JsonCommandeRepository } from './adapters/secondaires/json/JsonCommandeRepository';
import { HorlogeSysteme } from './adapters/secondaires/systeme/HorlogeSysteme';
import { commandeRoutes } from './adapters/primaires/http/commandeRoutes';
import { routesHistoriques } from './legacy/routesHistoriques';
export interface Options {
    horloge?: Horloge;
}
export function creerApp(cheminDb: string, options: Options = {}) {
    const horloge = options.horloge ?? new HorlogeSysteme();
    const db = new JsonFileDb(cheminDb);
    const produits = new JsonProduitRepository(db);
    const commandes = new JsonCommandeRepository(db);
    const app = express();
    app.use(express.json());
    app.use(
        commandeRoutes({
            passerCommande: new PasserCommande(produits, commandes, horloge),
            consulterCatalogue: new ConsulterCatalogue(produits),
            consulterCommande: new ConsulterCommande(commandes),
        }),
    );
    app.use(routesHistoriques(db));
    return app;
}