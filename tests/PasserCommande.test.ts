import { describe, it, expect, beforeEach } from 'vitest';
import { PasserCommande } from '../src/application/PasserCommande';
import { ProduitRepositoryEnMemoire } from '../src/adapters/secondaires/memoire/ProduitRepositoryEnMemoire';
import { CommandeRepositoryEnMemoire } from '../src/adapters/secondaires/memoire/CommandeRepositoryEnMemoire';
import { HorlogeFixe } from '../src/adapters/secondaires/memoire/HorlogeFixe';

describe('Passer une commande', () => {
  let produits: ProduitRepositoryEnMemoire;
  let commandes: CommandeRepositoryEnMemoire;
  let passerCommande: PasserCommande;

  beforeEach(() => {
    produits = new ProduitRepositoryEnMemoire([
      { id: 'croissant', nom: 'Croissant au beurre', prix: 120, stock: 40 },
      { id: 'tarte-pommes-6', nom: 'Tarte aux pommes 6 parts', prix: 1800, stock: 4 },
    ]);
    commandes = new CommandeRepositoryEnMemoire();
    const horloge = new HorlogeFixe(new Date('2026-10-19T08:00:00'));
    passerCommande = new PasserCommande(produits, commandes, horloge);
  });

  it('calcule le total et décrémente le stock', async () => {
    const commande = await passerCommande.executer({
      client: 'Camille Martin',
      telephone: '0612345678',
      lignes: [{ produitId: 'croissant', quantite: 6 }],
      retrait: '2026-10-19T11:00:00',
    });

    expect(commande.total).toBe(720);
    expect(commande.statut).toBe('EN_ATTENTE');
    expect((await produits.trouverParId('croissant'))!.stock).toBe(34);
  });

  it('applique -10 % dès 30 €', async () => {
    const commande = await passerCommande.executer({
      client: 'Camille Martin',
      telephone: '0612345678',
      lignes: [{ produitId: 'tarte-pommes-6', quantite: 2 }],
      retrait: '2026-10-19T11:00:00',
    });

    expect(commande.total).toBe(3240); // 36 € - 10 %
  });

  it('refuse un retrait moins de 2 h après la commande', async () => {
    await expect(
      passerCommande.executer({
        client: 'Camille Martin',
        telephone: '0612345678',
        lignes: [{ produitId: 'croissant', quantite: 1 }],
        retrait: '2026-10-19T09:30:00',
      }),
    ).rejects.toThrow('2 h');
  });
});
