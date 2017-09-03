import { Mongo } from '../../mongo';
import { Api } from '../../api-models/chapter';

export async function getChaptersHandler(req, res) {
  const db = await Mongo.connect();
  const data = (await db
    .collection('chapters')
    .find({})
    .map(x => {
      return new Api.Models.Chapter({
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
