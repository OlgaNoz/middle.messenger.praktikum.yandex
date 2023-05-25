import { ISignInRequest } from "../../API/AuthApi";
import { IButtonProps } from "../../components/ActionButton/ActionButton"
import { IFormInputProps } from "../../components/FormComponents/FormInput/FormInput";
import { UserSignForm } from "../../components/FormComponents/UserSignForm/UserSignForm";
import { AuthController } from "../../controllers/AuthController";
import { Block, IComponentProps } from "../../core/Block";

const authController = new AuthController();
export class LoginPage extends Block<IComponentProps>{
    userSignForm: UserSignForm;
    
    protected init(): void {
        const _submitButtonProps = {
            buttonType: "submit",
            buttonName: "Вход",
            classNames: ["button-button"],
        } as IButtonProps;

        const _loginInputComponents = [
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

        this.userSignForm = new UserSignForm({
            onSubmit: () => {
                const data = this.userSignForm.form.getFormInputValues();
                const request = {
                    login: data.find(x => x.name === "login")?.value,
                    password: data.find(x => x.name === "password")?.value,
                } as ISignInRequest;
                authController.login(request);
            },
            formName: "Вход",
            linkName: "Создать аккаунт",
            submitButton: _submitButtonProps,
            inputComponents: _loginInputComponents,
            url: "/login",
            classNames: [],
            href: "/sign-up"
        });
    }

    render() {
        return this.userSignForm.render();
    }
}
