import { Block, IComponentProps } from "../../core/Block";
import message from "./Message.hbs";
import "./Message.scss";

export interface IMessageProps extends IComponentProps {
    isOutgoing: boolean;
    contactUserChatMessage: string;
    contactUserChatTime: string;
}

export class Message extends Block<IMessageProps> {
    constructor(props: IMessageProps) {
        super(props);
    }

    render() {
        return this.compile(message, { ...this.props });
    }
}
