import Router from 'koa-router';
import SongController from '../controllers/song';

const router = new Router();
router.prefix('/v1/songs');

/**
 * Show a list of all songs.
 * GET v1/songs
 */
router.get('/', SongController.index);

/**
 * Create/save a new song.
 * POST v1/songs
 */
router.post('/', SongController.store);

export default router;
