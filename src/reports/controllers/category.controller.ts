import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { CategoryService } from '../services/category.service';

@Controller('categories')
export class CategoryController {
  constructor(private categoriesServices: CategoryService) {}

  @Get()
  get() {
    return this.categoriesServices.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.categoriesServices.findOne(id);
  }
  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesServices.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateCategoryDto) {
    return this.categoriesServices.update(payload, id);
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.categoriesServices.delete(id);
  }
}
