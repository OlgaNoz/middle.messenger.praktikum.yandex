import { IUserSettings } from "../controllers/UserController";
import { BaseAPI } from "../core/BaseAPI";
import { HTTPTransport, Options } from "../core/HTTPTransport";

const userApi = new HTTPTransport('/user');

export class UserAPI extends BaseAPI {
    getUsersByLogin(text: string) {
        const options = {
            data: {
                login: text
            } 
        } as Options;
        return userApi.post('/search', options)
    }

    changeUserSettings(data: IUserSettings) {
        const options = {
            data
        } as Options;
        return userApi.put('/profile', options)
    }

    changeAvatar(data: FormData) {
        const options = {
            data
        } as Options;
        return userApi.put('/profile/avatar', options)
    }

    changePassword(oldPass: string, newPass: string) {
        const options = {
            data: {
                oldPassword: oldPass,
                newPassword: newPass
            }
        } as Options;
        return userApi.put('/password', options)
    }
}
