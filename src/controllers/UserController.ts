import { UserAPI } from "../API/UserApi";
import Router from "../core/Router";
import Store from "../core/Store";

const userApi = new UserAPI()

export interface IUserSettings {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

export class UserController {

    getUsersByLogin(text: string) {
        if (text.length === 0) {
            Store.set('foundUsers', []); 
        } else {
            return userApi.getUsersByLogin(text).then((result) => {
                Store.set('foundUsers', result);
            }).catch((error) => {
                alert(error.data.reason);
            }); 
        }
    }

    changeUserSettings(data: IUserSettings) {
        userApi.changeUserSettings(data).then(() => {
            Router.back();
        }).catch((error) => {
            alert(error.data.reason);
        });
    }

    changeUserAvatar(data: FormData) {
        userApi.changeAvatar(data).then(() => {
            Router.back();
        }).catch((error) => {
            alert(error.data.reason);
        }); 
    }

    changeUserPassword(oldPass: string, newPass: string) {
        userApi.changePassword(oldPass, newPass).then(() => {
            this.changePasswordModal(false);
        }).catch((error) => {
            if (error.reason === "Password is incorrect") {
                alert("Текущий пароль не совпадает")
            }
        });
    }

    changePasswordModal(value: boolean) {
        Store.set('isChangePasswordModalActive', value); 
    }
}
