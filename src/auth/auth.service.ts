import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { PassIsWrong, UserNotFound } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly jwtServ: JwtService,
  ) {}

  async createUser(dto: AuthDto) {
    const salt = genSaltSync(8);
    const user = new this.userModel({
      email: dto.email,
      passwordHash: hashSync(dto.password, salt),
    });
    return user.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<UserModel, 'email'>> {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException(UserNotFound);
    }
    const isPassCorrect = compareSync(password, user.passwordHash);
    if (!isPassCorrect) {
      throw new UnauthorizedException(PassIsWrong);
    }
    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };
    return { access_token: await this.jwtServ.signAsync(payload) };
  }
}
