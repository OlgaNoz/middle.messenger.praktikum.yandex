import { Block, IComponentProps } from "../../core/Block";
import { ActionButton } from "../ActionButton/ActionButton";
import template from "./ChatUser.hbs"
import "./ChatUser.scss"

export interface IChatUserProps extends IComponentProps {
    id: number,
    login: string,
    isAdmin?: boolean,
    clickRemove?: () => void
}

export class ChatUser extends Block<IChatUserProps> {
    protected init(): void {
        this.children.removeButton = new ActionButton({
            buttonName: '<div class="icon-close"></div>',
            buttonType: 'button',
            classNames: ['action-button', 'icon-transparent'],
            events: {
                click: () => {
                    this.props.clickRemove && this.props.clickRemove()
                }
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, { ...this.props });
    }
}
