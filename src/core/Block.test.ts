import { expect } from "chai";
import { Block, IComponentProps } from "./Block";

describe('Test Block', () => {
    let component: Block<IComponentProps>;
    let root: globalThis.Element;
    class Component extends Block<IComponentProps>{
        render() {
            return this.compile(() => '<div id="component"></div>', this.props);
        }
    }

    before(() => {
        root = document.querySelector('#root')!;
        component = new Component({});
        const content = component.getContent();
        if (content)
            root.appendChild(content);
    });

    it('Component in DOM', () => {
        const domComponent = document.querySelector('#component');
        expect(domComponent).not.undefined;
    });

    it('Component set prop', () => {
        component.setProps({
            classNames: ['test']
        })
        const domComponent = document.querySelector('#component');

        expect(domComponent?.classList.contains('test')).is.true;
    });

    it('Component set event prop', () => {
        component.setProps({
            events: {
                click: () => {
                    const element = document.createElement("div");
                    element.id = "test1";
                    root.appendChild(element);
                }
            }
        })
        const domComponent = document.querySelector('#component');
        const event = new window.Event("click", {bubbles: true});

        domComponent?.dispatchEvent(event);
        const domTestComponent = document.querySelector('#test1');
        expect(domTestComponent).not.undefined;
    });
});
