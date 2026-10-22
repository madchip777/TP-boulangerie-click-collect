import { creerApp } from './composition';

const app = creerApp(process.env.DB_FILE ?? 'data/db.json');
app.listen(3000, () => console.log('Fournil de Serris sur http://localhost:3000'));