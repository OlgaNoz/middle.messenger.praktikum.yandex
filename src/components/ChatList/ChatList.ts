import { Block, IComponentProps } from "../../core/Block";
import { ActionButton } from "../ActionButton/ActionButton";
import { IMessagePreview, MessagePreview } from "../MessagePreview/MessagePreview";
import chatList from "./ChatList.hbs"
import "./ChatList.scss"
import "../../common/styles/icons.scss"
import { FormInput } from "../FormComponents/FormInput/FormInput";
import Router from "../../core/Router";
import { connect } from "../../core/Store";
import { ChatController } from "../../controllers/ChatController";
import { Modal } from "../Modal/Modal";
import { AddChatModalContent } from "../AddChatModalContent/AddChatModalContent";
import { AuthController } from "../../controllers/AuthController";

const chatController = new ChatController();
const authController = new AuthController();

export interface IChatListProps extends IComponentProps {
    chats: IMessagePreview[];
    activeChat: number;
    inputNotNull?: boolean;
}

class ChatList extends Block<IChatListProps> {
    _searchInputValue: string;
    public chatsPreview: MessagePreview[];
    
    init() {
        this._searchInputValue = "";
        
        this.getChats();

        this.children.chatsPreview = [];
        
        this.children.addChatButton = new ActionButton({
            buttonName: '<div class="icon-add"></div>',
            buttonType: 'button',
            classNames: ['icon-solid', 'button-add'],
            events: {
                click: this.addNewChat.bind(this)
            }
        });

        this.children.userSettingsButton = new ActionButton({
            buttonName: '<div class="icon-bars"></div>',
            classNames: ["icon-transparent"],
            buttonType: "button",
            events: {
                click: () => {
                    Router.go("/settings");
                }
            }
        });

        this.children.searchChatInput = new FormInput({
            classNames: ['user-search-field'],
            placeholder: 'Поиск',
            type: 'text',
            events: {
                keydown: (ev: KeyboardEvent) => {
                    this.setProps({
                        inputNotNull: true
                    })
                    this._filterChats(ev.key);
                }
            }
        });

        this.children.clearSearchInputButton = new ActionButton({
            buttonName: '<div class="icon-clear"></div>',
            buttonType: 'button',
            classNames: ['icon-solid', 'clear-button'],
            events: {
                click: () => {
                    this.setProps({
                        inputNotNull: false
                    })
                }
            }
        });

        const withIsAddChatActiveModal = connect((state) => ({isActive: state.isActiveAddChatModal}));
        const AddChatActiveModal = withIsAddChatActiveModal(Modal);
        this.children.modal = new AddChatActiveModal({
            header: "Добавить новый чат",
            isActive: false,
            content: new AddChatModalContent({}),
            cancelClick: () => {
                chatController.isOpenAddChatModal(false);
            }
        });
    }

    private _filterChats(filteredString: string) {
        this._searchInputValue = filteredString;
        const filteredValues = this.props.chats.filter(message => 
            message.contactUserChatName.toLowerCase().includes(filteredString.toLowerCase())
        )
        this.setProps({
            chats: filteredValues
        });
    }

    protected componentDidUpdate(oldProps: IChatListProps, newProps: IChatListProps): boolean {
        this.children.chatsPreview = newProps.chats.map((chat) => {
            const newChatProps = {
                ...chat,
                events: {
                    click: () => {
                        chatController.selectChat(chat);
                    }
                }
            }
            return new MessagePreview(newChatProps);
        });

        return true;
    }

    public addNewChat(): void {
        chatController.isOpenAddChatModal(true);
    }

    public async getChats(): Promise<void> {
        authController.getUser();
        chatController.getChatList();
    }

    render() {
        return this.compile(chatList, {...this.props});
    }
}

const withChats = connect((state) => ({chats: state.chats || []}));

export const ChatsListComponent = withChats(ChatList);
