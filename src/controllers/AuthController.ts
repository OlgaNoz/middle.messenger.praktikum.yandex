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
            if (error.data.reason === "User already in system") 
                Router.go("/messenger");
            else if (error.data.reason === "Login or password is incorrect") {
                alert('Некорректное имя или пароль')
            }
        });
    }

    public async reg(data: ISignUpRequest) {
        authApi.signUp(data).then(() => {
            Router.go('/messenger');
        }).catch((error) => {
            alert(error.data.reason)    
        });
    }

    public async logout() {
        await authApi.logout().then(() => {
            Router.go('/');
        }).catch((error) => {
            alert(error.data.reason);
        });
    }

    public async getUser() {
        await authApi.getUser().then((result: unknown) => {
            const user = result as IUserInfo;
            Store.set('currentUser', user);
        }).catch((error) => {
            alert(error.data.reason);
        });;
    }
} 
