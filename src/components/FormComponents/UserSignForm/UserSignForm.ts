import template from "./UserSignForm.hbs";
import { Block, IComponentProps } from "../../../core/Block";
import { ActionButton, IButtonProps } from "../../ActionButton/ActionButton";
import "./UserSignForm.scss"
import { FormInput, IFormInputProps } from "../FormInput/FormInput";
import { Form } from "../Form/Form";
import { Link } from "../../Link/Link";
import { isValidFormInput } from "../../../common/scripts/FormValidation";
import { InputWithMessage } from "../InputWithMessage/InputWithMessage";

export interface IUserSignFormProps extends IComponentProps {
    formName: string,
    inputComponents: IFormInputProps[],
    submitButton: IButtonProps,
    linkName: string,
    url: string;
    href: string;
}

export class UserSignForm extends Block<IUserSignFormProps> {
    form: Form;
    inputComponents: InputWithMessage[];

    constructor(props: IUserSignFormProps) {
        super(props);
    }

    protected init(): void {
        const submitButton = new ActionButton(this.props.submitButton);

        this.inputComponents = this.props.inputComponents.map(props => {
            const formInput = new FormInput({
                ...props,
                events: {
                    blur: this.formValidation.bind(this)
                }
            });
            const inputWithMessage = new InputWithMessage({
                input: formInput
            })
            return inputWithMessage;
        });

        this.form = new Form({
            buttons: [ submitButton ],
            url: this.props.url,
            inputComponents: this.inputComponents
        });

        this.children.link = new Link({
            href: this.props.href,
            linkName: this.props.linkName,
            classNames: [ "form-back-link" ]
        })

        this.children.form = this.form;
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
    
    render() {
        return this.compile(template, { ...this.props });
    }
}
