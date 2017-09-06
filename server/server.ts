import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppServerModuleNgFactory } from '../dist/ngfactory/client/app/app.server.module.ngfactory';
import { registerRequestHandlers } from './request-handlers/register-request-handlers';
import bodyParser = require('body-parser');
import express = require('express');

const PORT = 4000;
enableProdMode();

class ServerFactory {
  public static create(): express.Application {
    const app = express();
    app.use(bodyParser.json());
    ServerFactory.setViewEngine(app);
    ServerFactory.setPathHandlers(app);

    return app;
  }

  private static setViewEngine(app: express.Application) {
    const template = readFileSync(join(__dirname, '..', 'dist', 'index.html')).toString();

    app.engine('html', (_, options, callback) => {
      const opts = { document: template, url: options.req.url };

      renderModuleFactory(AppServerModuleNgFactory, opts)
        .then(html => callback(null, html));
    });

    app.set('view engine', 'html');
    app.set('views', 'client');

    app.get('*.*', express.static(join(__dirname, '..', 'dist')));
  }

  private static setPathHandlers(app: express.Application) {
    registerRequestHandlers(app);
    // Default handler
    app.get('*', (req, res) => {
      res.render('index', { req });
    });
  }
}

const app = ServerFactory.create();
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}!`);
});
