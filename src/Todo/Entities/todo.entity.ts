import { type } from 'os';
import { TimestampEntity } from 'src/Generics/timestamp.entity';
import { Entity, Column,PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatusEnum } from '../Enums/todos-status.enum';
@Entity('todo')
export class TodoEntity extends TimestampEntity{
   @PrimaryGeneratedColumn("uuid")
  id: string ;
   @Column()
  name: string ;
  @Column()
   description: string ;
  /* @Column({
    type : 'datetime',
    update :false
   })
 createdAt: Date =new Date();*/
 @Column({
    type : "enum",
    enum: TodoStatusEnum,
    default : TodoStatusEnum.waiting
    
   })
   status: TodoStatusEnum =TodoStatusEnum.waiting;
    
}