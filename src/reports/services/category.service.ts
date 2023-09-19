import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from '../entities/categories.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
  ) {}

  async findAll() {
    return this.categoryRepository.find({});
  }

  async findOne(id: number) {
    const report = await this.categoryRepository.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('Category not found');
    }
    return report;
  }

  async create(payload: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(payload);
    const saveCategory = await this.categoryRepository.save(newCategory);
    return { message: 'Category has been created', id: saveCategory.id };
  }

  async update(payload: UpdateCategoryDto, id: number) {
    const category = await this.findOne(id);
    this.categoryRepository.merge(category, payload);
    const updateCategory = await this.categoryRepository.save(category);
    return { message: 'Category has been updated', id: updateCategory.id };
  }

  async delete(id: number) {
    const category = await this.findOne(id);
    await this.categoryRepository.delete(category.id);
    return { message: 'Category has been deleted', id };
  }
}
