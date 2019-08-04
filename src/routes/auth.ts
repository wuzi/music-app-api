import Router from 'koa-router';
import AuthController from '../controllers/auth';
import AuthValidator from '../validators/auth';

const router = new Router();
router.prefix('/v1');

/**
 * Authenticate an user.
 * POST v1/login
 */
router.post('/login', AuthValidator.login, AuthController.login);

/**
 * Register a new user.
 * POST v1/register
 */
router.post('/register', AuthValidator.register, AuthController.register);

export default router;
