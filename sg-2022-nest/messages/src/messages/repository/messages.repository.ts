import { readFile, writeFile } from 'fs/promises';

export class MessagesRepository {
  // TODO: turn message to a private variable, and initialize in constructor
  // Tips: async cannot be worked in constructor, use a static builder instead
  private async getFileContent() {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    return messages;
  }

  async findOne(id: string) {
    const messages = await this.getFileContent();
    return messages[id];
  }

  async findAll() {
    const messages = await this.getFileContent();
    return messages;
  }

  async create(content: string) {
    const messages = await this.getFileContent();
    const id = Math.floor(Math.random() * 999);

    messages[id] = { id, content };
    await writeFile('messages.json', JSON.stringify(messages));
  }
}
