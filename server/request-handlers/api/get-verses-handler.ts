import { Mongo } from '../../mongo';
import express = require('express');
import { VerseRange } from '../../../shared/api-models/verse-range';
import { Verse } from '../../../shared/api-models/verse';

export async function getVersesHandler(req: express.Request, res: express.Response) {
  const requestedVerses = req.body.verses.map(x => <any>{
    chapterNumber: x.chapterNumber,
    verse: { '$gte': x.firstVerse, '$lte': x.lastVerse }
  });

  const db = await Mongo.connect();
  const data = (await db
    .collection('translations')
    .find({ '$or': requestedVerses })
    .map(x => {
      return new Verse({
        chapterNumber: x.chapterNumber,
        verseNumber: x.verseNumber
      });
    })
    .toArray());
  res.json(data);
}
