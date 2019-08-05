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
   */
  static async login(ctx: BaseContext, next: () => Promise<any>) {
    try {
      const rules = {
        email: 'required|email',
        password: 'required',
      };

      const messages = {
        required: (field: string) => `${field} é obrigatório`,
        email: (field: string) => `${field} deve ser um email válido`,
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
   * Register a new user.
   * POST v1/register
   *
   * @param {BaseContext} ctx Koa Context
   */
  static async register(ctx: BaseContext, next: () => Promise<any>) {
    try {
      const rules = {
        name: 'required',
        email: 'required|email',
        password: 'required',
      };

      const messages = {
        required: (field: string) => `${field} é obrigatório`,
        email: (field: string) => `${field} deve ser um email válido`,
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
      return;
    }
  };  
}

export default AuthValidator;
