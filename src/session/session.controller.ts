import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import {
  AuthenticatedUser,
  AuthenticatedUserType,
} from '../auth/decorator/authenticated-user';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtBasicGuard } from '../auth/guard/jwt-basic.guard';
import { ClinicianGuard } from '../auth/guard/clinician.gaurd';
import { PatientGuard } from '../auth/guard/patient-guard';

@ApiTags('Sessions')
@ApiBearerAuth()
@UseGuards(JwtBasicGuard)
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}
  @UseGuards(ClinicianGuard)
  @ApiOperation({
    summary: 'Create a new Session.',
    description: 'Create a new Session.',
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
    @Body() createSessionDto: CreateSessionDto,
    @AuthenticatedUser() authUser: AuthenticatedUserType,
  ): Promise<object> {
    const data = await this.sessionService.createSession(
      createSessionDto,
      authUser,
    );
    return {
      data,
      message: 'Session created successfully.',
    };
  }

  @UseGuards(ClinicianGuard)
  @ApiOperation({ summary: 'Get all Sessions of Clinician.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sessions fetched successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No Sessions found.',
  })
  @Get('clinician')
  @HttpCode(HttpStatus.OK)
  async getAllSessionsByClinicianId(
    @AuthenticatedUser() authUser: AuthenticatedUserType,
  ): Promise<object> {
    const data = await this.sessionService.getSessionsByClinicianId(authUser);
    return {
      data,
      message: 'Sessions fetched successfully.',
    };
  }

  @UseGuards(PatientGuard)
  @ApiOperation({ summary: 'Get all Sessions of Patient.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sessions fetched successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No Sessions found.',
  })
  @Get('patient')
  @HttpCode(HttpStatus.OK)
  async getAllSessionsByPatientId(
    @AuthenticatedUser() authUser: AuthenticatedUserType,
  ): Promise<object> {
    const data = await this.sessionService.getSessionsByPatientId(authUser);
    return {
      data,
      message: 'Sessions fetched successfully.',
    };
  }
}
