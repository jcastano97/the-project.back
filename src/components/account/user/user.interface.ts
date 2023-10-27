interface MongoIdInterface {
  $oid: string;
}
interface IUser {
  _id: string | MongoIdInterface;
  name: string | undefined;
  email: string;
  password: string;
  verified: string;
}

export { IUser, MongoIdInterface };
