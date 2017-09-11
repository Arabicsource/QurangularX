import { Mongo } from '../../mongo';
import express = require('express');
import { Verse } from '../../../shared/api-models/verse';
import { Translation } from '../../../shared/api-models/translation';
import { Translator } from '../../../shared/api-models/translator';

export async function getVersesHandler(req: express.Request, res: express.Response) {
  const requestedVerses = req.body.verses.map(x => <any>{
    chapterNumber: x.chapterNumber,
    verseNumber: {'$gte': x.firstVerse, '$lte': x.lastVerse}
  });

  console.log('VERSES REQUESTED', requestedVerses);

  const db = await Mongo.connect();
  const data = (await db
    .collection('translations')
    .find({'$or': requestedVerses})
    .map(x => new Verse({
      chapterNumber: x.chapterNumber,
      verseNumber: x.verseNumber,
      numberOfHadiths: x.numberOfHadiths,
      numberOfTafsirs: x.numberOfTafsirs,
      numberOfRoots: x.numberOfRoots,
      translations: x.translations
        .map(t => new Translation({
          text: t.text,
          translator: new Translator({
            name: t.translator.name,
            displayPriority: t.translator.displayPriority,
            code: t.translator.code
          })
        }))
    }))
    .toArray()
  );
  res.json(data);
}
