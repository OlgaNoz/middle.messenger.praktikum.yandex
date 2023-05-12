import { Block, IComponentProps } from "../../core/Block";
import { ActionButton } from "../ActionButton/ActionButton";
import { IMessagePreview, MessagePreview } from "../MessagePreview/MessagePreview";
import chatList from "./ChatList.hbs"
import "./ChatList.scss"
import "../../common/styles/icons.scss"
import { AvatarButton } from "../AvatarButton/AvatarButton";
import { FormInput } from "../FormComponents/FormInput/FormInput";

const newChatContext = {
    contactUserName: "Л",
    contactUserChatName: "Леша",
    contactUserChatMessage: "Привет, пойдем гулять? Погода шикарная, солнце такое яркое. Птицы поют, весна пришла",
    contactUserChatTime: "11:00",
    contactUserUnreadMessageCount: 2,
}

export interface IChatListProps extends IComponentProps {
    messages: IMessagePreview[];
    activeChat: number;
    inputNotNull?: boolean;
}

export class ChatList extends Block<IChatListProps> {
    _searchInputValue: string;
    public messagesPreview: MessagePreview[];
    
    constructor(props: IChatListProps) {
        super(props);
    }
    
    init() {
        this._searchInputValue = "";

        this.messagesPreview = this.props.messages.map((message) => {
            const newChatProps = {
                ...message
            }
            return new MessagePreview(newChatProps);
        });
        
        this.getChats();

        this.setProps({
            inputNotNull: false
        })

        this.children.messagesPreview = this.messagesPreview;
        
        this.children.addChatButton = new ActionButton({
            buttonName: '<div class="icon-add"></div>',
            buttonType: 'button',
            classNames: ['icon-solid', 'button-add'],
            events: {
                click: this.addNewChat.bind(this)
            }
        });

        this.children.userSettingsButton = new AvatarButton({});

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
    }

    private _filterChats(filteredString: string) {
        this._searchInputValue = filteredString;
        const filteredValues = this.props.messages.filter(message => 
            message.contactUserChatName.toLowerCase().includes(filteredString.toLowerCase())
        )
        this.setProps({
            messages: filteredValues
        });
    }

    protected componentDidUpdate(oldProps: IChatListProps, newProps: IChatListProps): boolean {
        this.messagesPreview = this.props.messages.map((message) => {
            const newChatProps = {
                ...message
            }
            return new MessagePreview(newChatProps);
        });

        this.children.messagesPreview = this.messagesPreview;

        return true;
    }

    public addNewChat(): void {
        this.props.messages.push(newChatContext);

        this.setProps({
            messages:  this.props.messages
        });
    }

    public getChats(): void {
        this.setProps({
            messages:  this.props.messages
        });
    }

    render() {
        return this.compile(chatList, {...this.props});
    }
}
