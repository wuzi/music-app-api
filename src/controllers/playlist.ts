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
  public static async index(ctx: BaseContext): Promise<void> {
    const playlists = await Playlist.find();
    ctx.body = playlists;
  }

  /**
   * Create/save a new playlist.
   * POST v1/playlists
   *
   * @param {BaseContext} ctx Koa Context
   */
  public static async store(ctx: BaseContext): Promise<void> {
    const user = await User.findById(ctx.state.user._id);
    if (!user) {
      ctx.body = { message: 'Token inválido' };
      ctx.status = 401;
      return;
    }

    const playlist = new Playlist({ ...ctx.request.body, author: user._id });
    await playlist.save();

    user.playlists.push(playlist._id);
    await user.save();

    ctx.status = 201;
    ctx.body = playlist;
  }

  /**
   * Display a single playlist.
   * GET v1/playlists/:id
   *
   * @param {BaseContext} ctx Koa Context
   */
  public static async show(ctx: BaseContext): Promise<void> {
    const playlist = await Playlist.findById(ctx.params.id).populate('author');
    if (!playlist) {
      ctx.status = 404;
      ctx.body = { message: 'Playlist não encontrada' };
      return;
    }

    ctx.body = playlist;
  }

  /**
   * Add a song to a playlist.
   * POST v1/playlists/:id/songs
   *
   * @param {BaseContext} ctx Koa Context
   */
  public static async addSong(ctx: BaseContext): Promise<void> {
    const playlist = await Playlist.findById(ctx.params.id);
    if (!playlist) {
      ctx.status = 404;
      ctx.body = { message: 'Playlist não encontrada' };
      return;
    }

    const song = new Song(ctx.request.body);
    playlist.songs.push(song);
    playlist.save();

    ctx.status = 201;
    ctx.body = playlist;
  }

  /**
   * Remove a song from a playlist.
   * DELETE v1/playlists/:id/songs/:sid
   *
   * @param {BaseContext} ctx Koa Context
   */
  public static async removeSong(ctx: BaseContext): Promise<void> {
    const playlist = await Playlist.findById(ctx.params.id);
    if (!playlist) {
      ctx.status = 404;
      ctx.body = { message: 'Playlist não encontrada' };
      return;
    }

    const songIndex = playlist.songs.findIndex((s): boolean => { return s._id == ctx.params.sid; });
    if (songIndex == -1) {
      ctx.status = 404;
      ctx.body = { message: 'Song não encontrado' };
      return;
    }

    playlist.songs.splice(songIndex, 1);
    playlist.save();

    ctx.status = 200;
    ctx.body = playlist;
  }
}

export default PlaylistController;
