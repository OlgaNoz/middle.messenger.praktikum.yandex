import template from "./UserSignForm.hbs";
import { Block, IComponentProps } from "../../../core/Block";
import { ActionButton, IButtonProps } from "../../ActionButton/ActionButton";
import "./UserSignForm.scss"
import { FormInput, IFormInputProps } from "../FormInput/FormInput";
import { Form } from "../Form/Form";
import { Link } from "../../Link/Link";
import { isValidFormInput } from "../../../common/scripts/FormValidation";

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
    inputComponents: FormInput[];

    constructor(props: IUserSignFormProps) {
        super(props);
    }

    protected init(): void {
        const submitButton = new ActionButton(this.props.submitButton);

        this.inputComponents = this.props.inputComponents.map(props => {
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
            if (value !== "" && !isValidFormInput(name, value)) {
                this.form.setValidInput(name, true);
            } else {
                this.form.setValidInput(name, false);
            }
        });
    }
    
    render() {
        return this.compile(template, { ...this.props });
    }
}
