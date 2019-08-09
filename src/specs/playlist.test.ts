/* eslint @typescript-eslint/no-explicit-any: off */
import sinon from 'sinon';
import mongoose from 'mongoose';
import PlaylistController from '../controllers/playlist';

test('show a list of all playlists', async (): Promise<void> => {
  const ctx: any = {
    query: {},
  };

  const mockFind: any = [];
  sinon.stub(mongoose.Model, 'find').returns(mockFind);

  await PlaylistController.index(ctx);
  expect(ctx.body).toStrictEqual([]);
});
