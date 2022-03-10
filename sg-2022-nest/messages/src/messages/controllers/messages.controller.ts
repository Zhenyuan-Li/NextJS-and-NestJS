import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { createMessageDto } from '../dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {
    console.log('place holder');
  }

  // Magic things, assign class as the type, check the js code for detail
  // hint: __metadata("design:paramtypes", [create_message_dto_1.createMessageDto]),
  @Post()
  createMessage(@Body() body: createMessageDto) {
    console.log(body);
  }

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    console.log(id);
  }
}
