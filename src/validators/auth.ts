import { BaseContext } from 'koa';
import { validateAll } from 'indicative/validator';
import User from '../models/user';

/**
 * Resourceful validator for validating authentication
 */
class AuthValidator {
  /**
   * Authenticate an user.
   * POST v1/login
   *
   * @param {BaseContext} ctx Koa Context
   * @param {Promise<unknown>} next Call if it should pass to the next middleware
   */
  public static async login(ctx: BaseContext, next: () => Promise<unknown>): Promise<void> {
    try {
      const rules = {
        email: 'required|email',
        password: 'required',
      };

      const messages = {
        required: (field: string): string => `${field} é obrigatório`,
        email: (field: string): string => `${field} deve ser um email válido`,
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
   * Register a new user.
   * POST v1/register
   *
   * @param {BaseContext} ctx Koa Context
   * @param {Promise<unknown>} next Call if it should pass to the next middleware
   */
  public static async register(ctx: BaseContext, next: () => Promise<unknown>): Promise<void> {
    try {
      const rules = {
        name: 'required',
        email: 'required|email',
        password: 'required',
      };

      const messages = {
        required: (field: string): string => `${field} é obrigatório`,
        email: (field: string): string => `${field} deve ser um email válido`,
      };

      await validateAll(ctx.request.body, rules, messages);

      const user = await User.findOne({ email: ctx.request.body.email });
      if (user) {
        ctx.status = 400;
        ctx.body = [{ message: 'Este email já está cadastrado' }];
        return;
      }
      await next();
    }
    catch (err) {
      ctx.status = 400;
      ctx.body = err;
    }
  }  
}

export default AuthValidator;
