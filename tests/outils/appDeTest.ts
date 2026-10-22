// Construit une application complète sur une COPIE de la base,
// pour tester par HTTP sans abîmer data/db.json.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { creerApp, type Options } from '../../src/composition';

export function creerAppDeTest(options: Options = {}) {
  const copie = path.join(os.tmpdir(), `fournil-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);
  fs.copyFileSync('data/db.json', copie);
  return creerApp(copie, options);
}

export const commandeValide = {
  client: 'Camille Martin',
  telephone: '0612345678',
  lignes: [{ produitId: 'croissant', quantite: 6 }],
  retrait: '2026-10-19T11:00:00',
};
