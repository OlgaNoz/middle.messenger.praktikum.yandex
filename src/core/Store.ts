import { Indexed, set } from "../common/scripts/Utils";
import { Block, IComponentProps } from "./Block";
import { EventBus } from "./EventBus";

export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    private state: Indexed = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvents.Updated);
    };
}

const store = new Store();

export function connect<SP>(mapStateToProps: (state: Indexed) => SP) {
    return function<P extends IComponentProps>(Component: typeof Block<P>){
        return class extends Component {
            constructor(props: P) {
                let oldState = mapStateToProps(store.getState());

                super({ ...(props as P), ...oldState });

                store.on(StoreEvents.Updated, () => {
                    const newState = mapStateToProps(store.getState());

                    oldState = newState;

                    this.setProps({...newState});
                });
            }
        }
    }
}

export default store; 
