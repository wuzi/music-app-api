import { BaseContext } from 'koa';
import { validateAll } from 'indicative/validator';

/**
 * Resourceful validator for validating playlists
 */
class PlaylistValidator {
  /**
   * Show a list of all playlists.
   * GET v1/playlists
   *
   * @param {BaseContext} ctx Koa Context
   */
  static async index(ctx: BaseContext) {
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
  };

  /**
   * Add a song to a playlist.
   * POST v1/playlists/:id/song
   *
   * @param {BaseContext} ctx Koa Context
   */
  static async addSong(ctx: BaseContext) {
    if (!ctx.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      ctx.status = 404;
      ctx.body = [{ message: 'Playlist not found' }];
      return;
    }

    try {
      const rules = {
        name: 'required',
        author: 'required',
        thumbnail: 'required',
        album: 'required',
        file: 'required',
        genre: 'required',
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
  };
}

export default PlaylistValidator;
