import * as express from 'express';
import { getChaptersHandler } from './api/get-chapters-handler';
import { getVersesHandler } from './api/get-verses-handler';

export function registerRequestHandlers(app: express.Application) {
  app.post('/api/chapters', getChaptersHandler);
  app.post('/api/verses', getVersesHandler);
}
