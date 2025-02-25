import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthenticatedUserType } from '../auth/decorator/authenticated-user';
import { CreateClinicianProfileDto } from './dto/create-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinician } from './entities/clinician-profile.entity';
import { Repository } from 'typeorm';
import { ClinicianProfileResponseDto } from './dto/response-clinician-profile.dto';
import { plainToInstance } from 'class-transformer';
import { Status } from '../constants/enums';
import { UpdateClinicianProfileDto } from './dto/update-clinician.dto';
import { User } from '../users/entities/users.entity';

@Injectable()
export class ClinicianProfileService {
  constructor(
    @InjectRepository(Clinician)
    private clinicianProfileRepository: Repository<Clinician>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createClinicianProfile(
    createClinicianProfileDto: CreateClinicianProfileDto,
    authUser: AuthenticatedUserType,
  ) {
    const existingProfile = await this.clinicianProfileRepository.findOne({
      where: { user: { id: authUser.id } },
    });

    if (existingProfile) {
      throw new ConflictException('profile already exist for this user');
    }
    const isProfileCompleted =
      !!createClinicianProfileDto.name &&
      !!createClinicianProfileDto.licenseNumber &&
      !!createClinicianProfileDto.licenseState;

    if (isProfileCompleted) {
      await this.userRepository.update(authUser.id, { profileCompleted: true });
    }

    return this.clinicianProfileRepository.save({
      name: createClinicianProfileDto.name,
      licenseState: createClinicianProfileDto.licenseState,
      licenseCountry: createClinicianProfileDto.licenseCountry,
      user: { id: authUser.id, email: authUser.email },
      licenseNumber: createClinicianProfileDto.licenseNumber,
      practiceName: createClinicianProfileDto.practiceName,
    });
  }

  async getClinicianProfile(
    authUser: AuthenticatedUserType,
  ): Promise<ClinicianProfileResponseDto> {
    const profile = await this.clinicianProfileRepository.findOne({
      where: { user: { id: authUser.id } },
    });
    const clinicianProfileDto = plainToInstance(
      ClinicianProfileResponseDto,
      profile,
      {
        excludeExtraneousValues: true,
      },
    );

    return clinicianProfileDto;
  }

  async updateClinicianProfile(
    id: string,
    updateClinicianProfileDto: UpdateClinicianProfileDto,
    authUser: AuthenticatedUserType,
  ) {
    const existingProfile = await this.clinicianProfileRepository.findOne({
      where: { id, user: { id: authUser.id } },
      relations: ['user'],
    });

    if (!existingProfile) {
      throw new NotFoundException('profile not found');
    }

    Object.assign(existingProfile, {
      name: updateClinicianProfileDto.name ?? existingProfile.name,
      practiceName:
        updateClinicianProfileDto.practiceName ?? existingProfile.practiceName,
      licenseNumber:
        updateClinicianProfileDto.licenseNumber ??
        existingProfile.licenseNumber,

      licenseState:
        updateClinicianProfileDto.licenseState ?? existingProfile.licenseState,
      licenseCountry:
        updateClinicianProfileDto.licenseCountry ??
        existingProfile.licenseCountry,

      status:
        existingProfile.status !== Status.APPROVED
          ? Status.PENDING
          : existingProfile.status,
    });

    if (!existingProfile.user.profileCompleted) {
      const isProfileCompleted =
        !!existingProfile.name &&
        !!existingProfile.licenseNumber &&
        !!existingProfile.licenseState;
      if (isProfileCompleted) {
        await this.userRepository.update(authUser.id, {
          profileCompleted: true,
        });
      }
    }

    return await this.clinicianProfileRepository.save(existingProfile);
  }

  async deleteClinicianProfile(
    id: string,
    authUser: AuthenticatedUserType,
  ): Promise<void> {
    const profile = await this.clinicianProfileRepository.findOne({
      where: { id, user: { id: authUser.id } },
    });

    if (!profile) {
      throw new NotFoundException('profile not found');
    }

    await this.clinicianProfileRepository.softRemove(profile);
  }
}
