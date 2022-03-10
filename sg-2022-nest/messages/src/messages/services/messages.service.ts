import { MessagesRepository } from '../repository/messages.repository';

export class MessagesService {
  msgRepo: MessagesRepository;

  constructor() {
    // Service is creating its own dependencies
    // DONT DO THIS ON REAL APPS
    this.msgRepo = new MessagesRepository();
  }

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
