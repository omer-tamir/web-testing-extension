import { ApplicationLogin } from './applicationLogin';

export class Application {
  constructor() {
    this.applicationLogin = [];
  }

  id = 0;
  name: string;
  devUrl: string;
  testUrl: string;
  prodUrl: string;
  applicationLogin: ApplicationLogin[];
}
