import { Mongo } from '../../mongo';

export async function getChaptersHandler(req, res) {
  const db = await Mongo.connect();
  const data = await db
    .collection('chapters')
    .find({})
    .map(x => {
      return {
        chapterNumber: x.chapterNumber,
        arabicName: x.arabicName,
        englishName: x.englishName,
        numberOfVerses: x.numberOfVerses
      };
    })
    .toArray();
  res.json(data.sort((a, b) => a.chapterNumber - b.chapterNumber));
}
