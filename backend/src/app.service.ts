import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service.js';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  // Todo 例
  async getTodos() {
    return await this.prisma.todo.findMany();
  }

  async createTodo(title: string) {
    return await this.prisma.todo.create({
      data: { title },
    });
  }
}
