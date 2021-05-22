import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { disconnect, Types } from 'mongoose';
import { testLogin } from './jwt.login';

describe('Auth Controller (e2e)', () => {
  let app: INestApplication;
  let login: testLogin;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    login = new testLogin(app);
  });
  it('/auth/register (POST)', async (done) => {
    const re = await login.registerTestUser();
    console.log(re.status);
    expect(re.status === 201 || re.status === 400).toBeTruthy();
    done();
  });

  it('/auth/login (POST)', async (done) => {
    const re = (await login.prepareJwt()).clearlyToken;
    expect(re.length).not.toBe(0);
    done();
  });

  afterAll(() => {
    disconnect();
  });
});
