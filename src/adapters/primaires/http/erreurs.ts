import type { Response } from 'express';
import { ErreurMetier } from '../../../domain/ErreurMetier';

const STATUT_HTTP = { INVALIDE: 400, INTROUVABLE: 404, CONFLIT: 409 } as const;

export function repondreErreur(res: Response, e: unknown) {
    if (e instanceof ErreurMetier) return res.status(STATUT_HTTP[e.code]).json({ erreur: e.message });
    console.error(e);
    return res.status(500).json({ erreur: 'Erreur interne' });
}