# Le Fournil de Serris - Click & Collect (fil rouge du module Architecture Hexagonale & DDD, Bachelor 3).

**État de ce kit :** version historique, tout le code est dans `src/main.ts`.

**Objectif de la séance :** repérer les responsabilités mélangées puis découper l'application en trois couches (livret S1).

## Démarrer

Prérequis : Node.js 20 ou plus récent (`node -v`), Git, VS Code.

```bash
npm install          # une seule fois
npm run dev          # API sur http://localhost:3000, redémarre à chaque sauvegarde
npm test             # tests Vitest
npm run typecheck    # vérification TypeScript (tsc --noEmit)
```

Requêtes de démonstration : fichier `requetes.http` (extension VS Code « REST Client »), ou :

```bash
curl http://localhost:3000/produits
```

## Données

`data/jsonDb.json` sert de base de données. Pour repartir de zéro, remettez `"commandes": []` et les stocks d'origine
(ou récupérez le fichier depuis le zip).
Les prix sont en **centimes** (130 = 1,30 €).

## Règles métier de la boulangerie

- Une commande contient au moins un produit ; quantité de 1 à 20 par produit ; stock suffisant.
- Retrait au plus tôt 2 h après la commande, entre 7h et 19h30.
- Remise fidélité de 10 % dès 30 € d'achat.
- Cycle de vie : EN_ATTENTE → PRETE → RETIREE ; une commande EN_ATTENTE peut être ANNULEE (le stock est remis).
- Le client reçoit un SMS quand sa commande est prête ou annulée (simulé dans la console).

