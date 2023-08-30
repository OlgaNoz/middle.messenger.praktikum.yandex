import { expect } from "chai";
import Router from "./Router";
import { Block, IComponentProps } from "./Block";

describe('Test Router', () => {
    class ComponentPage1 extends Block<IComponentProps>{
        protected render(): DocumentFragment {
            const component = new window.DocumentFragment();
            return component;
        }
    }
    class ComponentPage2 extends Block<IComponentProps>{
        protected render(): DocumentFragment {
            const component = new window.DocumentFragment();
            return component;
        }
    }

    before(() => {
        Router.use('/first', ComponentPage1)
            .use('/second', ComponentPage2)
            .start();
    });
  
    it('go() with correct path', () => {
        Router.go('/first');
        expect(Router._currentRoute?._pathname).to.eq("/first");
    });

    it('go() with incorrect path (should stay on current page)', () => {
        Router.go('/test');
        expect(Router._currentRoute?._pathname).to.eq("/first");
    });

    it('getRoute() with correct path', () => {
        const route = Router.getRoute('/second');
        expect(route?._pathname).to.eq("/second");
    });

    it('getRoute() with incorrect path', () => {
        const route = Router.getRoute('/test');
        expect(route?._pathname).to.undefined;
    });
});
