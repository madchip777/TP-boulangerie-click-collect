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

import fs from 'node:fs';

const DB_FILE = process.env.DB_FILE ?? 'data/db.json';

function ReadFileSync() {
}












app.get('/produits', (req, res) => {
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    res.json(db.produits);
});

app.post('/commandes', (req, res) => {
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    const { client, telephone, lignes, retrait } = req.body;

    if (dateRetrait.getTime() - Date.now() < 2 * 60 * 60 * 1000) {

        const minutes = dateRetrait.getHours() * 60 + dateRetrait.getMinutes();

new Date().toISOString(),

    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

        app.get('/commandes/:id', (req, res) => {
            const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));

    const commande = db.commandes.find((c: any) => c.id === req.params.id);

    app.patch('/commandes/:id/prete', (req, res) => {
        const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));

        const commande = db.commandes.find((c: any) => c.id === req.params.id);

        fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

        console.log(`[SMS] ${commande.telephone} : votre commande ${commande.id} est prête !`);
        res.json(commande);
    });