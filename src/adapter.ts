import { IoAdapter } from '@nestjs/platform-socket.io';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Server } from 'socket.io';
import * as sharedsession from 'express-socket.io-session';

/**
 * Enable session tokens for web sockets by using express-socket.io-session
 */
export class EventsAdapter extends IoAdapter {
  private app: NestExpressApplication;

  constructor(app: NestExpressApplication) {
    super(app);
    this.app = app;
  }

  createIOServer(port: number, options?: any): any {
    const server: Server = super.createIOServer(port, options);

    let session = require('express-session')({
      secret: 'my-little-secret',
      resave: false,
      saveUninitialized: false,
    });

    this.app.use(session);
    server.use(sharedsession(session, {
      autoSave: true,
    }));
    return server;
  }
}