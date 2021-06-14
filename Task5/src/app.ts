import express from 'express';
import * as bodyParser from 'body-parser';
import { AppRouter } from './routes';
import { AddressInfo } from 'net';
import { morganMiddleware, Logger } from './logger';
import cors from 'cors';
import { jwt, errorHandler } from './helper';

export class App {

    private app;
    private appRouter: AppRouter;
    private port: number;

    constructor(port: number) {
        this.app = express();
        this.appRouter = new AppRouter();
        this.port = port;

        this.initializeMiddlewares();

        this.initializeRouter();
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({
            limit: '50mb',
            verify(req: any, res, buf, encoding) {
                req.rawBody = buf;
            }
        }));
        // this.app.use(cors());

        this.app.use(morganMiddleware);

        // use JWT auth to secure the api
        this.app.use(jwt());

        // global error handler
        this.app.use(errorHandler);
    }

    private initializeRouter() {
        this.app.get('/', (req, res) => res.send('Homework 3: CRUD operation with postgres DB'));
        this.app.use('/api', this.appRouter.getRouter());
    }

    public listen() {
        const server = this.app.listen(this.port, '127.0.0.1', () => {
            const { port, address } = server.address() as AddressInfo;
            Logger.log('info', `Server listening on: http:// ${address} : ${port}`);
        });
    }
}
