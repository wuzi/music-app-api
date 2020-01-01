import { Context } from 'koa';
import Song from '../models/song';

/**
 * Resourceful controller for interacting with songs
 */
class SongController {
  /**
   * Show a list of all songs.
   * GET v1/songs
   *
   * @param {Context} ctx Koa Context
   */
  public static async index(ctx: Context): Promise<void> {
    const songs = await Song.find();
    ctx.body = songs;
  }

  /**
   * Create/save a new song.
   * POST v1/songs
   *
   * @param {Context} ctx Koa Context
   */
  public static async store(ctx: Context): Promise<void> {
    const song = await Song.create(ctx.request.body);

    ctx.status = 201;
    ctx.body = song;
  }
}

export default SongController;
