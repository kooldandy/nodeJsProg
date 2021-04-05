const bodyParser = require('body-parser');
const express = require('express');
const { parsedCookies, parsedQuery } = require('./middlewares');
const { router } = require('./routes');

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
