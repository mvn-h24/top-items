import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

const ConfigFactory = async (
  confService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoUriString(confService),
    ...getConnectOptions(),
  };
};

const getMongoUriString = (confService: ConfigService) =>
  `mongodb://${confService.get('MONGO_LOGIN')}:${confService.get(
    'MONGO_PASSWORD',
  )}@${confService.get('MONGO_HOST')}:${confService.get(
    'MONGO_PORT',
  )}/${confService.get('MONGO_DB')}`;

const getConnectOptions = () => ({
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

export const MongoDbConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: ConfigFactory,
};
