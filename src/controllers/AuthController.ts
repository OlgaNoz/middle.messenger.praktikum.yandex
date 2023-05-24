import { AuthAPI, ISignInRequest, ISignUpRequest } from "../API/AuthApi";
import Router from "../core/Router";
import Store from "../core/Store";

const authApi = new AuthAPI();

export interface IUserInfo extends ISignUpRequest {
    avatar: string,
    id: number,
    display_name: string,
}

export class AuthController {
    public async login(data: ISignInRequest) {
        authApi.signIn(data).then(() => {
            Router.go('/messenger');
        }).catch((error) => {
            alert(error);
        });
    }

    public async reg(data: ISignUpRequest) {
        authApi.signUp(data);

        Router.go('/messenger');
    }

    public async logout() {
        await authApi.logout();
        Router.go('/');
    }

    public async getUser() {
        await authApi.getUser().then((result: unknown) => {
            const user = result as IUserInfo;
            Store.set('currentUser', user);
        });
    }
} 
