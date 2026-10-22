// Crée l'application Express

import express from 'express';
import { commandeRoutes } from './presentation/commandeRoutes';

export const app = express();
app.use(express.json());
app.use(commandeRoutes());