import { ChatList } from "../../components/ChatList/ChatList";
import { MessageContainer } from "../../components/MessageContainer/MessageContainer";
import { MessagePreview } from "../../components/MessagePreview/MessagePreview";
import { Block, IComponentProps } from "../../core/Block";
import chat from "./Chat.hbs";
import "./Chat.scss"

const oldChatContext = [
    {
        contactUserName: "А",
        contactUserChatName: "Алина",
        contactUserChatMessage: "Видела, Маша на кухню печенье принесла?",
        contactUserChatTime: "15:00",
        contactUserUnreadMessageCount: 0,
    },
    {
        contactUserName: "Д",
        contactUserChatName: "Даша",
        contactUserChatMessage: "Спасибо за подарок)",
        contactUserChatTime: "16:00",
        contactUserUnreadMessageCount: 1,
    }
]

export interface IChatPageProps extends IComponentProps{
}

export class ChatPage extends Block<IChatPageProps>{
    private _chatList: ChatList;
    private _messageContainer: MessageContainer;

    constructor(props: IChatPageProps) {
        super(props);

        this._chatList = new ChatList({
            messages: oldChatContext,
            activeChat: -1
        });

        this._chatList.messagesPreview.map(message => {
            message.setProps({
                events: {
                    click: () => {
                        this.setCurrentChat(message);
                    }
                }
            })
        });

        this._messageContainer = new MessageContainer({
            messages: [],
            contactUserChatName: '',
            contactUserName: '',
            hideChat: true
        });
    }

    init(): void {
        this.children.chatList = this._chatList;
        
        this.children.messageContainer = this._messageContainer;
    }

    setCurrentChat(message: MessagePreview) {
        this._messageContainer.setProps({
            contactUserChatName: message.element?.getElementsByClassName("contact-user-chat-name")[0].innerHTML || "",
            contactUserName: message.element?.getElementsByClassName("contact-user-chat-name")[0].innerHTML || "",
            hideChat: false,
            messages: [{
                isOutgoing: false,
                contactUserChatMessage: message.element?.getElementsByClassName("contact-user-message-preview")[0].innerHTML || "",
                contactUserChatTime: message.element?.getElementsByClassName("contact-user-chat-time")[0].innerHTML || "",
            }]
        })
    }

    render() {
        return this.compile(chat, { ...this.props });
    }
}
