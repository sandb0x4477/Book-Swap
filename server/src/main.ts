import 'dotenv/config';

import { NestFactory, FastifyAdapter } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as path from 'path';
import * as express from 'express';

const port = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:4200', // angular
    ],
  });
  app.useStaticAssets(path.join(__dirname, 'public'));

  // app.use(express.static(path.join(__dirname, 'public')));

  // SPA
  // app.use('*', (req, res) => {
  //   return res.sendFile(path.join(__dirname, 'public/index.html'));
  // });

  // app.use('*', function(req, res, next) {
  //   // Everything starting with /api passes through
  //   if (req.url.startsWith('/apibs')) {
  //       return next();
  //   } else {
  //   res.sendFile(path.join(__dirname, 'public/index.html'));
  //   }
  // });


  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
