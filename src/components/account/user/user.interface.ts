import { MongoIdInterface } from '@components/common/interfaces/mongo/mongoId.interface';

export interface IUser {
  _id: string | MongoIdInterface;
  name: string | undefined;
  email: string;
  password: string;
  verified: string;
}
