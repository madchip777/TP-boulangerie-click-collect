Madchip77

Lien git :
https://github.com/madchip777/TP-boulangerie-click-collect

Commit du projet original fonctionelle (100% vert avec npm test et npm run typecheck) de Seance 3 :
https://github.com/madchip777/TP-boulangerie-click-collect/tree/fceae78ac6d50769d919f00fe62c7dcd25ad7670

Le projet n'a pas été avancé au dela de la page 10 de S3_02_Livret_Refactoring_Hexagonal / Le projet n'est pas fini.

Route historique de :
<code>PATCH<br>/commandes/:id/prete</code>
Règle(s) métier :
- La commande (</code>) doit exister; 
- La commande (</code>) doit être en etat "en attente" (avant d'être prète)
Dépenance technique à isoler :
- res
- const data = db.lire();
- data.commandes.find((c: any)
- commande.statut 
- db.ecrire(data);
- [SMS] 
Cas d'usage et port cibles :
- Changement d'etat d'une commande de En Attente à Prete.
- Entre La DB json et les verification,
- Entre les regle produit et la presentation (+ SMS)
Tests de caractérisation :
- data.commandes.find((c: any)
- if (!commande)
- commande.statut !== 'EN_ATTENTE'
- Format de commande </code>
- Existance et concordonance d'état d'une commande </code>

Route historique de :
<code>PATCH<br>/commandes/:id/annulation</code>
Règle(s) métier :
- La commande (</code>) doit exister
- La commande (</code>) doit être en etat "En attente" (avant d'être prète)
Dépenance technique à isoler :
- res
- data = db.lire();
- data.commandes.find((c: any)
- data.produits.find((p: any)
- produit.stock += ligne.quantite
- commande.statut 
- db.ecrire(data);
- [SMS]
Cas d'usage et port cibles :
- Changement d'etat d'une commande qui existe et est en attente (d'etre prete)
- Entre La DB json et les verification,
- Entre les regle produit et la presentation (+ SMS)
Tests de caractérisation :
- data.commandes.find((c: any)
- commande.statut !== 'EN_ATTENTE'
- const ligne of commande.lignes + data.produits.find((p: any)
- commande.statut = 'ANNULEE'
- db.ecrire(data)
- Format de commande </code>
- Existance et concordonance d'état d'une commande </code>



