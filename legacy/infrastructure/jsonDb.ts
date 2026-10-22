import fs from 'node:fs';

// Accès brut au fichier JSON qui sert de base de données.
const DB_FILE = process.env.DB_FILE ?? 'data/jsonDb.json';

export function ReadInDB() : any {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

export function WriteInDB(db: any): void {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
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