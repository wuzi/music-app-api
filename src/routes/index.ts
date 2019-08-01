import Router from 'koa-router';
const router = new Router();

import swagger from '../controllers/swagger';
router.get('/swagger.json', ctx => ctx.body = swagger);

router.get('/', ctx => ctx.body = 'API Online' );

export default router;
