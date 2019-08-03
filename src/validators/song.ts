import { BaseContext } from 'koa';
import { validateAll } from 'indicative/validator';

/**
 * Resourceful controller for interacting with songs
 */
class SongValidator {
  /**
   * Show a list of all songs.
   * GET v1/songs
   *
   * @param {BaseContext} ctx Koa Context
   */
  static async index(ctx: BaseContext) {
  };

  /**
   * Create/save a new song.
   * POST v1/songs
   *
   * @param {BaseContext} ctx Koa Context
   */
  static async store(ctx: BaseContext) {
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

export default SongValidator;
