import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, ValidationPipe } from "@nestjs/common";

import { UpdateTodoDto } from "./dto/update-todo.dto";
import { AddTodoDto } from "./dto/add-todo.dto";
import { TodoService } from "./todo.service";
import { Todo } from "./Model/todo-model";


@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {
  }
  @Get('all')
  getTodos(): Todo[] {
    return this.todoService.getTodos();
  }
 @Post()
  addTodo(@Body(ValidationPipe)addTodo: AddTodoDto): Todo{
    return this.todoService.addTodo(addTodo)

 }
 @Delete(':id')
 deleteTodo(@Param('id') id):Todo{
   return this.todoService.deleteTodo(id);
 }
  @Put(":id")
  updateTodo(@Body(ValidationPipe) updateTodo: Partial<UpdateTodoDto>, @Param("id") id): Todo {
    return this.todoService.updateTodo(id,updateTodo);
  }
  @Get(':id')
  getTodo(@Param('id') id): Todo {
    return this.todoService.getTodoById(id);
  }
}