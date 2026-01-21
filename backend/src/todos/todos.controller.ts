import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service.js';
import { CreateTodoDto } from './dto/create-todo.dto.js';
import { UpdateTodoTitleDto } from './dto/update-todo-title.dto.js';
import { UpdateTodoCompletedDto } from './dto/update-todo-completed.dto.js';
import { type Todo } from 'shared/src/type.js';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.createTodo(createTodoDto);
  }

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todosService.getTodos();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todosService.getTodoById(id);
  }

  @Patch(':id/title')
  updateTitle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoTitleDto: UpdateTodoTitleDto,
  ): Promise<Todo> {
    return this.todosService.updateTodoTitle(id, updateTodoTitleDto);
  }

  @Patch(':id/completed')
  updateCompleted(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoCompletedDto: UpdateTodoCompletedDto,
  ): Promise<Todo> {
    return this.todosService.updateTodoCompleted(id, updateTodoCompletedDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todosService.deleteTodo(id);
  }
}
