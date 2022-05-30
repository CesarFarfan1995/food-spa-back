import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocuemnt } from './schema/product.schema';

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product.name) private readonly productSvc: Model<ProductDocuemnt>){

  }
  async create(product:CreateProductDto) {
    const newProduct =  await this.productSvc.create(product)
    return {newProduct}
  }

 async findAll() {
    return  await this.productSvc.find()
  }

 async findOne(id: string) {
    return  await this.productSvc.findOne({_id:id})
  }

  async update(id: string, product: CreateProductDto) {
    const updatedProduct = await this.productSvc.findByIdAndUpdate(id, product, {new:true})
    return {updatedProduct}
  }

 async remove(id: string) {
    await this.productSvc.findByIdAndDelete({_id:id})
    return 'the product was deleted'
  }
}
