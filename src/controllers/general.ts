import { Context } from 'koa';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerConfig from '../config/swagger';

/**
 * Controller for general routes
 */
class GeneralController {
  /**
   * Show a list of all playlists.
   * GET v1/playlists
   *
   * @param {Context} ctx Koa Context
   */
  public static async swagger(ctx: Context): Promise<void> {
    ctx.body = swaggerJSDoc(swaggerConfig);
  }
}

export default GeneralController;
