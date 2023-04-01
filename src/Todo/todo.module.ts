import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './Entities/todo.entity';
import { NewtodoService } from './newtodo.service';
import { TodoDbController } from './todo-db.controller';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
controllers: [TodoController,TodoDbController],
imports:[TypeOrmModule.forFeature([TodoEntity])],
providers: [TodoService,NewtodoService]
})
export class TodoModule {}
