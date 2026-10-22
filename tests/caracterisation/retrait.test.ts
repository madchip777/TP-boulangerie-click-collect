// Test de caractérisation : on fige le comportement ACTUEL avant de refactorer.
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { creerAppDeTest, commandeValide } from '../outils/appDeTest';
import { HorlogeFixe } from '../../src/adapters/secondaires/memoire/HorlogeFixe';

describe('Caractérisation - retrait', () => {
    const horloge = new HorlogeFixe(new Date('2026-10-19T08:00:00'));
    it('refuse le retrait d’une commande qui n’est pas prête', async () => {
        const app = creerAppDeTest({ horloge });
        await request(app).post('/commandes').send(commandeValide).expect(201);
        const res = await request(app).patch('/commandes/C0001/retrait');
        expect(res.status).toBe(409);
        expect(res.body.erreur).toBe('Seule une commande prête peut être retirée');
    });
    it('retire une commande prête et note la date', async () => {
        const app = creerAppDeTest({ horloge });
        await request(app).post('/commandes').send(commandeValide).expect(201);
        await request(app).patch('/commandes/C0001/prete').expect(200);
        const res = await request(app).patch('/commandes/C0001/retrait');
        expect(res.status).toBe(200);
        expect(res.body.statut).toBe('RETIREE');
        expect(res.body.retireeLe).toBeDefined();
    });
    it('répond 404 pour une commande inconnue', async () => {
        const app = creerAppDeTest({ horloge });
        await request(app).patch('/commandes/C9999/retrait').expect(404);
    });
});