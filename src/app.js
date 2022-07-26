'use strict';

import express from 'express';

import './db/db';
import { notFoundMiddleware, setupMiddlewares } from './middlewares';
import { authRoutes } from './routes';

// Initializations:
const app = express();

// Middlewares
setupMiddlewares(app);

// Routes
app.use('/auth', authRoutes);

app.use(notFoundMiddleware);

export default app;
