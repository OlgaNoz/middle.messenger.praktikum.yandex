import { IButtonProps } from "../../components/ActionButton/ActionButton"
import { IFormInputProps } from "../../components/Form/FormInput/FormInput";
import { UserSignForm } from "../../components/Form/UserSignForm/UserSignForm";

export class RegistrationPage {
    static _submitButtonProps = {
        buttonType: "submit",
        buttonName: "Создать аккаунт",
        classNames: ["action-button"],
    } as IButtonProps;

    static  _loginInputComponents = [
        {
            type: "text",
            name: "first_name",
            placeholder: "Имя",
            classNames: [],
            value: ""
        },
        {
            type: "text",
            name: "second_name",
            placeholder: "Фамилия",
            classNames: [],
            value: ""
        },
        {
            type: "text",
            name: "login",
            placeholder: "Логин",
            classNames: [],
            value: ""
        },
        {
            type: "tel",
            name: "phone",
            placeholder: "Номер",
            classNames: [],
            value: ""
        },
        {
            type: "email",
            name: "email",
            placeholder: "Почта",
            classNames: [],
            value: ""
        },
        {
            type: "password",
            name: "password",
            placeholder: "Пароль",
            classNames: [],
            value: ""
        },
        {
            type: "password",
            name: "confirmPassword",
            placeholder: "Подтверждение",
            classNames: [],
            value: ""
        }
    ] as IFormInputProps[];
    
    userSignForm = new UserSignForm({
        formName: "Регистрация",
        linkName: "Назад",
        submitButton: RegistrationPage._submitButtonProps,
        inputComponents: RegistrationPage._loginInputComponents,
        url: "/reg",
        classNames: [],
        href: "#"
    });

    renderPage() {
        return this.userSignForm.getContent();
    }
}
