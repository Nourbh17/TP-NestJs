import { ValidationArguments } from "class-validator";

export const notEmpty = (validationData: ValidationArguments) => 
    `La propriété ${validationData.property} ne doit pas etre vide`;
    export const maxLength = (validationData: ValidationArguments)=> 
 `La taille de votre ${validationData.property} ${validationData.value} est long, la taille maximale de ${validationData.property} est ${validationData.constraints[0]}`;
  

   
 export const minLength = (validationData: ValidationArguments)=> 
 `La taille de votre ${validationData.property} ${validationData.value} est courte, la taille minimale de ${validationData.property} est ${validationData.constraints[0]}`;
  