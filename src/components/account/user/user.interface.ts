import { MongoIdInterface } from '@interfaces/common/db/mongoId.interface';

export interface IUser {
  _id: string | MongoIdInterface;
  name: string | undefined;
  email: string;
  password: string;
  verified: string;
}
