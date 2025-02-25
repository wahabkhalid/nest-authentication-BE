import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UsersService } from '../users/users.service';
import { UserRoleService } from '../user_role/user_role.service';
import { userRoleEnums } from '../constants/enums';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ClinicianPatient } from './entities/clinician-patient.entity';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(ClinicianPatient)
    private clinicianPatientRepository: Repository<ClinicianPatient>,

    private userService: UsersService,
    private userRoleService: UserRoleService,
  ) {}

  async createPatientAgainstClinician(createPatientDto: CreatePatientDto) {
    const patientRole = await this.userRoleService.getAUserByKey(
      userRoleEnums.PATIENT,
    );

    let patientUser = await this.userService.findFullUserByEmailAndRole(
      createPatientDto?.email,
      patientRole?.id,
      {
        userRole: true,
      },
    );
    let patient: Patient;

    if (!patientUser) {
      const hashedPassword = await bcrypt.hash('patient1234', 10);

      const userToSave = new CreateUserDto();
      userToSave.email = createPatientDto.email;
      userToSave.userRole = patientRole;
      userToSave.password = hashedPassword;
      patientUser = await this.userService.createNewUser(userToSave);
      patient = await this.patientRepository.save({
        ...createPatientDto,
        user: { id: patientUser?.id },
      });
    } else {
      patient = await this.patientRepository.findOne({
        where: { user: { id: patientUser.id } },
      });
      if (!patient) {
        patient = await this.patientRepository.save({
          ...createPatientDto,
          user: { id: patientUser.id },
        });
      }
    }

    return patient;
  }

  async createClinicianPatient({
    patientId,
    clinicianId,
    initials,
  }: {
    patientId: string;
    clinicianId: string;
    initials: string;
  }): Promise<void> {
    const clinicianPatientExist = await this.clinicianPatientRepository.findOne(
      {
        where: {
          patient: { id: patientId },
          clinician: { id: clinicianId },
        },
      },
    );
    if (!clinicianPatientExist) {
      await this.clinicianPatientRepository.save({
        patient: { id: patientId },
        clinician: { id: clinicianId },
        initials: initials,
      });
    }
  }
  async getPatientById(id: string) {
    const patient = this.patientRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    return patient;
  }

  async getPatientsForClinician(
    clinicianId: string,
  ): Promise<ClinicianPatient[]> {
    const result = await this.clinicianPatientRepository
      .createQueryBuilder('ClinicianPatient')
      .innerJoinAndSelect('ClinicianPatient.patient', 'patient')
      .innerJoinAndSelect('patient.user', 'user')
      .where('ClinicianPatient.clinician_id = :clinicianId', { clinicianId })
      .addSelect('user.email')
      .getMany();
    return result;
  }
}
