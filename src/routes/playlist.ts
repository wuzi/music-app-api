import Router from 'koa-router';
import PlaylistValidator from '../validators/playlist';
import PlaylistController from '../controllers/playlist';

const router = new Router();
router.prefix('/v1/playlists');

/**
 * Show a list of all playlists.
 * GET v1/playlists
 */
router.get('/', PlaylistController.index);

/**
 * Create/save a new playlist.
 * POST v1/playlists
 */
router.post('/', PlaylistValidator.store, PlaylistController.store);

/**
 * Display a single playlist.
 * GET v1/playlists/:id
 */
router.get('/:id', PlaylistValidator.show, PlaylistController.show);

/**
 * Add a song to a playlist.
 * POST v1/playlists/:id/songs
 */
router.post('/:id/songs', PlaylistValidator.addSong, PlaylistController.addSong);

export default router;
