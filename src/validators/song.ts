import { BaseContext } from 'koa';
import { validateAll } from 'indicative/validator';

/**
 * Resourceful validator for validating songs
 */
class SongValidator {
  /**
   * Create/save a new song.
   * POST v1/songs
   *
   * @param {BaseContext} ctx Koa Context
   */
  static async store(ctx: BaseContext, next: () => Promise<any>) {
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

export default SongValidator;
