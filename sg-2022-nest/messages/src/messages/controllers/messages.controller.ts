import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { MessagesService } from '../services/messages.service';
import { createMessageDto } from '../dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
  msgService: MessagesService;

  constructor() {
    // DONT DO THIS ON REAL APP
    // USE DEPENDENCY INJECTION
    this.msgService = new MessagesService();
  }

  @Get()
  listMessages() {
    return this.msgService.findAll();
  }

  // Magic things, assign class as the type, check the js code for detail
  // hint: __metadata("design:paramtypes", [create_message_dto_1.createMessageDto]),
  @Post()
  createMessage(@Body() body: createMessageDto) {
    return this.msgService.create(body.content);
  }

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    return this.msgService.findOne(id);
  }
}
