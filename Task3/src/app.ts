import express from 'express';
import * as bodyParser from 'body-parser';
import { router } from './routes';


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));
app.use(express.json());

app.get('/', (req, res) => res.send('Homework 3: CRUD operation with postgres DB'));

app.use(router);


export { app };