import { MongoIdInterface } from '@components/common/interfaces/mongo/mongoId.interface';
import { DatetimeRecordInterface } from '@components/common/interfaces/datetimeRecord.interface';
import { StateType } from '@components/common/types/state.type';
import { IUser } from '@components/account/user/user.interface';

export interface IIdentificationDocument extends DatetimeRecordInterface {
  _id: string | MongoIdInterface;
  user: IUser;
  file: string;
  state: StateType | 'pendingVerification';
}
