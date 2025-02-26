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
import { PatientTrayService } from './patient_tray.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtBasicGuard } from 'src/auth/guard/jwt-basic.guard';
import { CreateTrayDto } from './dto/create-tray.dto';
import {
  AuthenticatedUser,
  AuthenticatedUserType,
} from 'src/auth/decorator/authenticated-user';
import { PatientGuard } from 'src/auth/guard/patient-guard';
import { UpdatePatientTrayDto } from './dto/update-tray.dto';

@ApiTags('patient-tray')
@ApiBearerAuth()
@UseGuards(JwtBasicGuard)
@Controller('patient-tray')
export class PatientTrayController {
  constructor(private readonly patientTrayService: PatientTrayService) {}

  @UseGuards(PatientGuard)
  @ApiOperation({
    summary: 'Create a new Patient Tray.',
    description: 'Create a new Patient Tray.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Session created successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request.',
  })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createMiniature(
    @Body() createPatientTrayDto: CreateTrayDto,
    @AuthenticatedUser() authUser: AuthenticatedUserType,
  ): Promise<object> {
    console.log('data');

    const data = await this.patientTrayService.createPatientTray(
      authUser,
      createPatientTrayDto,
    );
    return {
      data,
      message: 'pateint tray created successfully.',
    };
  }

  @ApiOperation({
    summary: 'Get Patient Tray for session.',
    description: 'Get Patient Tray for session.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Patient Tray fetched successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Patient Tray not found.',
  })
  @Get(':sessionId')
  async getPatientTray(
    @Param('sessionId') sessionId: string,
    @AuthenticatedUser()
    authUser: AuthenticatedUserType,
  ): Promise<object> {
    console.log('sessionId controller', sessionId, authUser);
    const data = await this.patientTrayService.getPatientTrayById(
      sessionId,
      authUser,
    );
    return {
      data,
      message: 'Patient Tray fetched successfully.',
    };
  }
  @ApiOperation({
    summary: 'update patient tray',
    description: 'update patient tray',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'patient tray updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'tray not found',
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updatePatientTray(
    @Param('id') id: string,
    @Body()
    @Body()
    updatePatientTrayDto: UpdatePatientTrayDto,
    @AuthenticatedUser() authUser: AuthenticatedUserType,
  ): Promise<object> {
    const data = await this.patientTrayService.updatePatientTray(
      id,
      updatePatientTrayDto,
      authUser,
    );
    return {
      message: 'patient tray updated successfully',
      data,
    };
  }
}
