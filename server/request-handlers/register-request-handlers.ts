import * as express from 'express';
import { getChaptersHandler } from './api/get-chapters-handler';
import { getVersesHandler } from './api/get-verses-handler';

export function registerRequestHandlers(app: express) {
  app.get('/api/chapters', getChaptersHandler);
  app.get('/api/verses', getVersesHandler);
}
