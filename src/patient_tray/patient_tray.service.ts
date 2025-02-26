import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PatientTray } from './entities/create-tray.entity';
import { AuthenticatedUserType } from 'src/auth/decorator/authenticated-user';
import { CreateTrayDto } from './dto/create-tray.dto';
import { SessionService } from 'src/session/session.service';
import { Miniature } from 'src/miniatures/entities/miniature.entity';
import { Session } from 'src/session/entities/create-session.entity';
import { TrayMiniatures } from './entities/tray-miniatures.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { UsersService } from 'src/users/users.service';
import { userRoleEnums } from 'src/constants/enums';
import { TrayViewHistory } from './entities/tray-view-history.entity';
import { UpdatePatientTrayDto } from './dto/update-tray.dto';

@Injectable()
export class PatientTrayService {
  constructor(
    @InjectRepository(PatientTray)
    private readonly patientTrayRepository: Repository<PatientTray>,
    @InjectRepository(TrayMiniatures)
    private readonly trayMiniaturesRepository: Repository<TrayMiniatures>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(Miniature)
    private readonly miniatureRepository: Repository<Miniature>,
    @InjectRepository(TrayViewHistory)
    private readonly trayViewRepository: Repository<TrayViewHistory>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,

    private readonly sessionService: SessionService,
    private readonly userService: UsersService,
  ) {}

  async createPatientTray(
    authUser: AuthenticatedUserType,
    createPatientTrayDto: CreateTrayDto,
  ) {
    const { sessionId, miniatureIds } = createPatientTrayDto;
    console.log('sessionId', sessionId, authUser, miniatureIds);
    const sessionExists = await this.sessionRepository.findOne({
      where: { id: sessionId, patientUser: { id: authUser.id } },
    });
    console.log('sessionExists', sessionExists);
    if (!sessionExists) {
      throw new NotFoundException('Session not found');
    }

    const patientTrayExists = await this.patientTrayRepository.findOne({
      where: { session: { id: sessionId } },
    });
    if (patientTrayExists) {
      throw new ConflictException('Tray already exists for this session');
    }
    if (!miniatureIds || miniatureIds.length === 0) {
      throw new NotFoundException('miniatureIds is required');
    }
    const miniatureExists = await this.miniatureRepository.find({
      where: { id: In(miniatureIds) },
    });
    if (miniatureExists.length !== miniatureIds.length) {
      throw new NotFoundException('one or more miniatures not found');
    }

    if (!miniatureExists || miniatureIds.length === 0) {
      throw new NotFoundException('one or more miniatures not found');
    }
    const patient = await this.patientRepository.findOne({
      where: { user: { id: authUser.id } },
      relations: { user: true },
    });
    const patientTray = this.patientTrayRepository.create({
      session: { id: sessionId },
      patient: { id: patient?.id },
    });
    console.log('patientTray', patientTray);

    const patientTraySaved = await this.patientTrayRepository.save(patientTray);
    console.log('patientTraySaved', patientTraySaved);

    const trayMiniatures = miniatureIds.map((miniature) => {
      return this.trayMiniaturesRepository.create({
        patientTray: { id: patientTraySaved.id },
        miniature: { id: miniature },
      });
    });

    return this.trayMiniaturesRepository.save(trayMiniatures);
  }

  async getPatientTrayById(sessionId: string, authUser: AuthenticatedUserType) {
    const sessionExists = await this.sessionRepository.findOne({
      where: { id: sessionId },
    });

    if (!sessionExists) {
      throw new NotFoundException('Session not found');
    }

    const patientTrayExists = await this.patientTrayRepository.findOne({
      where: { session: { id: sessionId } },
    });

    if (!patientTrayExists) {
      throw new NotFoundException('Tray not found for this session');
    }

    const result = await this.patientTrayRepository
      .createQueryBuilder('patienttray')
      .leftJoinAndSelect('patienttray.trayMiniatures', 'trayMiniatures')
      .leftJoinAndSelect('trayMiniatures.miniature', 'miniature')
      .leftJoinAndSelect('patienttray.session', 'session')
      .leftJoinAndSelect('patienttray.patient', 'patient')
      .where('session.id = :sessionId', { sessionId })
      .getOne();

    const user = await this.userService.findOne(authUser.id);

    if (user.userRole == userRoleEnums.CLINICIAN) {
      await this.trayViewRepository.save({
        sessionId: sessionId,
        time: new Date(),
        viewedBy: { id: authUser.id },
      });
    }

    return result;
  }

  async updatePatientTray(
    sessionId: string,
    updatePatientTrayDto: UpdatePatientTrayDto,
    authUser: AuthenticatedUserType,
  ) {
    const { miniatureIds } = updatePatientTrayDto;
    const sessionExists = await this.sessionService.getSessionByPatientId(
      sessionId,
      authUser,
    );

    if (!sessionExists) {
      throw new NotFoundException('Session not found');
    }

    const patientTrayExists = await this.patientTrayRepository.findOne({
      where: {
        session: { id: sessionId },
        patient: { id: sessionExists?.patientUser?.patient?.id },
      },
    });
    if (!patientTrayExists) {
      throw new NotFoundException('Tray not found for this session');
    }

    if (!miniatureIds || miniatureIds.length === 0) {
      throw new NotFoundException('miniatureIds is required');
    }

    const miniatureExists = await this.miniatureRepository.find({
      where: { id: In(miniatureIds) },
    });
    if (!miniatureExists || miniatureExists.length !== miniatureIds.length) {
      throw new NotFoundException('one or more miniatures not valid');
    }

    await this.trayMiniaturesRepository.delete({
      patientTray: { id: patientTrayExists.id },
    });
    const trayTosave = miniatureIds.map((miniature) => {
      return this.trayMiniaturesRepository.create({
        patientTray: { id: patientTrayExists.id },
        miniature: { id: miniature },
      });
    });
    return this.trayMiniaturesRepository.save(trayTosave);
  }
}
