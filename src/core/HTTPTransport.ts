import Router from "./Router";

export interface Options {
    data?: object;
    headers?: object;
    timeout?: number;
    method?: string;
}

export const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

function queryStringify(data: object) {
    let result = "?";
    for (const [key, value] of Object.entries(data)) {
        result += `${key}=${value}&`;
    }
    result = result.substr(0, result.length - 1);
    return result;
}
const apiUrl = 'https://ya-praktikum.tech/api/v2';
export class HTTPTransport {
    fullApiUrl: string;

    constructor(url: string) {
        this.fullApiUrl = apiUrl + url;
    }

    get = (url: string, options: Options = {}) => {
        url = this.fullApiUrl + url;
        if (options.data) {
            url += queryStringify(options.data);
        }
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    post = (url: string, options: Options = {}) => {
        url = this.fullApiUrl + url;
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    put = (url: string, options: Options = {}) => {
        url = this.fullApiUrl + url;
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    delete = (url: string, options: Options = {}) => {
        url = this.fullApiUrl + url;
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    // options:
    // headers — obj
    // data — obj
    request = (url: string, options: Options, _timeout = 5000) => {
        const {method, data, headers} = options;
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method !== undefined ? method : METHODS.GET, url);

            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        resolve(xhr.response);
                    } else {
                        if (xhr.status === 401) {
                            Router.go('/');
                        } else {
                            reject({
                                status: xhr.status,
                                data: xhr.response
                            });
                        }
                    }
                }
            };

            if (!(data instanceof FormData)) {
                xhr.setRequestHeader("content-type", "application/json");
            }
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhr.withCredentials = true;
            xhr.responseType = 'json';

            if (headers) {
                for (const [key, value] of Object.entries(headers)) {
                    xhr.setRequestHeader(key, value);
                }
            }

            xhr.onabort = () => reject({reason: 'abort'});
            xhr.onerror = () => reject({reason: 'network error'});
            xhr.ontimeout = function() {
                reject;
                throw new Error("Превышено время ожидания");
            };

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else if (method === METHODS.PUT && data instanceof FormData) {
                xhr.send(data)
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
