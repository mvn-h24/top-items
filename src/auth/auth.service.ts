import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
  ) {}

  async createUser(dto: AuthDto) {
    const salt = genSaltSync(8);
    const user = new this.userModel({
      email: dto.email,
      passwdHash: hashSync(dto.password, salt),
    });
    return user.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
