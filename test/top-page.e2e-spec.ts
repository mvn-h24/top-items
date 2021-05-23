import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { testLogin } from './jwt.login';
import { TopPageCreateDto } from '../src/top-page/dto/top-page-create.dto';
import { FindTopPageDto } from '../src/top-page/dto/find-top-page.dto';
import { TopLevelCategory } from '../src/top-page/top-page.model';

const createDto: TopPageCreateDto = {
  alias: 'a very cool page',
  product_category: 'cool product',
  title: 'my cool page',
  seoText: 'landing page about me',
  tagsTitle: 'tags',
  tags: ['landing', 'page', 'user rated'],
  menu_category: {
    firstLevel: TopLevelCategory.services,
    secondLevel: 2,
  },
  hh: {
    count: 1,
    juniorSalary: 2,
    middleSalary: 3,
    seniorSalary: 4,
  },
  advantages: [
    {
      name: 'user rated',
      description: 'users positivly rate this product',
    },
  ],
};
const updateDto = {
  alias: 'a very cool page',
  product_category: 'cool product',
  title: 'my cool page',
  seoText: 'landing page about me',
  tagsTitle: 'tags',
  tags: ['landing', 'page', 'user rated'],
  menu_category: {
    firstLevel: TopLevelCategory.services,
    secondLevel: 2,
  },
  hh: null,
  advantages: [
    {
      name: 'user rated',
      description: 'users positivly rate this product',
    },
  ],
};
const findDto: FindTopPageDto = {
  firstCategory: TopLevelCategory.services,
};
describe('Review controller (e2e)', () => {
  let app: INestApplication;
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

  it('/top-page/create (POST)', async (done) => {
    return await request(app.getHttpServer())
      .post('/top-page/create')
      .set(authCredential.Header, authCredential.Token)
      .send(createDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
        done();
      });
  });
  it('/top-page/:id (GET)', async (done) => {
    return await request(app.getHttpServer())
      .get('/top-page/' + createdId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body).toMatchObject(createDto);
        done();
      });
  });
  it('/top-page/:id (PATCH)', async (done) => {
    return await request(app.getHttpServer())
      .patch('/top-page/' + createdId)
      .set(authCredential.Header, authCredential.Token)
      .send(updateDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body).toMatchObject(updateDto);
        done();
      });
  });

  it('/top-page/find (POST)', async (done) => {
    return await request(app.getHttpServer())
      .post('/top-page/find')
      .send(findDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBeGreaterThan(0);
        done();
      });
  });
  it('/top-page/:id (DELETE)', async (done) => {
    return await request(app.getHttpServer())
      .delete('/top-page/' + createdId)
      .set(authCredential.Header, authCredential.Token)
      .expect(200)
      .then(() => {
        done();
      });
  });

  afterAll(() => {
    disconnect();
  });
});
