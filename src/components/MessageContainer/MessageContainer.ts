import { isValidFormInput } from "../../common/scripts/FormValidation";
import { prettyDateFormat } from "../../common/scripts/Utils";
import { IUserInfo } from "../../controllers/AuthController";
import { ChatController } from "../../controllers/ChatController";
import { IMessage } from "../../controllers/MessagesController";
import { Block, IComponentProps } from "../../core/Block";
import store from "../../core/Store";
import { connect } from "../../core/Store";
import { ActionButton } from "../ActionButton/ActionButton";
import { ChatSettingsContent, IChatUser } from "../ChatSettingsModal/ChatSettingsContent";
import { FormInput } from "../FormComponents/FormInput/FormInput";
import { IMessageProps, Message } from "../Message/Message";
import { IMessagePreview } from "../MessagePreview/MessagePreview";
import { Modal } from "../Modal/Modal";
import messageContainer from "./MessageContainer.hbs"
import "./MessageContainer.scss";

export interface IMessageContainer extends IComponentProps {
    currentChatId: number;
    contactUserName: string;
    contactUserChatName: string;
    messages: IMessage[];
    hideChat: boolean;
}

const chatController = new ChatController();

class MessageContainerComponent extends Block<IMessageContainer> {
    private typeInput: FormInput;
    constructor(props: IMessageContainer) {
        super(props);
    }

    protected init(): void {
        this.typeInput = new FormInput({
            placeholder: "Введите сообщение...",
            type: "text",
            name: "message",
            classNames: ['user-search-field'],
            events: {
                keydown: (ev: KeyboardEvent) => {
                    if (ev.key === "Enter") {
                        if (isValidFormInput(this.typeInput.getInputName() || "", this.typeInput.getInputValue()).valid) {
                            this.sendNewMessage();
                        } 
                    }
                }
            }
        });

        this.children.typeInput = this.typeInput;

        this.children.editChatButton = new ActionButton({
            buttonName: '<div class="icon-edit"></div>',
            classNames: ["icon-transparent"],
            buttonType: "button",
            events: {
                click: () => {
                    chatController.isOpenEditChatModal(true);
                    const withIsEditChatActiveModal = connect((state) => ({isActive: state.isActiveEditChatModal}));
                    const EditChatActiveModal = withIsEditChatActiveModal(Modal);
                    this.children.modal = new EditChatActiveModal({
                        header: "Редактировать чат",
                        isActive: false,
                        content: new ChatSettingsContent({
                            id: this.props.currentChatId ?? 0,
                            chatUsers: [],
                            foundUsers: []
                        }),
                        cancelClick: () => {
                            chatController.isOpenEditChatModal(false);
                            chatController.clearEditModalValues();
                        },
                        classNames: ["chat-settings-modal"]
                    });
                    chatController.getChatUsers(this.props.currentChatId ?? 0);
                }
            }
        });

        this.children.deleteChatButton = new ActionButton({
            buttonName: '<div class="icon-trash"></div>',
            classNames: ["icon-transparent"],
            buttonType: "button",
            events: {
                click: () => {
                    chatController.deleteChat(this.props.currentChatId);
                }
            }
        });
    }

    protected sendNewMessage() {
        chatController.sendMessage(this.typeInput.getInputValue());
        this.typeInput.setInputValue("");
        
    }

    protected componentDidUpdate(oldProps: IMessageContainer, newProps: IMessageContainer): boolean {    
        if (newProps.messages) {
            const chatUsers = store.getState().chatUsers as IChatUser[];
            this.children.chatMessages = newProps.messages.map((message) => {
                const currentUser = store.getState().currentUser as IUserInfo;
                const newChatProps = {
                    contactUserChatMessage: message.content,
                    contactUserChatTime: prettyDateFormat(message.time),
                    isOutgoing: message.user_id === currentUser.id,
                    avatar: chatUsers.find(x => x.id === message.user_id)?.avatar
                } as IMessageProps
                return new Message(newChatProps);
            });
        } else {
            this.children.chatMessages = [];
        }

        return true;
    }

    protected render(): DocumentFragment {
        return this.compile(messageContainer, {...this.props});
    }
}

const withCurrentChatId = connect(state => {
    const selectedChat = state.chat as IMessagePreview;
  
    if (!selectedChat) {
        return {
            messages: [],
            hideChat: true,
            currentChatId: undefined,
            contactUserChatName: "",
            contactUserName: ""
        };
    }
  
    return {
        messages: state.messages as IMessage[],
        hideChat: false,
        currentChatId: selectedChat.id,
        contactUserChatName: selectedChat.contactUserChatName,
        contactUserName: selectedChat.contactUserName
    };
});

export const MessageContainer = withCurrentChatId(MessageContainerComponent)
