import { Controller, Get, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: 'Fetch all categories',
    description: 'Fetches all categpries of Miniatures.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Categories retrieved successfully.',
  })
  @Get('')
  async findOne(): Promise<object> {
    const data = await this.categoryService.getAllCategories();
    return {
      message: 'clinician profile retrieved',
      data,
    };
  }
}
