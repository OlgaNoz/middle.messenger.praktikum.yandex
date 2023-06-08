import { expect } from "chai";
import Router from "./Router";
import { Block, IComponentProps } from "./Block";

describe('Test router', () => {
    class ComponentPage1 extends Block<IComponentProps>{
        protected render(): DocumentFragment {
            const component = new DocumentFragment();
            return component;
        }
    }

    global.window.history.back = () => {
      if (typeof window.onpopstate === 'function') {
        window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
      }
    };
    global.window.history.forward = () => {
      if (typeof window.onpopstate === 'function') {
        window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
      }
    }

    // class ComponentPage2 extends Block<IComponentProps>{
    //     protected render(): DocumentFragment {
    //         const component = new DocumentFragment();
    //         return component;
    //     }
    // }
  
    it('use() возвращает экземпляр роута', () => {
      const result = Router.use('/component1', ComponentPage1);
      expect(result).to.eq(Router);
    });
  
    // it('start() ', () => {
    //     Router
    //         .use('/', BlockMock)
    //         .start();

    //     Router.back();

    //     expect(getContentFake.callCount).to.eq(1);
    // });
  
    // it('back()', () => {
    //   Router.use('/', BlockMock)
    //         .start();
  
    //   expect(getContentFake.callCount).to.eq(1);
    // });

    // it('forward()', () => {
    //     Router
    //         .use('/', BlockMock)
    //         .start();
        
    //     expect(getContentFake.callCount).to.eq(1);
    // });

    // it('go()', () => {
    //     Router
    //         .use('/', BlockMock)
    //         .start();

    //     expect(getContentFake.callCount).to.eq(1);
    // });

    //   it('getRoute()', () => {
    //     Router
    //       .use('/', BlockMock)
    //       .start();
    
    //     expect(getContentFake.callCount).to.eq(1);
    //   });
  });
