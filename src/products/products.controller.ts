import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';



@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtGuard,RoleGuard)
  @Roles('admin')
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll()
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }


  @UseGuards(JwtGuard,RoleGuard)
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() product: CreateProductDto) {
    return this.productsService.update(id, product);
  }


  @UseGuards(JwtGuard,RoleGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
