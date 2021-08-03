import 'reflect-metadata';
import express, { Application, Request, Response, NextFunction, RequestHandler } from 'express';
import logging from '../config/logging';
import config from '../config';
import { container } from './inversify.config';
import { InversifyExpressServer, BaseMiddleware } from 'inversify-express-utils';
import './ioc';


const NAMESPACE = 'Server';
const port = config.server.port;


const server = new InversifyExpressServer(container);
server.setConfig((app) => {
    app.use(
        express.urlencoded({
            extended: true
        })
    );
    app.use(express.json()); 
});

const app: Application = server.build();

app.use((req:Request, res:Response, next) => {
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })

    next();
});

app.use((req:Request, res:Response, next:NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    return next();
});

app.get("/", (_: Request, res: Response) => {
    res.send(`Online on ${new Date()}`)
})

app.use((_: Request, res: Response, __: NextFunction) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

module.exports = app.listen(port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
