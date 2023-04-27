import { IButtonProps } from "../../components/ActionButton/ActionButton"
import { IFormInputProps } from "../../components/Form/FormInput/FormInput";
import { UserSignForm } from "../../components/Form/UserSignForm/UserSignForm";

export class LoginPage {
    static _submitButtonProps = {
        buttonType: "submit",
        buttonName: "Вход",
        classNames: ["button-button"],
    } as IButtonProps;

    static _loginInputComponents = [
        {
            type: "text",
            name: "login",
            placeholder: "Логин",
            classNames: [],
            value: ""
        },
        {
            type: "password",
            name: "password",
            placeholder: "Пароль",
            classNames: [],
            value: ""
        }
    ] as IFormInputProps[];
    
    userSignForm = new UserSignForm({
        formName: "Вход",
        linkName: "Создать аккаунт",
        submitButton: LoginPage._submitButtonProps,
        inputComponents: LoginPage._loginInputComponents,
        url: "/login",
        classNames: [],
        href: "#"
    });

    renderPage() {
        return this.userSignForm.getContent();
    }
}
