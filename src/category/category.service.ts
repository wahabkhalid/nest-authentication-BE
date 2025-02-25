import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryProfileRepository: Repository<Category>,
  ) {}

  async getAllCategories() {
    return this.categoryProfileRepository.find();
  }
}
