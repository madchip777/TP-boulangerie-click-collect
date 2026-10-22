
export type CodeErreur = number;

export class ErreurMetier extends Error {
    constructor(message: string, readonly code: CodeErreur) {
        super(message);
    }
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