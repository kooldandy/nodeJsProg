import { IUser } from './../../../Task3/src/interface/user.interface';
import { UserDataAccess } from './../dao';

export class AuthService {
  private dao: UserDataAccess;

  constructor() {
    this.dao = new UserDataAccess();
  }

  public authenticate = async (username: string, password: string):Promise<IUser> => {
    try {
      const result = await this.dao.findUser(username, password);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
}
