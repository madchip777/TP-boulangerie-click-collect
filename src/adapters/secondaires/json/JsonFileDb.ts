import fs from 'node:fs';
// Adapter technique : lit et écrit le fichier JSON qui sert de base.
export class JsonFileDb {
    constructor(private readonly chemin: string) {}
    lire(): any {
        return JSON.parse(fs.readFileSync(this.chemin, 'utf-8'));
    }
    ecrire(db: any): void {
        fs.writeFileSync(this.chemin, JSON.stringify(db, null, 2));
    }
}
