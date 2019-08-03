import { BaseContext } from 'koa';
import { validateAll } from 'indicative/validator';

/**
 * Resourceful controller for interacting with songs
 */
class SongValidator {
  /**
   * Create/save a new song.
   * POST v1/songs
   *
   * @param {BaseContext} ctx Koa Context
   */
  static async store(ctx: BaseContext, next: any) {
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
      await next();
    }
    catch (err) {
      ctx.status = 400;
      ctx.body = err;
      return;
    }
  };
}

export default SongValidator;
