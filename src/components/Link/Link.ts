import { Block, IComponentProps } from "../../core/Block";
import template from "./Link.hbs";

export interface ILinkProps extends IComponentProps {
    href: string;
    linkName: string;
}

export class Link extends Block<ILinkProps> {
    constructor(props: ILinkProps) {
        super(props);
    }

    render() {
        return (this.compile(template, {...this.props}));
    }
}
