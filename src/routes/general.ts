import Router from 'koa-router';
import GeneralController from '../controllers/general';

const router = new Router();
router.get('/swagger.json', GeneralController.swagger);
router.get('/', (ctx): string => ctx.body = 'API Online' );

export default router;
