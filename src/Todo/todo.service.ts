import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import { AddTodoDto} from "./dto/add-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { TodoStatusEnum } from "./Enums/todos-status.enum";
import { Todo } from "./Model/todo-model";


@Injectable()
export class TodoService {
  todos: Todo[]=[];
  @Inject('UUID') uuid;
  getTodos(): Todo[] {
    return this.todos;
  }
  addTodo(addTodo: AddTodoDto): Todo {
    const newTodo = {
      id: this.uuid(),
      createdAt: new Date(),
      status: TodoStatusEnum.waiting,
      ...addTodo,
    };
    this.todos.push(newTodo);
    return newTodo;
  }
  getTodoById(id): Todo {
    const todo = this.todos.find(todo=>todo.id===id);
    if(todo)
      return todo;
    else {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
  }
  deleteTodo(id): Todo {
    const todoToDelete=this.getTodoById(id);
    const todoIndex=this.todos.findIndex(todo=>todo.id==id);
    this.todos.splice(todoIndex,1);
      return todoToDelete;
   }
    updateTodo(id:number, updateTodo:Partial<UpdateTodoDto>):Todo{
      const todoToUpdate=this.getTodoById(id)
      todoToUpdate.name=updateTodo.name?updateTodo.name:todoToUpdate.name;
      todoToUpdate.status=updateTodo.status?updateTodo.status:todoToUpdate.status;
      todoToUpdate.description=updateTodo.description?updateTodo.description:todoToUpdate.description;
      return todoToUpdate;
    }
}