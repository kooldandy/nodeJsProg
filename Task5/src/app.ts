import express from 'express';
import * as bodyParser from 'body-parser';
import { AppRouter } from './routes';
import { AddressInfo } from 'net';
import { loggerError, loggerRequest, morganMiddleware, winston } from './logger';

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

        //this.app.use(loggerRequest);
        //this.app.use(loggerError);

        this.app.use(morganMiddleware)
    }

    private initializeRouter() {
        this.app.get('/', (req, res) => res.send('Homework 3: CRUD operation with postgres DB'));
        this.app.use('/api', this.appRouter.getRouter());
    }

    public listen() {
        const server = this.app.listen(this.port, '0.0.0.0', () => {
            const { port, address } = server.address() as AddressInfo;
            winston.log('info', 'Server listening on:', 'http://' + address + ':' + port);
        });
    }
}
