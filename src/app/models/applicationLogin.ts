import { LoginParams } from './loginParams';
export class ApplicationLogin {
    constructor() {
        this.loginParams = [];
    }

    useCase: string;
    loginParams: LoginParams[];
}
