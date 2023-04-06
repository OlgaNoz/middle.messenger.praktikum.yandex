import template from "./chat.hbs";
import messagePreview from "./components/messagePreview/messagePreview";
import style from "./chat.scss";

const chat = () => {
    let message = messagePreview();
    const context = {
        currentUserName: "UN",
        contactUserName: "Л",
        contactUserChatName: "Леша",
        contactUserChatMessage: "Привет, пойдем гулять? Погода шикарная, солнце такое яркое. Птицы поют, весна пришла",
        contactUserChatTime: "11:00",
        contactUserUnreadMessageCount: "2",
        message
    }
    return template(context);
}

export default chat;