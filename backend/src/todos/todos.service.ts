import { Injectable, NotFoundException } from '@nestjs/common';
import { TodosRepository } from './todos.repository.js';
import { CreateTodoDto } from './dto/create-todo.dto.js';
import { UpdateTodoTitleDto } from './dto/update-todo-title.dto.js';
import { UpdateTodoCompletedDto } from './dto/update-todo-completed.dto.js';
import { Todo } from './entities/todo.entity.js';
import { Todo as PrismaTodo } from '../generated/client.js';

@Injectable()
export class TodosService {
  constructor(private readonly todosRepository: TodosRepository) {}

  async getTodos(): Promise<Todo[]> {
    const todos: PrismaTodo[] = await this.todosRepository.findAll();
    return todos.map((todo) => this.mapToTodoEntity(todo));
  }

  async getTodoById(id: number): Promise<Todo> {
    const todo: PrismaTodo | null = await this.todosRepository.findOne(id);
    if (!todo) throw new NotFoundException('Todo not found');

    return this.mapToTodoEntity(todo);
  }

  async createTodo(input: CreateTodoDto): Promise<Todo> {
    const newTodo: PrismaTodo = await this.todosRepository.create({
      title: input.title,
    });
    return this.mapToTodoEntity(newTodo);
  }

  async updateTodoTitle(id: number, input: UpdateTodoTitleDto): Promise<Todo> {
    const updatedTodo: PrismaTodo = await this.todosRepository.updateTitle(id, {
      title: input.title,
    });
    return this.mapToTodoEntity(updatedTodo);
  }

  async updateTodoCompleted(
    id: number,
    input: UpdateTodoCompletedDto,
  ): Promise<Todo> {
    const updatedTodo: PrismaTodo = await this.todosRepository.updateCompleted(
      id,
      {
        completed: input.completed,
      },
    );

    return this.mapToTodoEntity(updatedTodo);
  }

  async deleteTodo(id: number): Promise<Todo> {
    const deletedTodo = await this.todosRepository.remove(id);
    return this.mapToTodoEntity(deletedTodo);
  }

  private mapToTodoEntity(prismaTodo: PrismaTodo): Todo {
    return {
      id: String(prismaTodo.id),
      title: prismaTodo.title,
      completed: prismaTodo.completed,
      createdAt: prismaTodo.createdAt,
      updatedAt: prismaTodo.updatedAt,
    };
  }
}
