import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import { router } from './controllers/router';
import * as minimist from 'minimist';

export async function initServer() {

    const argv = minimist(process.argv.slice(2));
    const app = new Koa();
    const port = argv.port ? parseInt(argv.port) : 8073;
        
    app.use(logger());
    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(port);
    
    console.log(`Server started, see http://localhost:${port}
        Endpoints:
            * GET  /flights
            * GET  /flights?limit=:limit&offset=:offeset`);
}
