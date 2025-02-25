import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../users/entities/users.entity';
import { SignupDto } from '../users/dto/user-signup.dto';
import { BASIC_JWT } from './jwt-strategy/jwt-strategy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signupDto: SignupDto) {
    const { email, password, roleId } = signupDto;

    const existingUser = await this.userRepository.findOne({
      where: { email, userRole: { id: roleId } },
      relations: ['userRole'],
    });
    if (existingUser) {
      throw new UnprocessableEntityException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      userRole: { id: roleId },
    });
    await this.userRepository.save(newUser);
    const token = await this.generateJwt(newUser);
    return token;
  }

  async login(loginDto: SignupDto) {
    const { email, password, roleId } = loginDto;
    console.log(email, roleId);
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['userRole'],
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userRole = user?.userRole.id;
    console.log(userRole, roleId);
    if (userRole !== roleId) {
      throw new UnauthorizedException('Invalid credentials(roleId)');
    }

    return this.generateJwt(user);
  }

  private generateJwt(user: User) {
    const payload = { email: user.email, id: user.id, purpose: BASIC_JWT };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  findFullUserByEmailAndRole(
    userEmail: string,
    roleId: string,
    relations: Record<string, boolean> = {},
  ) {
    return this.userRepository.findOne({
      where: { email: userEmail, userRole: { id: roleId } },
      relations,
    });
  }
}
