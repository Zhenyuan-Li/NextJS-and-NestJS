import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { MessagesService } from '../services/messages.service';
import { createMessageDto } from '../dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
  // Consuming classes
  constructor(public msgService: MessagesService) {}

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
  async getMessage(@Param('id') id: string) {
    const message = await this.msgService.findOne(id);
    if (!message) {
      // Special Error built in Nest
      throw new NotFoundException('Message Not found!');
    }
    return message;
  }
}
