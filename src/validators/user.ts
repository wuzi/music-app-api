import { BaseContext } from 'koa';
import { validateAll } from 'indicative/validator';

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
  static async show(ctx: BaseContext, next: () => Promise<any>) {
    if (!ctx.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      ctx.status = 404;
      ctx.body = [{ message: 'User not found' }];
      return;
    }
    await next();
  };
}

export default UserValidator;
