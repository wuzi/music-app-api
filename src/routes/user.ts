import Router from 'koa-router';
import UserController from '../controllers/user';
import UserValidator from '../validators/user';

const router = new Router();
router.prefix('/v1/users');

/**
 * Display a single user.
 * GET v1/users/:id
 */
router.get('/:id', UserValidator.show, UserController.show);

export default router;
