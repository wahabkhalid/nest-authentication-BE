import { Injectable, NotFoundException } from '@nestjs/common';
import { Miniature } from './entities/miniature.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMiniatureDto } from './dto/create-miniature.dto';
import { AuthenticatedUserType } from '../auth/decorator/authenticated-user';
import { User } from '../users/entities/users.entity';
import { UpdateMiniatureDto } from './dto/update-miniature.dto';

@Injectable()
export class MiniaturesService {
  constructor(
    @InjectRepository(Miniature)
    private miniatureRepository: Repository<Miniature>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createMiniature(
    createMiniatureDto: CreateMiniatureDto,
    authUser: AuthenticatedUserType,
  ): Promise<Miniature> {
    console.log('auth   ', authUser);
    const user = await this.userRepository.findOne({
      where: { id: authUser?.id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const miniature = this.miniatureRepository.create({
      ...createMiniatureDto,
      category: { id: createMiniatureDto.categoryId },
      user: { id: user.id, email: user.email },
    });
    return this.miniatureRepository.save(miniature);
  }

  async getAllMiniatures(
    authUser: AuthenticatedUserType,
  ): Promise<Miniature[]> {
    const miniatures = await this.miniatureRepository
      .createQueryBuilder('miniature')
      .leftJoinAndSelect('miniature.category', 'category')
      .leftJoinAndSelect('miniature.user', 'user')
      .where('user.id = :id', { id: authUser.id })
      //   .addSelect(['user.id'])
      .select([
        'miniature.id',
        'miniature.miniatureLocationUrl',
        'miniature.height',
        'miniature.width',
        'miniature.depth',
        'category.id',
      ])
      .addGroupBy('miniature.id')
      .addGroupBy('category.id')

      .getRawMany();
    console.log('miniatures', miniatures);
    if (!miniatures) {
      throw new NotFoundException('Miniatures not found');
    }
    return miniatures;
  }

  async updateMiniature(
    id: string,
    authUser: AuthenticatedUserType,
    updateMiniatureDto: UpdateMiniatureDto,
  ): Promise<Miniature> {
    const miniature = await this.miniatureRepository.findOne({
      where: { id, user: { id: authUser.id } },
      relations: ['user', 'category'],
    });
    if (!miniature) {
      throw new NotFoundException('Miniature not found');
    }
    return this.miniatureRepository.save({
      ...miniature,
      ...updateMiniatureDto,
    });
  }

  async getMiniatureById(id: string, authUser: AuthenticatedUserType) {
    const miniature = await this.miniatureRepository.findOne({
      where: { id, user: { id: authUser.id } },
      relations: ['category'],
    });
    if (!miniature) {
      throw new NotFoundException('Miniature not found');
    }
    return miniature;
  }
  async deleteMiniature(id: string, authUser: AuthenticatedUserType) {
    const miniature = await this.miniatureRepository.findOne({
      where: { id, user: { id: authUser.id } },
    });
    console.log('miniature', miniature, id);
    if (!miniature) {
      throw new NotFoundException('Miniature not found');
    }
    return this.miniatureRepository.remove(miniature);
  }
}
