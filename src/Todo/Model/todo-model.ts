import { TodoStatusEnum } from '../Enums/todos-status.enum';
export class Todo{
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  status: TodoStatusEnum;
}