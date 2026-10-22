import type { Horloge } from '../../../application/ports/Horloge';

export class HorlogeSysteme implements Horloge {
    maintenant(): Date {
        return new Date();
    }
}