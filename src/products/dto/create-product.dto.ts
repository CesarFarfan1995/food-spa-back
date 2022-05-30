import { IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {


    @IsString()
    @MinLength(5)
    name: string;

    @IsString()
    @MinLength(10)
    details: string;

    @IsString()
    img:string;

    @IsNumber()
    @Min(0)
    price:number;

    
}
