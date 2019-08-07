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
   * @param {Promise<unknown>} next Call if it should pass to the next middleware
   */
  public static async store(ctx: BaseContext, next: () => Promise<unknown>): Promise<void> {
    try {
      const rules = {
        title: 'required',
        description: 'required',
        thumbnail: 'required|url',
      };

      const messages = {
        required: (field: string): string => `${field} é obrigatório`,
        url: (field: string): string => `${field} precisa ser um url válido`,
      };

      await validateAll(ctx.request.body, rules, messages);
      await next();
    }
    catch (err) {
      ctx.status = 400;
      ctx.body = err;
    }
  }

  /**
   * Display a single playlist.
   * POST v1/playlists/:id
   *
   * @param {BaseContext} ctx Koa Context
   * @param {Promise<unknown>} next Call if it should pass to the next middleware
   */
  public static async show(ctx: BaseContext, next: () => Promise<unknown>): Promise<void> {
    if (!ctx.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      ctx.status = 404;
      ctx.body = { message: 'Playlist não encontrada' };
      return;
    }
    await next();
  }

  /**
   * Add a song to a playlist.
   * POST v1/playlists/:id/songs
   *
   * @param {BaseContext} ctx Koa Context
   * @param {Promise<unknown>} next Call if it should pass to the next middleware
   */
  public static async addSong(ctx: BaseContext, next: () => Promise<unknown>): Promise<void> {
    if (!ctx.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      ctx.status = 404;
      ctx.body = { message: 'Playlist não encontrada' };
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
        required: (field: string): string => `${field} é obrigatório`,
        url: (field: string): string => `${field} precisa ser um url válido`,
      };

      await validateAll(ctx.request.body, rules, messages);
      await next();
    }
    catch (err) {
      ctx.status = 400;
      ctx.body = err;
    }
  }

  /**
   * Remove a song from a playlist.
   * DELETE v1/playlists/:id/songs/:sid
   *
   * @param {BaseContext} ctx Koa Context
   * @param {Promise<unknown>} next Call if it should pass to the next middleware
   */
  public static async removeSong(ctx: BaseContext, next: () => Promise<unknown>): Promise<void> {
    if (!ctx.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      ctx.status = 404;
      ctx.body = { message: 'Playlist não encontrada' };
      return;
    }

    if (!ctx.params.sid.match(/^[0-9a-fA-F]{24}$/)) {
      ctx.status = 404;
      ctx.body = { message: 'Song não encontrado' };
      return;
    }

    await next();
  }
}

export default PlaylistValidator;
