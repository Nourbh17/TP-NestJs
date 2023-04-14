import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Res, UsePipes, ValidationPipe, Version } from '@nestjs/common';
import { AddTodoDto } from './dto/add-todo.dto';
import { SearchQueryDto } from './dto/search-query.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './Entities/todo.entity';
import { NewtodoService } from './newtodo.service';
import { TodoStatusEnum } from './Enums/todos-status.enum';
import { PaginationDto } from './dto/pagination.dto';


@Controller({
  path: 'todo',
  version: '2',})
export class TodoDbController {
    constructor(private newtodoService: NewtodoService) {
    }

    @Get("Paginantion")
    async getTodosByPagination(@Query() paginationDto:PaginationDto) {
        return this.newtodoService.getTodosByPagination(paginationDto);
        }
    
    @Get()
    getTodos(@Query() queryParams : SearchQueryDto){
        return this.newtodoService.getTodos(queryParams) ;
    }

    @Get("all")
  
  async getTodosv2(@Query('status') status:TodoStatusEnum,@Query('criteria') criteria:string): Promise<TodoEntity[]> {
    const params:SearchQueryDto={criteria,status};
    return this.newtodoService.getTodosv2(params);
  }


    @Get('/:id')
    async findTodo(@Param('id') id : string):Promise<TodoEntity>{
       
            return this.newtodoService.findById(id);
          }
    
    @Post()
    @UsePipes(ValidationPipe)
    async addTodo(@Body() todoDTO: AddTodoDto): Promise<TodoEntity>{
        return await this.newtodoService.addTodoDB(todoDTO) ;
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    async updateTodo(@Param('id') id: string,@Body() updateTodo:UpdateTodoDto ):Promise<TodoEntity> {
      return await this.newtodoService.updateTodoDb(id,updateTodo);    
    }

    @Delete(':id')
    
    async deleteTodo(@Param('id') id: string ) {
      return await this.newtodoService.SoftdeleteTodo(id);    
    }

    @Patch('/restore/:id')
    restoreTodo(@Param('id') id : string){
        return this.newtodoService.restoreTodo(id) ;
    }

    @Get('/count')
    async countTodos(){
        return await this.newtodoService.countTodos();
    }
  
}
