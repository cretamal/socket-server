import express from 'express';
import { SERVER_PORT } from '../global/enviroments';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';

export default class Server {
    private static _instance: Server;
    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;



    private constructor(){

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io=require("socket.io")(this.httpServer, {
            cors: {
                origin: true,
                credentials: true
              }
        });
        this.eachSocket();

    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private eachSocket(){
        this.io.on('connection', (client) => {            
            console.log('cliente conectado');
            // MENSAJES
            socket.message(client, this.io);
            // DESCONECTAR
            socket.disconnect(client);
        });
    }

    start(callback: any) {
        this.httpServer.listen(this.port, callback);
    }

}