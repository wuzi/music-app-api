import Router from 'koa-router';
const router = new Router();

router.get('/', ctx => ctx.body = 'API Online' );

export default router;
