import { axiosInstance } from './request';

export interface ILoginData {
  userName: string;
  password: string;
}

export interface IRegisterData {
  name: string;
  password: string;
}


export const AuthApi = {
  async login(data: ILoginData) {
    return await axiosInstance.post('/User/login', data);
  },
  async register(data: IRegisterData) {
    return await axiosInstance.post('/User/register', data);
  }
}
