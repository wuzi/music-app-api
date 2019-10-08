/* eslint @typescript-eslint/no-explicit-any: off */
import sinon from 'sinon';
import mongoose from 'mongoose';
import { SongSchema } from '../models/song';
import SongController from '../controllers/song';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;
const opts = { useNewUrlParser: true, useFindAndModify: false };

beforeAll(async (): Promise<void> => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, opts, (err): void => {
    if (err) console.error(err);
  });
});

afterAll(async (): Promise<void> => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async (): Promise<void> => {
  sinon.restore();
});

describe('songs', (): void => {
  it('should show a list of all songs', async (): Promise<void> => {
    const ctx: any = {
      query: {},
    };

    const Song = mongoose.model('Song', SongSchema);
    const mockFind = await Song.find() as any;
    sinon.stub(mongoose.Model, 'find').returns(mockFind);

    await SongController.index(ctx);
    expect(ctx.body).toStrictEqual([]);
  });

  it('should store a new song', async (): Promise<void> => {
    const ctx: any = {
      request: {
        body: {
          name: 'Numb',
          author: 'Linkin Park',
          thumbnail: 'http://random.pic/400/100',
          album: 'Meteora',
          file: 'http://random.file/122/112',
          genre: 'Rock',
        },
      },
    };

    const Song = mongoose.model('Song', SongSchema);
    const mockCreate = await Song.create(ctx.request.body) as any;
    sinon.stub(mongoose.Model, 'create').returns(mockCreate);

    await SongController.store(ctx);
    expect(ctx.body.toJSON()).toStrictEqual(mockCreate.toJSON());
  });
});
