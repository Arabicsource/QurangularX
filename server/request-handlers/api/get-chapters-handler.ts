import { Mongo } from '../../mongo';
import { Chapter } from '../../../shared/api-models/chapter';
import express = require('express');

export async function getChaptersHandler(req: express.Request, res: express.Response) {
  const db = await Mongo.connect();
  const data = (await db
    .collection('chapters')
    .find({})
    .map(x => {
      return new Chapter({
        chapter: x.chapter,
        arabicName: x.arabicName,
        englishName: x.englishName,
        numberOfVerses: x.numberOfVerses
      });
    })
    .toArray())
    .sort((a, b) => a.chapter - b.chapter);
  res.json(data);
}
