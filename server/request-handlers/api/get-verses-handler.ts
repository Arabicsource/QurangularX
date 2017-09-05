import { Mongo } from '../../mongo';

export async function getVersesHandler(req, res) {
  const db = await Mongo.connect();
  throw new Error('Not implemented');
}
