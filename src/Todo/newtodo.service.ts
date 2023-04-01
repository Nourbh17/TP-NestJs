import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Like, Repository } from 'typeorm';
import { AddTodoDto } from './dto/add-todo.dto';
import { SearchQueryDto } from './dto/search-query.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './Entities/todo.entity';
import { TodoStatusEnum } from './Enums/todos-status.enum';
import { PaginationDto } from './dto/pagination.dto';
import { paginate } from 'src/helpers/paginate';

@Injectable()
export class NewtodoService {
  
   
    constructor(@InjectRepository(TodoEntity)
        private todoRepository : Repository<TodoEntity> ){}

        getTodos(queryParams : SearchQueryDto){
          if(! queryParams.status && !queryParams.criteria)
              return this.todoRepository.find() ;
          return this.todoRepository.find({where : [{status: queryParams.status},{name : Like(`%${queryParams.criteria}%`)},{description: Like(`%${queryParams.criteria}%`)}]},) ;
      }


      async getTodosv2(queryParams : SearchQueryDto):Promise<TodoEntity[]>{
        const {status,criteria}=queryParams;
        const qb = this.todoRepository.createQueryBuilder("todos");
      qb.where(new Brackets(q=> {
        q.where('todos.name LIKE :criteria OR todos.description LIKE :criteria', { criteria: `%${criteria}%` });
      })).andWhere('todos.status = :status', {status: status })
        if (!qb.getMany()) throw new NotFoundException();
      return await qb.getMany();
    }


    async getTodosByPagination(queryParams :PaginationDto):Promise<TodoEntity[]> {
      const qb = this.todoRepository.createQueryBuilder("todos");
      const {page,nb}=queryParams;
      return paginate<TodoEntity>(qb,page,nb).getMany();
    }
  
       async findById(id : string) :Promise<TodoEntity>{
        const todo=await this.todoRepository.findOne({where: {id}});
        if (!todo){
           throw new NotFoundException(`le todo d'id ${id} n'existe pas` );
        }
        return todo;
    }
    
        async  addTodoDB(newTodo: AddTodoDto): Promise<TodoEntity>{
         return await this.todoRepository.save(newTodo);
    }




    async updateTodoDb(id: string,updatedTodo: UpdateTodoDto): Promise<TodoEntity> {
        const  newTodo = await this.todoRepository.preload({id,...updatedTodo,});
        if (newTodo) {
          return this.todoRepository.save(newTodo);
        } else {
          throw new NotFoundException('Todo innexistant');
        }
    }
    
    async SoftdeleteTodo( id: string) {
      const res = await this.todoRepository.softDelete(id);
      if (res){
          return { message: 'Todo deleted' };
      }
      else {
          throw new NotFoundException(`le todo d'id ${id} n'existe pas` );
      }
  }

  
    restoreTodo(id : string){
  return this.todoRepository.restore(id) ;
}

async countTodos(){
    const counts = {} ;
    const statuts = Object.values(TodoStatusEnum) ;
    for(let statut of statuts){
        counts[statut] = await this.todoRepository.count({where : {status: statut}}) ;
    }
    return counts ;
}

}


