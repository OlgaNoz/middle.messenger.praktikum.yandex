import { expect } from "chai";
import { HTTPTransport, METHODS, Options } from "./HTTPTransport";
import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';


interface ITestValue {
    testValue: number;
}

describe('Test HTTPTransport', () => {
    const httpTransport = new HTTPTransport('/auth');
    let xhr: SinonFakeXMLHttpRequestStatic;
    let requests: SinonFakeXMLHttpRequest[] = [];

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();
        xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
            requests.push(request);
        });
        // @ts-ignore
        global.window.XMLHttpRequest = xhr;
    });

    afterEach(() => {
        requests = [];
    })

    it('HTTP chech url', () => {
        httpTransport.get('/user');
        expect(requests[0].url).to.eq(httpTransport.fullApiUrl + '/user');
    });
    
    it('GET request was sent', () => {
        httpTransport.get('/user');
        expect(requests[0].method).to.eq(METHODS.GET);
    });

    it('POST request was sent', () => {
        const body = { testValue: 1 } as ITestValue;
        const options = {
            data: body
        } as Options;

        httpTransport.post('/user', options);
        expect(requests[0].requestBody).to.eq(JSON.stringify(body));
    });
});
