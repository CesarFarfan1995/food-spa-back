import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocuemnt = Product & Document;

@Schema()
export class Product {

  @Prop()
  name: string;

  @Prop()
  details: string;

  @Prop()
  price: number;

  @Prop()
  img: string;

 

}

export const ProductSchema = SchemaFactory.createForClass(Product);