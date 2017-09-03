import * as express from 'express';
import { getChaptersHandler } from './api/get-chapters-handler';

export function registerRequestHandlers(app: express) {
  app.get('/api/chapters', getChaptersHandler);
}
