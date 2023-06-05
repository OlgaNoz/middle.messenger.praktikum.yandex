import './src/common/styles/main.scss'
import { UserSettingsPage } from "./src/modules/UserSettingsPage/UserSettingsPage";
import { LoginPage } from "./src/modules/LoginPage/LoginPage";
import { RegistrationPage } from "./src/modules/RegistrationPage/RegistrationPage"
import { ChatsPage } from "./src/modules/ChatPage/ChatPage"
import Router from './src/core/Router';

window.addEventListener('load', () => {
    Router
        .use("/", LoginPage)
        .use("/sign-up", RegistrationPage)
        .use("/messenger", ChatsPage)
        .use("/settings", UserSettingsPage)
        .start();
});
