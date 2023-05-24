import { Block, IComponentProps } from "../../core/Block";
import { AvatarButton } from "../AvatarButton/AvatarButton";
import message from "./Message.hbs";
import "./Message.scss";

export interface IMessageProps extends IComponentProps {
    isOutgoing: boolean;
    contactUserChatMessage: string;
    contactUserChatTime: string;
    avatar: string;
}

export class Message extends Block<IMessageProps> {
    constructor(props: IMessageProps) {
        super(props);
    }

    protected init(): void {
        this.children.avatar = new AvatarButton({
            src: this.props.avatar,
            isEditMode: false
        })
    }

    render() {
        return this.compile(message, { ...this.props });
    }
}
