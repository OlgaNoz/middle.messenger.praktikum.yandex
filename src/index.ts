import './common/styles/main.scss'
import { UserSettingsPage } from "./modules/UserSettingsPage/UserSettingsPage";
import { LoginPage } from "./modules/LoginPage/LoginPage";
import { RegistrationPage } from "./modules/RegistrationPage/RegistrationPage"
import { ChatsPage } from "./modules/ChatPage/ChatPage"
import Router from './core/Router';

window.addEventListener('load', () => {
    Router
        .use("/", LoginPage)
        .use("/sign-up", RegistrationPage)
        .use("/messenger", ChatsPage)
        .use("/settings", UserSettingsPage)
        .start();
});
