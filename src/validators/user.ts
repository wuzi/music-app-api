import { BaseContext } from 'koa';

/**
 * Resourceful validator for validating users
 */
class UserValidator {
  /**
   * Display a single user.
   * POST v1/users/:id
   *
   * @param {BaseContext} ctx Koa Context
   */
  public static async show(ctx: BaseContext, next: () => Promise<unknown>): Promise<void> {
    if (!ctx.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      ctx.status = 404;
      ctx.body = { message: 'Usuário não encontrado' };
      return;
    }
    await next();
  }
} 

export default UserValidator;
