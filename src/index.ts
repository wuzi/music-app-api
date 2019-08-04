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

mongoose.connect(<string>process.env.DATABASE, { useNewUrlParser: true }).then(() => {
  logger('database', 'Database connected successfully.', 'info');
}).catch(() => {
  logger('database', 'Could not connnect to database.', 'error');
});

app.use(cors());
app.use(bodyParser());
app.use(koaSwagger({ routePrefix: '/docs', swaggerOptions: { url: `/swagger.json` } }));
app.use(jwt({ secret: <string>process.env.SECRET }).unless({ path: [/^\/swagger.json/, /^\/docs/, /\/$/, /^\/v1\/login/, /^\/v1\/register/] }));
routeLoader(app);

app.listen(port, () => logger('index', `Server started at http://localhost:${port}`, 'info'));
