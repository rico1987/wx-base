import Koa from 'koa';
import json from 'koa-json';
import logger from 'koa-logger';

const app = new Koa();

app.use(async(ctx) => {
    ctx.body = 'Hello World';
});

app.listen(3000);
