export type CodeErreur = 'INVALIDE' | 'INTROUVABLE' | 'CONFLIT';

export class ErreurMetier extends Error {
    constructor(message: string, readonly code: CodeErreur) {
        super(message);
    }
}