import { BaseContext } from 'koa';
import { validateAll } from 'indicative/validator';

/**
 * Resourceful validator for validating playlists
 */
class PlaylistValidator {
  /**
   * Create/save a new playlist.
   * POST v1/playlists
   *
   * @param {BaseContext} ctx Koa Context
   */
  static async store(ctx: BaseContext, next: () => Promise<any>) {
    try {
      const rules = {
        title: 'required',
        description: 'required',
        thumbnail: 'required|url',
      };

      const messages = {
        required: (field: string) => `${field} é obrigatório`,
        url: (field: string) => `${field} precisa ser um url válido`,
      };

      await validateAll(ctx.request.body, rules, messages);
      await next();
    }
    catch (err) {
      ctx.status = 400;
      ctx.body = err;
    }
  };

  /**
   * Display a single playlist.
   * POST v1/playlists/:id
   *
   * @param {BaseContext} ctx Koa Context
   */
  static async show(ctx: BaseContext, next: () => Promise<any>) {
    if (!ctx.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      ctx.status = 404;
      ctx.body = [{ message: 'Playlist not found' }];
      return;
    }
    await next();
  };

  /**
   * Add a song to a playlist.
   * POST v1/playlists/:id/songs
   *
   * @param {BaseContext} ctx Koa Context
   */
  static async addSong(ctx: BaseContext, next: () => Promise<any>) {
    if (!ctx.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      ctx.status = 404;
      ctx.body = [{ message: 'Playlist not found' }];
      return;
    }

    try {
      const rules = {
        name: 'required',
        author: 'required',
        thumbnail: 'required|url',
        album: 'required',
        file: 'required|url',
        genre: 'required',
      };

      const messages = {
        required: (field: string) => `${field} é obrigatório`,
        url: (field: string) => `${field} precisa ser um url válido`,
      };

      await validateAll(ctx.request.body, rules, messages);
      await next();
    }
    catch (err) {
      ctx.status = 400;
      ctx.body = err;
    }
  };
}

export default PlaylistValidator;
