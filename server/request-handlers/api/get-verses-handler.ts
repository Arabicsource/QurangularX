import { Mongo } from '../../mongo';
import express = require('express');
import { Verse } from '../../../shared/api-models/verse';
import { Translation } from '../../../shared/api-models/translation';
import { Translator } from '../../../shared/api-models/translator';

export async function getVersesHandler(req: express.Request, res: express.Response) {
  const requestedVerses = req.body.verses.map(x => <any>{
    chapter: x.chapter,
    verse: {'$gte': x.firstVerse, '$lte': x.lastVerse}
  });

  console.log('VERSES REQUESTED', requestedVerses);

  const db = await Mongo.connect();
  const data = (await db
    .collection('translations')
    .find({'$or': requestedVerses})
    .map(x => <Verse> {
      chapter: x.chapter,
      verse: x.verse,
      numberOfHadiths: x.numberOfHadiths,
      numberOfTafsirs: x.numberOfTafsirs,
      numberOfRoots: x.numberOfRoots,
      translations: x.translations
        .map(t => <Translation> {
          text: t.text,
          translator: <Translator>{
            name: t.translator.name,
            displayPriority: t.translator.displayPriority,
            code: t.translator.code
          }
        })
    })
    .toArray()
  );
  res.json(data);
}
