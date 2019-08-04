import { BaseContext } from 'koa';
import Playlist from '../models/playlist';
import Song from '../models/song';
import User from '../models/user';

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

  /**
   * Create/save a new playlist.
   * POST v1/playlists
   *
   * @param {BaseContext} ctx Koa Context
   */
  static async store(ctx: BaseContext) {
    const user = await User.findById(ctx.state.user._id);
    if (!user) {
      ctx.body = 'Token inválido';
      ctx.status = 401;
      return;
    }

    const playlist = new Playlist({ ...ctx.request.body, author: user._id });
    await playlist.save();

    user.playlists.push(playlist._id);
    await user.save();

    ctx.status = 201;
    ctx.body = playlist;
  };

  /**
   * Display a single playlist.
   * GET v1/playlists/:id
   *
   * @param {BaseContext} ctx Koa Context
   */
  static async show(ctx: BaseContext) {
    const playlist = await Playlist.findById(ctx.params.id).populate('author');
    if (!playlist) {
      ctx.status = 404;
      ctx.body = { message: 'Playlist not found' };
      return;
    }

    ctx.body = playlist;
  };

  /**
   * Add a song to a playlist.
   * POST v1/playlists/:id/songs
   *
   * @param {BaseContext} ctx Koa Context
   */
  static async addSong(ctx: BaseContext) {
    const playlist = await Playlist.findById(ctx.params.id);
    if (!playlist) {
      ctx.status = 404;
      ctx.body = { message: 'Playlist not found' };
      return;
    }

    const song = new Song(ctx.request.body);
    playlist.songs.push(song)
    playlist.save();

    ctx.status = 201;
    ctx.body = playlist;
  };
}

export default PlaylistController;
