import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './Todo/todo.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { TodoEntity } from './Todo/Entities/todo.entity';
import { NewtodoService } from './Todo/newtodo.service';


dotenv.config();
@Module({
  imports: [TodoModule, CommonModule ,TypeOrmModule.forRoot(
    {
    type: 'mysql',
    host: process.env.DB_HOST,
    port:parseInt(process.env.DB_PORT) ,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [TodoEntity],
    //autoLoadEntities:true,
    synchronize: true }) ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
