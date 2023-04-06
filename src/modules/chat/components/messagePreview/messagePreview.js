import template from "./messagePreview.hbs";
import style from "./messagePreview.scss";

const messagePreview = () => {
    const context = {
        currentUserName: "UN",
        contactUserName: "Л",
        contactUserChatName: "Леша",
        contactUserChatMessage: "Привет, пойдем гулять? Погода шикарная, солнце такое яркое. Птицы поют, весна пришла",
        contactUserChatTime: "11:00",
        contactUserUnreadMessageCount: "2",
    }
    return template(context);
}

export default messagePreview;