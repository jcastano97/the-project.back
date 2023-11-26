import { IUser } from '@components/account/user/user.interface';
import { MongoIdInterface } from '@components/common/interfaces/mongo/mongoId.interface';
import { DatetimeRecordInterface } from '@components/common/interfaces/datetimeRecord.interface';
import { IIdentificationDocument } from '@components/account/identificationDocument/identificationDocument.interface';
import { IFileSignature } from '@components/feature/digitalSign/fileSignature/fileSignature.interface';

export interface IDigitalSign extends DatetimeRecordInterface {
  _id: string | MongoIdInterface;
  user: IUser;
  identificationDocument: IIdentificationDocument;
  rootSignature: string;
  signatures: IFileSignature[];
}
