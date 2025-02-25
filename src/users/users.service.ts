import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createNewUser(userToSave: CreateUserDto) {
    const userExist = await this.findFullUserByEmailAndRole(
      userToSave?.email,
      userToSave.userRole.id,
    );
    if (userExist) {
      throw new ConflictException('already a user');
    }
    return this.usersRepository.save(userToSave);
  }

  async findOne(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: {
        userRole: true,
        clinician: true,
      },
    });
    return {
      id: user.id,
      email: user.email,
      profileCompleted: user.profileCompleted,
      userRole: user.userRole.key,
    };
  }

  findFullUserByEmailAndRole(
    userEmail: string,
    roleId: string,
    relations: Record<string, boolean> = {},
  ) {
    return this.usersRepository.findOne({
      where: { email: userEmail, userRole: { id: roleId } },
      relations,
    });
  }

  async deleteUser(userId: string): Promise<void> {
    const entityManager = this.usersRepository.manager;

    return entityManager.transaction(async (transactionalEntityManager) => {
      const user = await transactionalEntityManager.findOne(User, {
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException('user not found');
      }
      await transactionalEntityManager.softRemove(user);
    });
  }
}
