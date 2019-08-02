import Koa from 'koa';
import koaSwagger from 'koa2-swagger-ui';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';
import routeLoader from './routes';
import mongoose from 'mongoose';
dotenv.config();

const app = new Koa();
const port = process.env.PORT || 3000;

mongoose.connect(<string>process.env.DATABASE, { useNewUrlParser: true }).then(() => {
  console.log(`Database connected successfully.`);
}).catch(() => {
  console.log(`ERROR: Could not connnect to database.`);
});

app.use(bodyParser());
app.use(koaSwagger({ routePrefix: '/docs', swaggerOptions: { url: `http://localhost:${port}/swagger.json` } }));
routeLoader(app);

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
