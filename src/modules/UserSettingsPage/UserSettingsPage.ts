import { isValidFormInput } from "../../common/scripts/FormValidation";
import { ActionButton } from "../../components/ActionButton/ActionButton";
import { AvatarButton } from "../../components/AvatarButton/AvatarButton";
import { ChangePasswordModal } from "../../components/ChangePasswordModal/ChangePasswordModal";
import { Form } from "../../components/FormComponents/Form/Form";
import { FormInput, IFormInputProps } from "../../components/FormComponents/FormInput/FormInput";
import { InputWithMessage } from "../../components/FormComponents/InputWithMessage/InputWithMessage";
import { Modal } from "../../components/Modal/Modal";
import { AuthController } from "../../controllers/AuthController";
import { IUserSettings, UserController } from "../../controllers/UserController";
import { Block, IComponentProps } from "../../core/Block";
import Router from "../../core/Router";
import { connect } from "../../core/Store";
import template from "./UserSettingsPage.hbs";
import "./UserSettingsPage.scss"

const _inputComponents = [
    {
        type: "text",
        name: "display_name",
        placeholder: "Имя в чате",
        classNames: [],
        value: ""
    },
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
    }
] as IFormInputProps[];


// export interface IUserSettingsPage {
//     user?: IUserInfo;
// }

const authController = new AuthController();
const userController = new UserController();

class UserSettingsPageComponent extends Block<IComponentProps> {
    inputComponents: InputWithMessage[];
    form: Form;

    protected async init(): Promise<void> {

        authController.getUser();  

        this.children.logoutButton = new ActionButton({
            buttonName: '<div class="icon-signout"></div>',
            buttonType: 'button',
            classNames: ["icon-transparent"],
            events: {
                click: () => { authController.logout() }
            }
        });

        const withIsEditPasswordModal = connect((state) => ({isActive: state.isChangePasswordModalActive}));
        const EditPasswordActiveModal = withIsEditPasswordModal(Modal);
        this.children.modal = new EditPasswordActiveModal({
            header: "Изменить пароль",
            isActive: false,
            content: new ChangePasswordModal({}),
            cancelClick: () => {
                userController.changePasswordModal(false);
            }
        });
    }

    getUserSetting(setting: string) {
        switch (setting) {
            case "first_name":
                return this.props.user?.first_name;
            case "second_name":
                return this.props.user?.second_name;
            case "email":
                return this.props.user?.email;
            case "login":
                return this.props.user?.login;
            case "phone":
                return this.props.user?.phone;
            case "display_name":
                return this.props.user?.display_name;
            default:
                break;
        }
    }

    formValidation() {
        const formInputValues = this.form.getFormInputValues();
        formInputValues.forEach(element => {
            const { name, value } = element;
            const validation = isValidFormInput(name, value);
            if (value !== "" && !validation.valid) {
                this.form.setValidInput(name, true, validation.errorText);
            } else {
                this.form.setValidInput(name, false, "");
            }
        });
    }

    protected componentDidUpdate(_oldProps: IComponentProps, _newProps: IComponentProps): boolean {
        this.setInputs();

        this.children.avatar = new AvatarButton({
            src: this.props.user?.avatar ? this.props.user.avatar : "",
            isEditMode: true
        });

        this.form = new Form({
            buttons: [ new ActionButton({
                buttonName: "Изменить пароль",
                buttonType: "button",
                classNames: ["change-password-button"],
                events: {
                    click: () => {
                        userController.changePasswordModal(true);
                    }
                }
            }), new ActionButton({
                buttonName: "Применить настройки",
                buttonType: "submit",
                classNames: ["submit-button"]
            }),
            new ActionButton({
                buttonName: "Отменить",
                classNames: ["cancel-button"],
                buttonType: "button",
                events: {
                    click: () => {
                        Router.back();
                    }
                }
            })],
            url: "/user/profile",
            inputComponents: this.inputComponents,
            submit: () => {
                const data = this.form.getFormInputValues();
                const request = {
                    login: data.find(x => x.name === "login")?.value,
                    email: data.find(x => x.name === "email")?.value,
                    first_name: data.find(x => x.name === "first_name")?.value,
                    second_name: data.find(x => x.name === "second_name")?.value,
                    phone: data.find(x => x.name === "phone")?.value,
                    display_name: data.find(x => x.name === "display_name")?.value
                } as IUserSettings;
                userController.changeUserSettings(request);
            }
        });

        this.children.form = this.form;

        return true;
    }

    setInputs() {
        this.inputComponents = _inputComponents.map(props => {
            const formInput = new FormInput({
                ...props,
                value: this.getUserSetting(props.name ?? ""),
                events: {
                    blur: this.formValidation.bind(this)
                }
            });
            const inputWithMessage = new InputWithMessage({
                input: formInput
            })
            return inputWithMessage;
        });
    }

    protected render(): DocumentFragment {
        return (this.compile(template, {...this.props}));
    }
}

const withUser = connect(state => {
    const currentUser = state.currentUser;
  
    if (!currentUser) {
        return {
            user: undefined
        };
    }
  
    return {
        user: currentUser
    };
});

export const UserSettingsPage = withUser(UserSettingsPageComponent);
