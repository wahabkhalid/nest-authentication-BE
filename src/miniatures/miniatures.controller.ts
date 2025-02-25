import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MiniaturesService } from './miniatures.service';
import { JwtBasicGuard } from '../auth/guard/jwt-basic.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AuthenticatedUser,
  AuthenticatedUserType,
} from '../auth/decorator/authenticated-user';
import { CreateMiniatureDto } from './dto/create-miniature.dto';
import { UpdateMiniatureDto } from './dto/update-miniature.dto';
@ApiTags('Miniatures')
@Controller('miniatures')
@ApiBearerAuth()
@UseGuards(JwtBasicGuard)
export class MiniaturesController {
  constructor(private readonly miniaturesService: MiniaturesService) {}

  @ApiOperation({
    summary: 'Create a new miniature.',
    description: 'Create a new miniature.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Miniature created successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request.',
  })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createMiniature(
    @Body() createMiniatureDto: CreateMiniatureDto,
    @AuthenticatedUser() authUser: AuthenticatedUserType,
  ): Promise<object> {
    const data = await this.miniaturesService.createMiniature(
      createMiniatureDto,
      authUser,
    );
    return {
      data,
      message: 'Miniature created successfully.',
    };
  }
  @ApiOperation({
    summary: 'Retrieve Miniatures',
    description:
      'Fetches all miniatures for the authenticated user by its unique ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Miniatures retrieved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Miniatures not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authorized to access this profile.',
  })
  @Get('')
  async findAllMiniatures(
    @AuthenticatedUser() authUser: AuthenticatedUserType,
  ) {
    const data = await this.miniaturesService.getAllMiniatures(authUser);
    return {
      data: data || [],

      message: 'Miniatures fetched successfully.',
    };
  }

  @ApiOperation({
    summary: 'Retrieve a miniature by ID',
    description:
      'Fetches a miniature for the authenticated user by its unique ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'miniature retrieved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'miniature not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authorized to access this profile.',
  })
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @AuthenticatedUser() authUser: AuthenticatedUserType,
  ): Promise<object> {
    const data = await this.miniaturesService.getMiniatureById(id, authUser);
    return {
      message: 'miniature retrieved',
      data,
    };
  }

  @ApiOperation({
    summary: 'Update an existing miniature.',
    description: 'Updates details of a miniature for an authenticated user.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Miniature updated successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Miniature not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authorized to perform this action.',
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateClinicianProfile(
    @Param('id') id: string,
    @Body() updateMiniatureDto: UpdateMiniatureDto,
    @AuthenticatedUser() authUser: AuthenticatedUserType,
  ): Promise<object> {
    const data = await this.miniaturesService.updateMiniature(
      id,
      authUser,
      updateMiniatureDto,
    );
    return {
      message: 'miniature updated successfully',
      data,
    };
  }

  @ApiOperation({
    description: 'miniature deleted',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'miniature deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'miniature not found',
  })
  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @AuthenticatedUser() authUser: AuthenticatedUserType,
  ): Promise<{ message: string }> {
    await this.miniaturesService.deleteMiniature(id, authUser);
    return { message: 'miniature deleted' };
  }
}
