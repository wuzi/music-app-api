/* eslint @typescript-eslint/no-explicit-any: off */
import sinon from 'sinon';
import mongoose from 'mongoose';
import { PlaylistSchema } from '../models/playlist';
import PlaylistController from '../controllers/playlist';
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

describe('playlists', (): void => {
  it('should show a list of all playlists', async (): Promise<void> => {
    const ctx: any = {
      query: {},
    };

    const Playlist = mongoose.model('Playlist', PlaylistSchema);
    const mockFind = await Playlist.find() as any;
    sinon.stub(mongoose.Model, 'find').returns(mockFind);

    await PlaylistController.index(ctx);
    expect(ctx.body).toStrictEqual([]);
  });

  it('should return a single playlist', async (): Promise<void> => {
    const ctx: any = {
      params: {
        id: '507f1f77bcf86cd799439011'
      },
    };

    const Playlist = mongoose.model('Playlist', PlaylistSchema);
    const playlist = await Playlist.create({
      _id: ctx.params.id,
      author: '542c2b97bac0595474108b48',
      title: 'playlist title',
      description: 'playlist description',
      thumbnail: 'https://picsum.photos/id/658/200/300',
      songs: [],
    });

    const mockFindById = await Playlist.findById(ctx.params.id) as any;
    sinon.stub(mongoose.Model, 'findById').returns(mockFindById);

    await PlaylistController.show(ctx);
    expect(ctx.body.toJSON()).toStrictEqual(playlist.toJSON());
  });
});
