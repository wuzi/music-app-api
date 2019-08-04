import Koa from 'koa';
import auth from './auth';
import song from './song';
import user from './user';
import general from './general';
import playlist from './playlist';

const routeLoader = (app: Koa<any, {}>) => {
  app.use(auth.routes());
  app.use(song.routes());
  app.use(user.routes());
  app.use(general.routes());
  app.use(playlist.routes());
};

export default routeLoader;
