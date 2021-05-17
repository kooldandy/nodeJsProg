import { App } from './app';

const {PORT} =  process.env;

const app = new App(parseInt(PORT, 10));

app.listen();