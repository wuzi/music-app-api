import Koa from 'koa';
import koaSwagger from 'koa2-swagger-ui';
import bodyParser from 'koa-bodyparser';
import routeLoader from './routes';

const app = new Koa();
const port = process.env.PORT || 3000;

import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/music', { useNewUrlParser: true });

app.use(bodyParser());
app.use(koaSwagger({ routePrefix: '/docs', swaggerOptions: { url: `http://localhost:${port}/swagger.json` } }));
routeLoader(app);

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
