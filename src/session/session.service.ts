import { Injectable, NotFoundException } from '@nestjs/common';
import { Session } from './entities/create-session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { AuthenticatedUserType } from '../auth/decorator/authenticated-user';
import { Patient } from '../patient/entities/patient.entity';
import { ClinicianProfileService } from '../clinician_profile/clinician_profile.service';
import { PatientService } from '../patient/patient.service';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly clinicianProfileService: ClinicianProfileService,
    private readonly patientService: PatientService,
  ) {}
  async createSession(
    createSessionDto: CreateSessionDto,
    authUser: AuthenticatedUserType,
  ): Promise<Session> {
    let patient: Patient;

    const profile =
      await this.clinicianProfileService.getClinicianProfile(authUser);
    if (!profile) {
      throw new NotFoundException('profile not found');
    }

    if (!createSessionDto?.patientId) {
      patient = await this.patientService.createPatientAgainstClinician({
        email: createSessionDto?.patientEmail,
        initials: createSessionDto?.initials,
      });
      await this.patientService.createClinicianPatient({
        patientId: patient?.id,
        clinicianId: profile?.id,
        initials: createSessionDto?.initials,
      });
    }
    patient = await this.patientService.getPatientById(
      createSessionDto?.patientId ? createSessionDto?.patientId : patient.id,
    );

    const date = new Date(createSessionDto?.startTime);

    const session = this.sessionRepository.create({
      time: createSessionDto.startTime,
      date: date,
      clinicianUser: { id: authUser.id },
      patientUser: { id: patient?.user?.id },
    });

    return this.sessionRepository.save(session);
  }

  async getSessionsByClinicianId(
    authUser: AuthenticatedUserType,
  ): Promise<Session[]> {
    const profile = this.clinicianProfileService.getClinicianProfile(authUser);
    if (!profile) {
      throw new NotFoundException('profile not found');
    }
    const sessions = await this.sessionRepository
      .createQueryBuilder('session')
      .leftJoinAndSelect('session.clinicianUser', 'clinicianUser')
      .leftJoinAndSelect('session.patientUser', 'patientUser')
      .where('clinicianUser.id = :id', { id: authUser.id })
      .select([
        'session.id',
        'session.time',
        'session.date',
        'patientUser.id',
        'patientUser.email',
      ])
      .getRawMany();
    console.log('sessions', sessions);
    return sessions;
  }

  async getSessionById(
    id: string,
    authUser: AuthenticatedUserType,
  ): Promise<Session> {
    const session = await this.sessionRepository.findOne({
      where: { id, clinicianUser: { id: authUser.id } },
      relations: ['patientUser'],
    });
    return session;
  }

  async getSessionByPatientId(
    id: string,
    authUser: AuthenticatedUserType,
  ): Promise<Session> {
    const session = await this.sessionRepository.findOne({
      where: { id, patientUser: { id: authUser.id } },
      relations: ['clinicianUser'],
    });
    return session;
  }

  async getSessionsByPatientId(
    authUser: AuthenticatedUserType,
  ): Promise<Session[]> {
    const sessions = await this.sessionRepository
      .createQueryBuilder('session')
      .leftJoinAndSelect('session.clinicianUser', 'clinicianUser')
      .leftJoinAndSelect('session.patientUser', 'patientUser')
      .where('patientUser.id = :id', { id: authUser.id })
      .select([
        'session.id',
        'session.time',
        'session.date',
        'clinicianUser.id',
        'clinicianUser.email',
      ])
      .getRawMany();
    console.log('sessions', sessions);
    return sessions;
  }
}
