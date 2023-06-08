import { expect } from "chai";
import Router from "./Router";
import { Block, IComponentProps } from "./Block";
import { JSDOM } from 'jsdom';

describe('Test Router', () => {
    const DOM = new JSDOM('<html><head></head><body><div id="root"></div></body></html>', {
      url: 'http://localhost'
    });
    
    //@ts-ignore
    global.window = DOM.window;
    //@ts-ignore
    global.document = DOM.window.document;
    //@ts-ignore
    global.window.history = DOM.window.document;
    class ComponentPage1 extends Block<IComponentProps>{
        protected render(): DocumentFragment {
            const component = new DocumentFragment();
            return component;
        }
    }

    class ComponentPage2 extends Block<IComponentProps>{
        protected render(): DocumentFragment {
            const component = new DocumentFragment();
            return component;
        }
    }

  
    it('back()', () => {
      Router.use('/first', ComponentPage1)
            .use('/second', ComponentPage2)
            .start();
            
      Router.go('/second');
      let route = Router._currentRoute?._pathname;
      expect(route).to.eq("/second");
    });
  });
