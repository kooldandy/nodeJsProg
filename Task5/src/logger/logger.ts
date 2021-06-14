import * as _winston from 'winston';

const remoteLog = new _winston.transports.Http({
  host: 'localhost',
  port: 5000,
  path: '/errors',
});

const consoleLog = new _winston.transports.Console();

function createRequestLogger(transports: any[]) {
  const requestLogger = _winston.createLogger({
    format: getRequestLogFormatter(),
    transports,
  });

  return function logRequest(req: any, res: any, next: () => void) {
    requestLogger.info({ req, res });
    next();
  };
}

function createErrorLogger(transports: any[]) {
  const errLogger = _winston.createLogger({
    level: 'error',
    transports,
  });

  return function logError(err: any, req: any, res: any, next: () => void) {
    errLogger.error({ err, req, res });
    next();
  };
}

function getRequestLogFormatter() {
  const { combine, timestamp, printf } = _winston.format;

  return combine(
    timestamp(),
    printf(({ message, level }) => {
      const { req, res } = message as any;
      return `${level}: ${req.hostname}${req.port || ''}${req.originalUrl}`;
    }),
  );
}

const loggerRequest = createRequestLogger([consoleLog]);
const loggerError = createErrorLogger([consoleLog]);

const winston = _winston;

export { loggerRequest, loggerError, winston };