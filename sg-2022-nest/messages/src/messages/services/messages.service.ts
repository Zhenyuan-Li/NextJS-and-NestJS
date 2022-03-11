import { Injectable } from '@nestjs/common';
import { MessagesRepository } from '../repository/messages.repository';

@Injectable()
export class MessagesService {
  constructor(public msgRepo: MessagesRepository) {}

  findOne(id: string) {
    return this.msgRepo.findOne(id);
  }

  findAll() {
    return this.msgRepo.findAll();
  }

  create(content: string) {
    return this.msgRepo.create(content);
  }
}
