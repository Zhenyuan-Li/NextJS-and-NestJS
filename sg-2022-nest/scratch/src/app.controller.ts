import { Controller, Get } from '@nestjs/common';

@Controller('/app')
export class AppController {
  @Get('/home')
  getRootRoutes() {
    return '<h1>Hello World</h1>';
  }

  @Get('/bye')
  getByeThere() {
    return '<h1 style="color:red">Bye Bye</h1>';
  }
}
