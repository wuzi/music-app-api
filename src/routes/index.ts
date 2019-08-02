import Koa from 'koa';
import song from './song';
import general from './general';
import playlist from './playlist';

const routeLoader = (app: Koa<any, {}>) => {
  app.use(song.routes());
  app.use(general.routes());
  app.use(playlist.routes());
};

export default routeLoader;
