import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/CreateReviewDto';
import { disconnect, Types } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';

describe('Auth Controller (e2e)', () => {
  let app: INestApplication;
  let testApiToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('/auth/register (POST)', async (done) => {
    done();
  });

  it('/auth/login (POST)', async (done) => {
    done();
  });

  afterAll(() => {
    disconnect();
  });
});
