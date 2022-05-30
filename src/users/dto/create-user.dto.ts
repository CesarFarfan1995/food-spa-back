import {  IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateUserDto {


    @IsEmail()
    @MinLength(10)
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsString()
    @IsNotEmpty()
    firstName:string;

    @IsString()
    @IsNotEmpty()
    lastName:string;
    
    @IsString()
    @IsNotEmpty()
    address:string;

    @IsNumber()
    @IsNotEmpty()
    @Min(7)
    phone:number;

  
    @IsArray()
    roles?:Array<any> = []

    
}
