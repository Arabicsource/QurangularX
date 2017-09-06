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
        chapterNumber: x.chapterNumber,
        arabicName: x.arabicName,
        englishName: x.englishName,
        numberOfVerses: x.numberOfVerses
      });
    })
    .toArray())
    .sort((a, b) => a.chapterNumber - b.chapterNumber);
  res.json(data);
}
