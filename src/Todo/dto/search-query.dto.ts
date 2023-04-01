import { IsNotEmpty, IsOptional, MinLength, ValidationArguments } from 'class-validator' ;
import { TodoStatusEnum } from '../Enums/todos-status.enum';

export class SearchQueryDto{
    @IsOptional()
    status: TodoStatusEnum ;
    
    @IsOptional()
    criteria : string ;
}