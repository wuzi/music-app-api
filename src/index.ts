import Koa from 'koa';
import routeLoader from './routes';
import koaSwagger from 'koa2-swagger-ui';

const app = new Koa();
const port = process.env.PORT || 3000;

import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/music', { useNewUrlParser: true });

routeLoader(app);
app.use(koaSwagger({ routePrefix: '/docs', swaggerOptions: { url: `http://localhost:${port}/swagger.json` } }));

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
