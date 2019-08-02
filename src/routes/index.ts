import Koa from 'koa';
import general from './general';
import playlist from './playlist';

const routeLoader = (app: Koa<any, {}>) => {
  app.use(general.routes());
  app.use(playlist.routes());
};

export default routeLoader;
