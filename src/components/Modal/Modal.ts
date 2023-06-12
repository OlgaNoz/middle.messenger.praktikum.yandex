import { Block, IComponentProps } from "../../core/Block";
import { ActionButton } from "../ActionButton/ActionButton";
import template from "./Modal.hbs";
import "./Modal.scss";

export interface BlockComponent<_P extends IComponentProps> {
  }

export interface IModalProps extends IComponentProps {
    header: string;
    isActive: boolean;
    content: BlockComponent<IComponentProps>;
    cancelClick: () => void;
}

export class Modal extends Block<IModalProps> {
    constructor(props: IModalProps) {
        super(props);
    }

    protected init(): void {

        this.children.closeButton = new ActionButton({
            buttonName: '<div class="icon-close"></div>',
            buttonType: 'button',
            classNames: ['action-button', 'icon-transparent'],
            events: {
                click: () => this.props.cancelClick()
            }
        })
    }

    render() {
        return (this.compile(template, {...this.props}));
    }
}
