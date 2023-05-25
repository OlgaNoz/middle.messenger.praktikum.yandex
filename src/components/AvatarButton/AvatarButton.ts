import { Block, IComponentProps } from "../../core/Block";
import avatar from "./AvatarButton.hbs";
import "./AvatarButton.scss"
import defaultAvatar from "../../../static/icons/avatar.svg"
import { FormInput } from "../FormComponents/FormInput/FormInput";
import { UserController } from "../../controllers/UserController";

export interface IAvatarProps extends IComponentProps {
    src: string,
    defaultAvatar?: string;
    isEditMode: boolean;
}

const userController = new UserController();

export class AvatarButton extends Block<IAvatarProps> {
    protected init(): void {
        const src = this.props.src !== undefined && this.props.src !== "" ? "https://ya-praktikum.tech/api/v2/resources/" + this.props.src : ""
        this.setProps({
            defaultAvatar: defaultAvatar,
            src: src
        });

        this.children.avatarInput = new FormInput({
            type: "file",
            placeholder: "",
            classNames: ["image-file-input"],
            events: {
                change: (ev: Event) => {
                    const formData = new FormData()
                    const target = ev.target as HTMLInputElement;
                    if (target.files && target.files[0]) {
                        formData.append("avatar", target.files[0])
                        userController.changeUserAvatar(formData)
                    }
                }
            }
        })
    }

    protected render(): DocumentFragment {
        return this.compile(avatar, {...this.props});
    }
}
