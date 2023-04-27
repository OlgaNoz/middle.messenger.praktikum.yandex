import { Block, IComponentProps } from "../../../core/Block";
import formInputTemplate from "./FormInput.hbs"
import "./FormInput.scss"

export interface IFormInputProps extends IComponentProps {
    type: string;
    name?: string;
    placeholder: string;
    value?: string | null;
    invalid?: boolean
}

export class FormInput extends Block<IFormInputProps> {
    constructor(props: IFormInputProps) {
        super(props);
    }

    getInputName() {
        return this.props.name || "";
    }

    getInputValue() {
        return (this.element as HTMLInputElement).value;
    }

    setInputValue(value: string) {
        this.setProps({
            value
        });
    }
  
    render() {
        return this.compile(formInputTemplate, { ...this.props });
    }
}
