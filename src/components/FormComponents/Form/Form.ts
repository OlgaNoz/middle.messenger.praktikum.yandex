import { isValidFormInput } from "../../../common/scripts/FormValidation";
import { Block, IComponentProps } from "../../../core/Block";
import { ActionButton } from "../../ActionButton/ActionButton";
import { FormInput } from "../FormInput/FormInput";
import template from "./Form.hbs";
import "./Form.scss";

export interface IFormProps extends IComponentProps {
    url: string;
    inputComponents: FormInput[];
    buttons: ActionButton[];
}

export class Form extends Block<IFormProps> {
    _inputComponents: FormInput[];

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
            const name = element.name || "";
            if (!isValidFormInput(name, element.value)) {
                this.setValidInput(name, true);
            } else {
                this.setValidInput(name, false);
            }
        });
    }

    getFormInputValues() {
        return this._inputComponents.map(input => {
            return {
                name: input.getInputName(),
                value: input.getInputValue()
            };
        });
    }

    setValidInput(name: string, value: boolean) {
        const input = this._inputComponents.find(element => element.getInputName() === name);
        if (input) {
            input.setProps({
                value: input.getInputValue(),
                invalid: value
            })
        }
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
