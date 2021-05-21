import { AuthDto } from '../src/auth/dto/auth.dto';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

const loginDto: AuthDto = {
  email: 'test@rest.com',
  password: '12356',
};
export class testLogin {
  public clearlyToken = '';
  constructor(private readonly app: INestApplication) {}

  async prepareJwt(): Promise<testLogin> {
    const { body } = await request(this.app.getHttpServer())
      .post('/auth/login')
      .send(loginDto);
    this.clearlyToken = body.access_token;
    return this;
  }

  get Header() {
    return 'Authorization';
  }
  get Token() {
    return 'Bearer ' + this.clearlyToken;
  }
  get AuthHeader(): { field: string; val: string[] } {
    return { field: this.Header, val: [this.Token] };
  }
}
