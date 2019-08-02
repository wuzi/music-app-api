import { BaseContext } from 'koa';
import Playlist from '../models/playlist';

/**
 * Resourceful controller for interacting with playlists
 */
class PlaylistController {
  /**
   * Show a list of all playlists.
   * GET v1/playlists
   *
   * @param {BaseContext} ctx Koa Context
   */
  static async index(ctx: BaseContext) {
    const playlists = await Playlist.find();
    ctx.body = playlists;
  };
}

export default PlaylistController;
