import Router from 'koa-router';
import SwaggerController from '../controllers/swagger';

const router = new Router();
router.get('/swagger.json', ctx => ctx.body = SwaggerController);
router.get('/', ctx => ctx.body = 'API Online' );

export default router;
