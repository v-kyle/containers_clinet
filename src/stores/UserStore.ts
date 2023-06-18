import { makeAutoObservable, runInAction } from 'mobx';
import { makePersistable, isHydrated } from 'mobx-persist-store';
import { AuthApi, ILoginData, IRegisterData } from '../api/AuthApi';

type ISex = 'man' | 'woman';

interface IUser {
  login: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  sex?: ISex;
}

class UserStore {
  isAuth = false;
  userData: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'UserStore',
      properties: ['isAuth', 'userData'],
      storage: window.localStorage,
    }).catch((error) => error && console.error(error));
  }

  //Setters
  setUser(userData: IUser | null) {
    this.userData = userData;
  }


  //Actions
  async login(data: ILoginData) {
    try {
      const res = await AuthApi.login(data);
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  }

  async register(data: IRegisterData) {
    try {
      const res = await AuthApi.register(data);
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  }

  logout() {
    this.isAuth = false;
    this.userData = null;
  }
}

export const userStore = new UserStore();
