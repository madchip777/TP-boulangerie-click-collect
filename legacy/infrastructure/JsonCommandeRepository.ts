import { ReadInDB, WriteInDB } from './jsonDb';

export class JsonCommandeRepository {
  prochainId(): string {
    return 'C' + String(ReadInDB().commandes.length + 1).padStart(4, '0');
  }

  trouverParId(id: string): any | undefined {
    return ReadInDB().commandes.find((c: any) => c.id === id);
  }

  enregistrer(commande: any): void {
    const db = ReadInDB();
    const index = db.commandes.findIndex((c: any) => c.id === commande.id);
    if (index === -1) db.commandes.push(commande);
    else db.commandes[index] = commande;
    WriteInDB(db);
  }
}
