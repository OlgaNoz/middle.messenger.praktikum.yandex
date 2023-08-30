import { ChatsListComponent } from "../../components/ChatList/ChatList";
import { MessageContainer } from "../../components/MessageContainer/MessageContainer";
import { Block, IComponentProps } from "../../core/Block";
import chat from "./Chat.hbs";
import "./Chat.scss"

export interface IChatPageProps extends IComponentProps{
}

export class ChatsPage extends Block<IChatPageProps>{
    constructor(props: IChatPageProps) {
        super(props);
    }

    init(): void {    
        this.children.chatList = new ChatsListComponent({
            chats: [],
            activeChat: -1
        });
        
        this.children.messageContainer = new MessageContainer({
            messages: [],
            contactUserChatName: '',
            contactUserName: '',
            hideChat: true,
            currentChatId: 0
        });
    }
    
    render() {
        return this.compile(chat, { ...this.props });
    }
}
