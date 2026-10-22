import type { Horloge } from '../../../application/ports/Horloge';

// Horloge de test : on choisit l'heure qu'il est.
export class HorlogeFixe implements Horloge {
    constructor(private instant: Date) {}

    maintenant(): Date {
        return this.instant;
    }
}