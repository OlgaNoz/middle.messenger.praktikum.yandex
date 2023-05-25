import { Block, IComponentProps } from "../../core/Block";
import Router from "../../core/Router";
import template from "./Link.hbs";

export interface ILinkProps extends IComponentProps {
    href: string | LINKS_LOCATIONS; 
    linkName: string;
}

export enum LINKS_LOCATIONS {
    back,
    forward
}

export class Link extends Block<ILinkProps> {
    constructor(props: ILinkProps) {
        super(props);
    }

    protected init(): void {
        this.setProps({
            events: {
                click: (event: MouseEvent) => {
                    event.preventDefault();
                    switch (this.props.href) {
                        case LINKS_LOCATIONS.back:
                            Router.back();
                            break;
                        case LINKS_LOCATIONS.forward:
                            Router.forward();
                            break;
                        default:
                            Router.go(this.props.href);
                            break;
                    }
                }
            }
        })
    }

    render() {
        return (this.compile(template, {...this.props}));
    }
}
