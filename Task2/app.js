import { express } from 'body-parser';
import { bodyParser } from 'express';
import { parsedCookies, parsedQuery } from './middlewares';
import { router } from './routes';

const app = express();
app.use(parsedCookies);
app.use(parsedQuery);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

module.exports = {
  app,
};
