import { BaseContext } from 'koa';
import Song from '../models/song';

/**
 * Resourceful controller for interacting with songs
 */
class SongController {
  /**
   * Show a list of all songs.
   * GET v1/songs
   *
   * @param {BaseContext} ctx Koa Context
   */
  public static async index(ctx: BaseContext): Promise<void> {
    const songs = await Song.find();
    ctx.body = songs;
  }

  /**
   * Create/save a new song.
   * POST v1/songs
   *
   * @param {BaseContext} ctx Koa Context
   */
  public static async store(ctx: BaseContext): Promise<void> {
    const song = new Song(ctx.request.body);
    await song.save();

    ctx.status = 201;
    ctx.body = song;
  }
}

export default SongController;
