import { Block, IComponentProps } from "./Block";

export interface BlockComponent<P extends IComponentProps> {
    new(props: P): Block<P>;
  }

export class Route {
    _blockClass: BlockComponent<IComponentProps>;
    _block: Block<IComponentProps> | null;
    _pathname: string; 
    _props: IComponentProps;

    constructor(pathname: string, view: BlockComponent<IComponentProps>, props: IComponentProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        this._block = null;
        
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass(this._props);
            render(this._props.rootQuery, this._block);
            return;
        }
    }
}

export function render<T extends Block<IComponentProps>>(query: string, block: T) {
    const root = document.querySelector(query);
    const content = block.getContent();
    if (content && root) {
        root.innerHTML = '';
        root.appendChild(content);
    }
    return root;
}

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}
