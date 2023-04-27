import { isValidFormInput } from "../../common/scripts/FormValidation";
import { ActionButton, IButtonProps } from "../../components/ActionButton/ActionButton";
import { AvatarButton } from "../../components/AvatarButton/AvatarButton";
import { Form } from "../../components/Form/Form/Form";
import { FormInput, IFormInputProps } from "../../components/Form/FormInput/FormInput";
import { Block, IComponentProps } from "../../core/Block";
import template from "./UserSettingsPage.hbs";
import "./UserSettingsPage.scss"

const _submitButtonProps = [
    {
        buttonType: "submit",
        buttonName: "Применить настройки",
        classNames: ["submit-button"],
    },
    {
        buttonType: "button",
        buttonName: "Отменить",
        classNames: ["cancel-button"],
    }
] as IButtonProps[];

const _inputComponents = [
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

export class UserSettingsPage extends Block<IComponentProps> {
    inputComponents: FormInput[];
    form: Form;

    constructor(props: IComponentProps) {
        super(props);
    }

    protected init(): void {
        this.children.avatar = new AvatarButton({});

        this.inputComponents = _inputComponents.map(props => {
            const formInput = new FormInput({
                ...props,
                events: {
                    blur: this.formValidation.bind(this),
                    focus: this.formValidation.bind(this)
                }
            });
            return formInput;
        });

         
        this.form = new Form({
            buttons: _submitButtonProps.map(props => {
                return new ActionButton(props)
            }),
            url: "",
            inputComponents: this.inputComponents,
        })

        this.children.form = this.form
    }

    formValidation() {
        const formInputValues = this.form.getFormInputValues();
        formInputValues.forEach(element => {
            const { name, value } = element;
            if (value !== "" && !isValidFormInput(name, value)) {
                this.form.setValidInput(name, true);
            } else {
                this.form.setValidInput(name, false);
            }
        });
    }

    protected render(): DocumentFragment {
        return (this.compile(template, {...this.props}));
    }
}
