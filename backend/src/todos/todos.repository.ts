import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Todo as PrismaTodo } from '../generated/client.js';

@Injectable()
export class TodosRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): Promise<PrismaTodo[]> {
    return this.prismaService.todo.findMany({
      orderBy: { id: 'asc' },
    });
  }

  findOne(id: number): Promise<PrismaTodo | null> {
    return this.prismaService.todo.findUnique({ where: { id } });
  }

  create(data: { title: string }): Promise<PrismaTodo> {
    return this.prismaService.todo.create({ data });
  }

  updateTitle(id: number, data: { title: string }): Promise<PrismaTodo> {
    return this.prismaService.todo.update({
      where: { id },
      data,
    });
  }

  updateCompleted(
    id: number,
    data: { completed: boolean },
  ): Promise<PrismaTodo> {
    return this.prismaService.todo.update({
      where: { id },
      data,
    });
  }

  remove(id: number): Promise<PrismaTodo> {
    return this.prismaService.todo.delete({ where: { id } });
  }
}
