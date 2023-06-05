import { BaseAPI } from "../core/BaseAPI";
import { HTTPTransport, Options } from "../core/HTTPTransport";

export interface ISignUpRequest {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export interface ISignInRequest {
    login: string,
    password: string
}

const authAPIInstance = new HTTPTransport('/auth');

export class AuthAPI extends BaseAPI {
    signUp(data: ISignUpRequest) {
        const options = {
            data 
        } as Options;
        return authAPIInstance.post('/signup', options);
    }

    signIn(data: ISignInRequest) {
        const options = {
            data 
        } as Options;
        return authAPIInstance.post('/signin', options);
    }

    logout() {
        return authAPIInstance.post('/logout');
    }

    getUser() {
        return authAPIInstance.get('/user');
    }
}
