import { Module } from '@nestjs/common';
import { MiniaturesService } from './miniatures.service';
import { MiniaturesController } from './miniatures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Miniature } from './entities/miniature.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Miniature]), UsersModule],
  controllers: [MiniaturesController],
  providers: [MiniaturesService],
  exports: [MiniaturesService, TypeOrmModule],
})
export class MiniaturesModule {}
