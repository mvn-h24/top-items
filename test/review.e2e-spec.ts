import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/CreateReviewDto';
import { disconnect, Types } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';

const productId = new Types.ObjectId().toHexString();
const testDto: CreateReviewDto = {
  name: 'TEST',
  message: 'test message',
  rating: '5',
  title: 'My cool review',
  productId,
};
const loginDto: AuthDto = {
  email: 'test@rest.com',
  password: '12356',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let linked_productId: string;
  let createdId: string;
  let testApiToken: string;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto);
    testApiToken = body.access_token;
  });

  it('/review/create (POST)', async (done) => {
    return await request(app.getHttpServer())
      .post('/review/create')
      .set('Authorization', 'Bearer ' + testApiToken)
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        linked_productId = body.productId;
        createdId = body._id;
        expect(linked_productId).toBeDefined();
        expect(createdId).toBeDefined();
        done();
      });
  });
  it('/review/byProduct/:id (GET)', async (done) => {
    return await request(app.getHttpServer())
      .get('/review/byProduct/' + linked_productId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
        done();
      });
  });
  it('/review/:id (DELETE)', async (done) => {
    return await request(app.getHttpServer())
      .delete('/review/' + createdId)
      .expect(200)
      .then(() => {
        done();
      });
  });

  afterAll(() => {
    disconnect();
  });
});
