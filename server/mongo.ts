import { MongoClient, Db } from 'mongodb';

export class Mongo {
  public static async connect() {
    return MongoClient.connect('mongodb://localhost:27017/QuranX');
  }
}
