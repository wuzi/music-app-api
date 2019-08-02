import Router from 'koa-router';
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
router.post('/', PlaylistController.store);

export default router;
