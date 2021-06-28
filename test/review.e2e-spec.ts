import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '@review/dto/create-review.dto';
import { disconnect, Types } from 'mongoose';
import { testLogin } from './jwt.login';

const productId = new Types.ObjectId().toHexString();
const testDto: CreateReviewDto = {
  name: 'TEST',
  message: 'test message',
  rating: '5',
  title: 'My cool review',
  productId,
};

describe('Review controller (e2e)', () => {
  let app: INestApplication;
  let linked_productId: string;
  let createdId: string;
  let authCredential: testLogin;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    authCredential = await new testLogin(app);
    await authCredential.registerTestUser();
    await authCredential.prepareJwt();
  });

  it('/review/create (POST)', async (done) => {
    return await request(app.getHttpServer())
      .post('/review/create')
      .set(authCredential.Header, authCredential.Token)
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
