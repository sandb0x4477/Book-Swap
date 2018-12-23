import { Get, Controller, Res, Render } from '@nestjs/common';
import { AppService } from './app.service';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() response) {
    // response.sendFile(path.join(__dirname, 'public/index.html'));
    return { message: 'Hello world!' };
  }
  }
