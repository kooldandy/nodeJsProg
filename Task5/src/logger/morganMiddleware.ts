import morgan, { StreamOptions } from "morgan";
import { Request, Response } from "express";
import Logger from "./winstonLogger";

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
  // Use the http severity
  write: (message) =>
    Logger.http(message.substring(0, message.lastIndexOf("\n"))),
}

// Skip all the Morgan http log if the
// application is not running in development mode.
// This method is not really needed here since
// we already told to the logger that it should print
// only warning and error messages in production.
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const registerQuery = () => {
  morgan.token("body", (req: Request) => `Body ${JSON.stringify(req.body)}`);
};

const registerParam = () => {
  morgan.token("params", (req: Request) => `Param ${JSON.stringify(req.params)}`);
};

registerQuery();
registerParam();

// Build the morgan middleware
const morganMiddleware = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  ":method :url :status :res[content-length] - :response-time ms\n:body\n:params",
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream, skip }
);

export default morganMiddleware;