const { JSDOM } = require('jsdom');

const DOM = new JSDOM('<html><head></head><body><div id="root"></div></body></html>', {
  url: 'http://localhost'
});

global.window = DOM.window;
global.document = DOM.window.document;
global.history = DOM.window.History;
global.XMLHttpRequest = DOM.window.XMLHttpRequest;
global.FormData = DOM.window.FormData;
