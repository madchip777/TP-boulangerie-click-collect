
import { ReadInDB, WriteInDB } from './jsonDb';

export class JsonProduitRepository {
    tous(): any[] {
        return ReadInDB().produits;
    }

    trouverParId(id: string): any | undefined {
        return ReadInDB().produits.find((p: any) => p.id === id);
    }

    enregistrer(produit: any): void {
        const db = ReadInDB();
        db.produits = db.produits.map((p: any) => (p.id === produit.id ? produit : p));
        WriteInDB(db);
    }
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