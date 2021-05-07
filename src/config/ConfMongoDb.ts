import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const ConfMongoDb = async (
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
