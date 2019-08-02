import { BaseContext } from 'koa';
import { validateAll } from 'indicative/validator';
import Playlist from '../models/playlist';

/**
 * Resourceful controller for interacting with playlists
 */
class PlaylistController {
  /**
   * Show a list of all playlists.
   * GET v1/playlists
   *
   * @param {BaseContext} ctx Koa Context
   */
  static async index(ctx: BaseContext) {
    const playlists = await Playlist.find();
    ctx.body = playlists;
  };

  /**
   * Create/save a new playlist.
   * POST v1/playlists
   *
   * @param {BaseContext} ctx Koa Context
   */
  static async store(ctx: BaseContext) {
    try {
      const rules = {
        title: 'required',
        description: 'required',
        thumbnail: 'required',
      };

      const messages = {
        required: (field: string) => `${field} é obrigatório`,
      };

      await validateAll(ctx.request.body, rules, messages);
    }
    catch (err) {
      ctx.status = 400;
      ctx.body = err;
      return;
    }

    const playlist = new Playlist(ctx.request.body);
    await playlist.save();

    ctx.status = 201;
    ctx.body = playlist;
  };
}

export default PlaylistController;
