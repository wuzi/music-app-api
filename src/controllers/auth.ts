import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Context } from 'koa';
import User from '../models/user';

/**
 * Controller for authenticating users
 */
class AuthController {
  /**
   * Authenticate an user.
   * POST v1/login
   *
   * @param {Context} ctx Koa Context
   */
  public static async login(ctx: Context): Promise<void> {
    const { email, password } = ctx.request.body;

    const user = await User.findOne({ email }).select('+password');
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

    const token = jwt.sign({ email, _id: user._id }, process.env.SECRET as string, { expiresIn: '24h' });

    const userObj = user.toObject();
    delete userObj.password;

    ctx.body = { token, user: userObj };
  }

  /**
   * Register a new user.
   * POST v1/register
   *
   * @param {Context} ctx Koa Context
   */
  public static async register(ctx: Context): Promise<void> {
    const { name, email, password } = ctx.request.body;

    const user = await User.create({ name, email, password });
    const token = jwt.sign({ email, _id: user._id }, process.env.SECRET as string, { expiresIn: '24h' });

    const userObj = user.toObject();
    delete userObj.password;

    ctx.body = { token, user: userObj };
  }

  /**
   * Get the authenciated user.
   * POST v1/user
   *
   * @param {Context} ctx Koa Context
   */
  public static async getAuthenticatedUser(ctx: Context): Promise<void> {
    const user = await User.findById(ctx.state.user._id).populate('playlists');
    ctx.body = user;
  }
}

export default AuthController;
