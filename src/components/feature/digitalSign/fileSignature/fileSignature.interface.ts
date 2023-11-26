import { MongoIdInterface } from '@components/common/interfaces/mongo/mongoId.interface';
import { DatetimeRecordInterface } from '@components/common/interfaces/datetimeRecord.interface';
import { IDigitalSign } from '@components/feature/digitalSign/digitalSign.interface';

export interface IFileSignature extends DatetimeRecordInterface {
  _id: string | MongoIdInterface;
  digitalSign: IDigitalSign[];
  file: string;
  userSignature: string;
}
