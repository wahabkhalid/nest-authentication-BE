import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateClinicianProfileDto } from './dto/create-profile.dto';
import {
  AuthenticatedUser,
  AuthenticatedUserType,
} from '../auth/decorator/authenticated-user';
import { ClinicianProfileService } from './clinician_profile.service';
import { JwtBasicGuard } from '../auth/guard/jwt-basic.guard';
import { UpdateClinicianProfileDto } from './dto/update-clinician.dto';

@UseGuards(JwtBasicGuard)
@ApiTags('Clinician Profile')
@ApiBearerAuth()
@Controller('clinician-profile')
export class ClinicianProfileController {
  constructor(
    private readonly clinicianProfileService: ClinicianProfileService,
  ) {}

  @ApiOperation({
    summary: 'Create a new clinician profile.',
    description: 'Creates a new clinician profile for an authenticated user.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Clinician profile created successfully.',
    type: '', // Replace with the correct return type
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authorized to perform this action.',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createClinicianProfile(
    @Body() createClinicianProfileDto: CreateClinicianProfileDto,
    @AuthenticatedUser() authUser: AuthenticatedUserType,
  ): Promise<object> {
    const data = await this.clinicianProfileService.createClinicianProfile(
      createClinicianProfileDto,
      authUser,
    );
    return {
      message: 'clinician profile created',
      data,
    };
  }
  @ApiOperation({
    summary: 'Retrieve a clinician profile by ID',
    description:
      'Fetches a clinician profile for the authenticated user by its unique ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Clinician profile retrieved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Clinician profile not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authorized to access this profile.',
  })
  @Get('')
  async findOne(
    @AuthenticatedUser() authUser: AuthenticatedUserType,
  ): Promise<object> {
    const data =
      await this.clinicianProfileService.getClinicianProfile(authUser);
    return {
      message: 'clinician profile retrieved',
      data,
    };
  }

  @ApiOperation({
    summary: 'Update an existing clinician profile.',
    description:
      'Updates details of a clinician profile for an authenticated user.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Clinician profile updated successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Clinician profile not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authorized to perform this action.',
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateClinicianProfile(
    @Param('id') id: string,
    @Body() updateClinicianProfileDto: UpdateClinicianProfileDto,
    @AuthenticatedUser() authUser: AuthenticatedUserType,
  ): Promise<object> {
    const data = await this.clinicianProfileService.updateClinicianProfile(
      id,
      updateClinicianProfileDto,
      authUser,
    );
    return {
      message: 'clinician profile updated',
      data,
    };
  }
}
