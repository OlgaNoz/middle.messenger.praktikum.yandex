import { isValidFormInput } from "../../../common/scripts/FormValidation";
import { Block, IComponentProps } from "../../../core/Block";
import { ActionButton } from "../../ActionButton/ActionButton";
import { FormInput } from "../FormInput/FormInput";
import { InputWithMessage } from "../InputWithMessage/InputWithMessage";
import template from "./Form.hbs";

export interface IFormProps extends IComponentProps {
    url: string;
    inputComponents: InputWithMessage[];
    buttons: ActionButton[];
}

export class Form extends Block<IFormProps> {
    _inputComponents: InputWithMessage[];

    constructor(props: IFormProps) {
        super(props);

        this._inputComponents = props.inputComponents;
    }

    protected init(): void {
        this.setProps({
            events: {
                submit: this.submitButtonClick.bind(this)
            }
        })
    }

    submitButtonClick(event: MouseEvent) {
        event.preventDefault();
        this.formValidation();
        console.log(this.getFormInputValues());
    }

    formValidation() {
        const formInputValues = this.getFormInputValues();
        formInputValues.forEach(element => {
            const { name, value } = element;
            const validation = isValidFormInput(name, value);
            if (value !== "" && !validation.valid) {
                this.setValidInput(name, true, validation.errorText);
            } else {
                this.setValidInput(name, false, "");
            }
        });
    }

    getFormInputValues() {
        return this._inputComponents.map(element => {
            return {
                name: element.input.getInputName(),
                value: element.input.getInputValue()
            };
        });
    }

    setValidInput(name: string, value: boolean, errorText: string) {
        const input = this._inputComponents.find(element => element.input.getInputName() === name);
        if (input) {
            input.setProps({
                value: input.input.getInputValue(),
                invalid: value,
                errorText,
            })
        }
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
