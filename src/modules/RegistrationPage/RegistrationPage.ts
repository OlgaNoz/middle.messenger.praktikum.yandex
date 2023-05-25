import { ISignUpRequest } from "../../API/AuthApi";
import { IButtonProps } from "../../components/ActionButton/ActionButton"
import { IFormInputProps } from "../../components/FormComponents/FormInput/FormInput";
import { UserSignForm } from "../../components/FormComponents/UserSignForm/UserSignForm";
import { LINKS_LOCATIONS } from "../../components/Link/Link";
import { AuthController } from "../../controllers/AuthController";
import { Block, IComponentProps } from "../../core/Block";

const authController = new AuthController();
export class RegistrationPage extends Block<IComponentProps> {
    userSignForm: UserSignForm;
    
    protected init(): void {
        const _submitButtonProps = {
            buttonType: "submit",
            buttonName: "Создать аккаунт",
            classNames: ["action-button"],
        } as IButtonProps;

        const _loginInputComponents = [
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
            }
        ] as IFormInputProps[];

        this.userSignForm = new UserSignForm({
            onSubmit: () => {
                this.onSubmit();
            },
            formName: "Регистрация",
            linkName: "Назад",
            submitButton: _submitButtonProps,
            inputComponents: _loginInputComponents,
            url: "/reg",
            classNames: [],
            href: LINKS_LOCATIONS.back
        });
    }

    private onSubmit() {
        const data = this.userSignForm.form.getFormInputValues();
        const request = {
            login: data.find(x => x.name === "login")?.value,
            password: data.find(x => x.name === "password")?.value,
            email: data.find(x => x.name === "email")?.value,
            first_name: data.find(x => x.name === "first_name")?.value,
            second_name: data.find(x => x.name === "second_name")?.value,
            phone: data.find(x => x.name === "phone")?.value,
        } as ISignUpRequest;
        authController.reg(request);
    }

    render() {
        return this.userSignForm.render();
    }
}
