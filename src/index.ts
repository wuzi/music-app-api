import Koa from 'koa';
import koaSwagger from 'koa2-swagger-ui';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';
import routeLoader from './routes';
import mongoose from 'mongoose';
import logger from './utils/logger';
import cors from '@koa/cors';
import jwt from 'koa-jwt';
dotenv.config();

const app = new Koa();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE as string, { useNewUrlParser: true }).then((): void => {
  logger('database', 'Database connected successfully.', 'info');
}).catch((): void => {
  logger('database', 'Could not connnect to database.', 'error');
});

app.use(cors());
app.use(bodyParser());
app.use(koaSwagger({ routePrefix: '/docs', swaggerOptions: { url: '/swagger.json' } }));
app.use(jwt({ secret: process.env.SECRET as string }).unless({ path: [/^\/swagger.json/, /^\/docs/, /\/$/, /^\/v1\/login/, /^\/v1\/register/] }));
routeLoader(app);

app.listen(port, (): void => logger('index', `Server started at http://localhost:${port}`, 'info'));
