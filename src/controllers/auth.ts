import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BaseContext } from 'koa';
import User from '../models/user';

/**
 * Controller for authenticating users
 */
class AuthController {
  /**
   * Authenticate an user.
   * POST v1/login
   *
   * @param {BaseContext} ctx Koa Context
   */
  static async login(ctx: BaseContext) {
    const { email, password } = ctx.request.body;

    const user = await User.findOne({ email });
    if (!user) {
      ctx.status = 401;
      ctx.body = { message: 'Email não cadastrado' };
      return;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      ctx.status = 401;
      ctx.body = { message: 'Senha incorreta' };
      return;
    }

    const token = jwt.sign({ email, _id: user._id }, <string>process.env.SECRET, { expiresIn: '24h' });
    ctx.body = { token, user };
  };

  /**
   * Register a new user.
   * POST v1/register
   *
   * @param {BaseContext} ctx Koa Context
   */
  static async register(ctx: BaseContext) {
    const { name, email, password } = ctx.request.body;

    const user = await User.create({ name, email, password });
    const token = jwt.sign({ email, _id: user._id }, <string>process.env.SECRET, { expiresIn: '24h' });

    ctx.body = { token, user };
  };

  /**
   * Get the authenciated user.
   * POST v1/user
   *
   * @param {BaseContext} ctx Koa Context
   */
  static async getAuthenticatedUser(ctx: BaseContext) {
    const user = await User.findById(ctx.state.user._id);
    ctx.body = user;
  };
}

export default AuthController;
